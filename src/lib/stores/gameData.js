import { writable } from 'svelte/store';
import { browser, dev } from '$app/environment';
import {
  GameStates,
  INITIAL_GAME_DATA,
  NUM_ROUNDS,
  RESOURCE_UPDATE_ANIM_DELAY,
  RESOURCE_UPDATE_ANIM_DURATION,
} from '$types';
import allCards from '$gameFiles/card-data';
import allMigrantData from '$gameFiles/migrant-data';
import allJobsData from '$gameFiles/jobs';
import allAssistanceData from '$gameFiles/assistances';
import allWildCards from '$gameFiles/wild-cards';
import { applyUpdates, deepCopy, delay, parseJSONSafe, sumValues } from '$lib/utils/functions';

console.log('DEV MODE:', dev);

// Get the possible game data on the browser's local storage
// TODO: Currently only loads the game state from local storage in dev mode.
// Need to implement a better way to allow users to persist games
let initialValue = INITIAL_GAME_DATA;
if (browser && dev) {
  const storedGameData = window.localStorage.getItem('gameData');

  // Parse the JSON; if there is an error, return the initial game data
  initialValue = parseJSONSafe(storedGameData, INITIAL_GAME_DATA);
  console.debug('Got game data from local storage:', initialValue);
  if (!initialValue) {
    // If for whatever reason the key exists but there is no game data, default
    // back the initial game data
    initialValue = INITIAL_GAME_DATA;
  }
}

function createGameData() {
  const { subscribe, set, update } = writable(initialValue);

  const getNextState = (g, action = undefined) => {
    let nextState;
    if (!g.resources.income.salary) {
      // Quit job
      nextState = GameStates.JOB_SELECT;
    } else if (g.round + 1 >= NUM_ROUNDS) {
      // Game Over
      nextState = GameStates.GAME_END;
    } else if (g.round === 0 || g.round === 2) {
      // Assistance state shows up after rounds 1 and 3, don't end the
      // round yet
      nextState = GameStates.ASSISTANCE;
    } else if (g.round === 1) {
      // Wild card shows up after round 2
      const wildCardID = Math.floor(Math.random() * allWildCards.length);
      return {
        ...g,
        state: GameStates.WILD_CARD,
        currentCardId: wildCardID,
        pastActions: action ? [...g.pastActions, action] : g.pastActions,
      };
    } else {
      // Next round
      nextState = GameStates.ROUND_START;
    }

    // Update the game data
    return {
      ...g,
      state: nextState,
      round: nextState === GameStates.ROUND_START ? g.round + 1 : g.round,
      pastActions: action ? [...g.pastActions, action] : g.pastActions, // Add to the past actions list
    };
  };

  const advanceGameState = (kwargs) => {
    update((g) => {
      switch (g.state) {
        case GameStates.START:
          console.log('Clearing game data...');
          // Clear the data when we move out of the START state
          return { ...deepCopy(INITIAL_GAME_DATA), state: GameStates.MIGRANT_SELECT };
        case GameStates.MIGRANT_SELECT:
          const { migrantId } = kwargs;

          // Copy the initial resources from the migrant into the game data's
          // state
          const initialResources = allMigrantData.migrants[migrantId].initialResources;

          return {
            ...g,
            migrantId, // Set the migrant ID
            resources: deepCopy(initialResources),
            state: GameStates.JOB_SELECT,
          };
        case GameStates.JOB_SELECT:
          const { jobId } = kwargs;

          // Copy the job data into the resources object
          const jobData = allJobsData.jobs[jobId];
          g.resources.time = jobData.hours;
          g.resources.income.salary = jobData.income;

          if (g.prevJob !== null) return { ...getNextState(g), jobId };
          else return { ...g, jobId, prevJob: jobId, state: GameStates.PROFILE };
        case GameStates.PROFILE:
          return { ...g, state: GameStates.ROUND_START };
        case GameStates.ROUND_START:
          return { ...g, state: GameStates.DRAW_CARD };
        case GameStates.DRAW_CARD:
          const cardId = drawCard(g);
          // const cardId = 4;  // Temp card control
          return { ...g, state: GameStates.DECISION, currentCardId: cardId };
        case GameStates.DECISION: {
          const { optionId } = kwargs;

          /**
           * Stores the action into the past actions array
           * @type {import('$types').PastAction}
           */
          const action = { cardId: g.currentCardId, wild: false, optionId };

          // Figure out the next game state
          return getNextState(g, action);
        }
        case GameStates.WILD_CARD:
          const { optionId } = kwargs;
          const action = { cardId: g.currentCardId, wild: true, optionId };
          return {
            ...g,
            state: GameStates.ROUND_START,
            round: 2,
            pastActions: [...g.pastActions, action],
          };
        case GameStates.ASSISTANCE:
          const { assistanceId } = kwargs;
          console.log('Selected assistance', assistanceId);

          // Add the assistance ID to the list of past actions
          g.pastActions.push({ assistanceId });

          // Start round 2 or 4 after assistance has been selected
          return { ...g, state: GameStates.ROUND_START, round: g.round + 1 };
        case GameStates.GAME_END:
          // On game end, an advancement in the game state entails returning to
          // the game START state. Note that we don't clear the game data in
          // case there are any residual components that haven't been unmounted
          // that require game data. (Reset happens in the START state.)
          return { ...g, state: GameStates.START };
        default:
          return g;
      }
    });
  };

  /**
   * Updates the resources of the game state given the updates.
   *
   * Applies animations to specific resource objects.
   *
   * @param {import('$types').ResourcesObject} oldResources
   * @param {import('$types').ResourcesObject} updates
   */
  const resourceUpdater = (oldResources, updates) => {
    return new Promise((resolve) => {
      // Create a copy of the old resources and update them to see which values
      // get updated. Note that we don't update the game state yet.
      let newResources = deepCopy(oldResources);
      updateResources(newResources, updates);

      // Update/amimate the expenses in parallel
      let hadExpenseUpdates = false;
      for (const expenseKey in oldResources.expenditures) {
        if (expenseKey === 'other') {
          // 'other' is an array so we can't really animate this
          continue;
        }
        const oldValue = oldResources.expenditures[expenseKey];
        const newValue = newResources.expenditures[expenseKey];

        if (oldValue === newValue) {
          continue;
        }

        hadExpenseUpdates = true;

        animateResource(
          oldValue,
          newValue,
          (g) => (g.resources.expenditures[expenseKey] = newValue)
        );
      }

      // Animate the salary, assistance, and hours worked sequentially, spaced
      // out by small time delays
      const oldSalary = oldResources.income.salary,
        newSalary = newResources.income.salary;
      const oldAssistance = oldResources.income.assistance,
        newAssistance = newResources.income.assistance;
      const oldHoursWorked = oldResources.time,
        newHoursWorked = newResources.time;

      if (hadExpenseUpdates) {
        console.debug('Animating expenses...');
      }
      const initialDelayTime = hadExpenseUpdates
        ? RESOURCE_UPDATE_ANIM_DURATION + RESOURCE_UPDATE_ANIM_DELAY
        : 0;

      delay(initialDelayTime)
        .then(() =>
          animateResource(oldSalary, newSalary, (g) => (g.resources.income.salary = newSalary))
        )
        .then(delay)
        .then(() =>
          animateResource(
            oldAssistance,
            newAssistance,
            (g) => (g.resources.income.assistance = newAssistance)
          )
        )
        .then(delay)
        .then(() =>
          animateResource(
            oldHoursWorked,
            newHoursWorked,
            (g) => (g.resources.time = newHoursWorked)
          )
        )
        .then(delay)
        .then(() => {
          // Only resolve the promise when all of the animations are finished.
          console.log('Finished animation');

          // Make sure remaining non-animated resources get updated
          update((g) => {
            g.resources = newResources;
            return g;
          });

          resolve();
        });
    });
  };

  return {
    subscribe,
    set,
    update,
    advanceGameState,
    resourceUpdater,
  };
}

export const GameData = createGameData();

// Add a subscription to the game data so that whenever it updates, the local
// storage is also updated
// Adapted from: https://rodneylab.com/using-local-storage-sveltekit/
GameData.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('gameData', JSON.stringify(value));
  }
});

/**
 * Draws a random card, making sure to draw a life event by round 3 and avoid duplicates based on past actions.
 *
 * @param {import('$types').GameData} gameData - The game data
 * @returns {number} The drawn card ID
 */
function drawCard(gameData) {
  // Get the already drawn cards from past actions (ignore assistances)
  const alreadyDrawn = gameData.pastActions
    .filter((action) => action.cardId !== undefined)
    .map((action) => action.cardId);

  // Make sure we don't draw a repeat card
  let availableCards = allCards.filter((card) => !alreadyDrawn.includes(card.id));
  // Draw a life event by round 3
  if (
    gameData.round === 2 &&
    alreadyDrawn.reduce(
      (a, b) => a && allCards.find((card) => card.id === b).category !== 'Life Event',
      true
    )
  ) {
    availableCards = availableCards.filter((card) => card.category === 'Life Event');
  }

  if (!availableCards.length) {
    console.error(
      'No more available cards! You somehow drew all of the cards in a single game! 😱'
    );
    return 0;
  }

  // Randomly select a card
  const randIdx = Math.floor(Math.random() * availableCards.length);
  return availableCards[randIdx].id;
}

/**
 * Updates resources based on the card updates.
 *
 * Takes in an object with numeric deltas of money, time, and/or wellbeing, as
 * well as skill updates as written in the card data (see `card-data.json` for
 * examples). Given these updates, applies them in-place to the old resources,
 * mutatin the original resources.
 *
 * @param {import('$types').ResourcesObject} oldResources - The original resources
 * @param {import('$types').ResourcesObject} updates - The updates to apply
 */
function updateResources(oldResources, updates) {
  if (!oldResources) {
    console.warn(
      'No resources found, you might need to select a migrant to load in the initial resources'
    );
    return;
  }
  applyUpdates(oldResources, updates);
}

/**
 *
 * @param {number} oldValue - The old value of the resource
 * @param {number} newValue - The new value of the resource
 * @param {any} updater - Updater function that takes in the game state and
 *    updates the appropriate resource based on the new value
 * @returns {Promise} The promise, resolves with time duration of the delay that
 *    the resource updater should wait
 */
function animateResource(oldValue, newValue, updater) {
  return new Promise((resolve) => {
    if (oldValue == newValue) {
      // Don't invoke a delay if there are no updates to be made
      resolve(0);
      return;
    }

    GameData.update((g) => {
      updater(g);
      return g;
    });

    resolve(RESOURCE_UPDATE_ANIM_DURATION + RESOURCE_UPDATE_ANIM_DELAY);
  });
}

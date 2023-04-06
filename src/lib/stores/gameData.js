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

  const advanceGameState = (kwargs) => {
    update((g) => {
      switch (g.state) {
        case GameStates.START:
          return { ...g, state: GameStates.MIGRANT_SELECT };
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

          return { ...g, jobId, state: GameStates.PROFILE };
        case GameStates.PROFILE:
          return { ...g, state: GameStates.ROUND_START };
        case GameStates.ROUND_START:
          return { ...g, state: GameStates.DRAW_CARD };
        case GameStates.INCOME:
          // TODO: Update monthly income
          return { ...g, state: GameStates.EXPENSES };
        case GameStates.EXPENSES:
          // TODO: Update monthly expenses
          return { ...g, currentCardId: null, state: GameStates.DRAW_CARD };
        case GameStates.DRAW_CARD:
          const cardId = drawCard(g);
          // const cardId = 4;  // Temp card control
          return { ...g, state: GameStates.DECISION, currentCardId: cardId };
        case GameStates.DECISION:
          const { optionId } = kwargs;

          /**
           * Stores the action into the past actions array
           * @type {import('$types').PastAction}
           */
          const action = { cardId: g.currentCardId, optionId };

          // Figure out the next game state
          let nextState;
          let roundOver = false;
          if (g.round + 1 >= NUM_ROUNDS) {
            // Game Over
            nextState = GameStates.GAME_END;
          } else if (g.round === 0 || g.round === 2) {
            // Assistance state shows up after rounds 1 and 3, don't end the
            // round yet
            nextState = GameStates.ASSISTANCE;
          } else {
            // Next round
            roundOver = true;
            nextState = GameStates.ROUND_START;
          }

          // Update the game data
          return {
            ...g,
            state: nextState,
            round: roundOver ? g.round + 1 : g.round,
            pastActions: [...g.pastActions, action], // Add to the past actions list
          };
        case GameStates.ASSISTANCE:
          const { assistanceId } = kwargs;
          console.log('Selected assisstance', assistanceId);

          // Start round 2 or 4 after assistance has been selected
          return { ...g, state: GameStates.ROUND_START, round: g.round + 1 };
        case GameStates.GAME_END:
          // On game end, an advancement in the game state entails resetting the
          // game data and returning to the game START state.

          // Reset game data (initial game data starts at `GameStates.START`)
          return deepCopy(INITIAL_GAME_DATA);
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
      console.debug('Old resources', oldResources);
      updateResources(newResources, updates);
      console.debug('New resources', newResources);

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
        animateValue(
          oldValue,
          newValue,
          (g, current) => (g.resources.expenditures[expenseKey] = current),
          RESOURCE_UPDATE_ANIM_DURATION
        );
      }

      // Animate the salary, assistance, and hours worked sequentially, spaced
      // out by small time delays
      const oldSalary = oldResources.income.salary,
        newSalary = newResources.income.salary;
      const oldAssisstance = oldResources.income.assistance,
        newAssisstance = newResources.income.assistance;
      const oldHoursWorked = oldResources.time,
        newHoursWorked = newResources.time;

      const initialDelayTime = hadExpenseUpdates
        ? RESOURCE_UPDATE_ANIM_DURATION + RESOURCE_UPDATE_ANIM_DELAY
        : 0;

      delay(initialDelayTime)
        .then(() =>
          animateValue(
            oldSalary,
            newSalary,
            (g, current) => (g.resources.income.salary = current),
            RESOURCE_UPDATE_ANIM_DURATION
          )
        )
        .then(delay)
        .then(() =>
          animateValue(
            oldAssisstance,
            newAssisstance,
            (g, current) => (g.resources.income.assistance = current),
            RESOURCE_UPDATE_ANIM_DURATION
          )
        )
        .then(delay)
        .then(() =>
          animateValue(
            oldHoursWorked,
            newHoursWorked,
            (g, current) => (g.resources.time = current),
            RESOURCE_UPDATE_ANIM_DURATION
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
 * @returns {number} The drawn card ID
 */
function drawCard(gameData) {
  const alreadyDrawn = gameData.pastActions.map((action) => action.cardId);
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

function animateValue(startValue, endValue, updater, durationMs) {
  return new Promise((resolve) => {
    // Don't animate anything if the start and end values are the same
    if (startValue === endValue) {
      resolve(0);
      return;
    }
    const range = endValue - startValue;
    const step = endValue > startValue ? 1 : -1;
    const stepTime = Math.abs(Math.floor(durationMs / range));

    // Update the value over an interval
    let current = startValue;
    const timer = setInterval(function () {
      current += step;
      // Use the updater to update the game state
      GameData.update((g) => {
        updater(g, current);
        return g;
      });
      // Reached the target value, resolve and return
      if (current === endValue) {
        clearInterval(timer);
        resolve(RESOURCE_UPDATE_ANIM_DELAY);
      }
    }, stepTime);
  });
}

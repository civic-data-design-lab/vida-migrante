import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { GameStates, INITIAL_GAME_DATA, NUM_ROUNDS } from '$types';
import allCards from '$gameFiles/card-data';
import allMigrantData from '$gameFiles/migrant-data';
import allJobsData from '$gameFiles/jobs';
import allAssistanceData from '$gameFiles/assistances';
import { applyUpdates, deepCopy, parseJSONSafe } from '$lib/utils/functions';

// Get the possible game data on the browser's local storage
let initialValue = INITIAL_GAME_DATA;
if (browser) {
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
          return { ...g, state: GameStates.INCOME };
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
          const updates = allCards[g.currentCardId].options.find(
            (option) => option.id === optionId
          ).updates;

          // Update the resources
          updateResources(g.resources, updates);

          // TODO: Make sure resources cannot go negative (either here or in the
          // front end)

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

          // Apply the updates from the assistance card
          const assistanceData = allAssistanceData.find((a) => a.id === assistanceId);
          updateResources(g.resources, assistanceData.updates);

          // Start round 2 or 4 after assistance has been selected
          return { ...g, state: GameStates.ROUND_START, round: g.round + 1 };
        default:
          return g;
      }
    });
  };

  return {
    subscribe,
    set,
    update,
    advanceGameState,
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
 * Draws a random card, making sure to avoid duplicates based on past actions.
 *
 * @returns {number} The drawn card ID
 */
function drawCard(gameData) {
  const alreadyDrawn = gameData.pastActions.map((action) => action.cardId);
  // Make sure we don't draw a repeat card
  const availableCards = allCards.filter((card) => !alreadyDrawn.includes(card.id));

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

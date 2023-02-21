import { writable } from 'svelte/store';
import { GameStates, INITIAL_GAME_DATA } from '$types';
import allCards from '$gameFiles/card-data';

function createGameData() {
  const { subscribe, set, update } = writable(INITIAL_GAME_DATA);

  const advanceGameState = (kwargs) => {
    update((g) => {
      switch (g.state) {
        case GameStates.START:
          return { ...g, state: GameStates.MIGRANT_SELECT };
        case GameStates.MIGRANT_SELECT:
          return { ...g, state: GameStates.JOB_SELECT };
        case GameStates.JOB_SELECT:
          return { ...g, state: GameStates.INSTRUCTIONS };
        case GameStates.INSTRUCTIONS:
          return { ...g, state: GameStates.ROUND_START };
        case GameStates.ROUND_START:
          return { ...g, state: GameStates.INCOME };
        case GameStates.INCOME:
          // TODO: Update monthly income
          return { ...g, state: GameStates.EXPENSES };
        case GameStates.EXPENSES:
          // TODO: Update monthly expenses
          return { ...g, state: GameStates.DRAW_CARD };
        case GameStates.DRAW_CARD:
          // TODO: Randomly select a card and update the card state
          const cardId = drawCard(g);
          return { ...g, state: GameStates.DECISION, currentCardId: cardId };
        case GameStates.DECISION:
          const { optionId } = kwargs;
          const updates = allCards[g.currentCardId].options.find(
            (option) => option.id === optionId
          ).updates;
          console.log('updates:', updates);
          const updatedResources = getUpdatedResources(g.resources, updates);
          // TODO: Make sure we end the game after 4 rounds
          const gameOver = false;

          /** @type {import('$types').PastAction} */
          const action = { cardId: g.currentCardId, optionId };
          return {
            ...g,
            resources: { ...g.resources, ...updatedResources }, // Update resources
            currentCardId: null, // Reset the current card
            pastActions: [...g.pastActions, action], // Add to the past actions list
            state: gameOver ? GameStates.START : GameStates.ROUND_START,
          };
        default:
          return g;
      }
    });
  };

  const selectMigrant = (migrant) => {
    update((g) => {
      g.migrant = migrant;
      return g;
    });
  };

  return {
    subscribe,
    set,
    update,
    advanceGameState,
    selectMigrant,
  };
}

export const GameData = createGameData();

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
 * Gets the updated resources based on the card updates and current resources.
 *
 * Takes in an object with numeric deltas of money, time, and/or wellbeing, as
 * well as skill updates as written in the card data (see `card-data.json` for
 * examples). Given the old resources, returns the updated resources.
 *
 * @param {import('$types').ResourcesObject} oldResources
 * @param {object} updates
 * @param {number} [updates.money]
 * @param {number} [updates.time]
 * @param {number} [updates.wellbeing]
 * @param {[string]} [updates.skills] - List of skills to concatenate
 */
function getUpdatedResources(oldResources, updates) {
  // Creates copy to avoid mutation
  const updatedResources = {};
  for (let resourceKey in updates) {
    if (resourceKey === 'skills') {
      updatedResources.skills = [...oldResources.skills, ...updates.skills];
      continue;
    }
    // Add the numeric resource values
    updatedResources[resourceKey] = oldResources[resourceKey] + updates[resourceKey];
  }
  return updatedResources;
}

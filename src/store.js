import { writable } from 'svelte/store';
import { GameStates, INITIAL_GAME_DATA } from './utils/types';

function createGameData() {
  const { subscribe, set, update } = writable(INITIAL_GAME_DATA);

  /**
   * Updates resources from the card data.
   *
   * Takes in an object with numeric deltas of money, time, and/or wellbeing,
   * as well as skill updates as written in the card data (see
   * `card-data.json` for examples). Updates the game data based on this
   * object.
   *
   * @param {object} updates
   * @param {number} [updates.money]
   * @param {number} [updates.time]
   * @param {number} [updates.wellbeing]
   * @param {[string]} [updates.skills] - List of skills to concatenate
   */
  const applyCardUpdates = (updates) =>
    update((g) => {
      for (let resource of updates) {
        if (resource === 'skills') {
          g.resources.skills.push(...updates[resource]);
          continue;
        }
        g.resources[resource] += updates[resource];
      }
      return g;
    });

  const advanceGameState = (kwargs) => {
    update((g) => {
      switch (g.state) {
        case GameStates.START:
          return { ...g, state: GameStates.MIGRANT_SELECT };
        case GameStates.MIGRANT_SELECT:
          return { ...g, state: GameStates.JOB_SELECT };
        case GameStates.JOB_SELECT:
          return { ...g, state: GameStates.INSTRUCTIONS}
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
          return { ...g, state: GameStates.DECISION, currentCardId: 'TODO' };
        case GameStates.DECISION:
          // TODO: Figure out how to update the state based on user decision,
          // either here with `kwargs` or separately
          // TODO: Make sure we end the game after 4 rounds
          const gameOver = false;
          return {
            ...g,
            currentCardId: null, // Reset the current card
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
      }
    );
  }

  return {
    subscribe,
    set,
    update,
    applyCardUpdates,
    advanceGameState,
    selectMigrant,
  };
}

export const GameData = createGameData();

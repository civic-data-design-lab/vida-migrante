// ------------
// Enumerations
// ------------
export const Skills = {
  CONSTRUCTION: 'construction',
  DIGITAL: 'digital skills',
  FINANCIAL: 'financial',
  MARKETING: 'marketing',
  LEGALIZATION: 'legalization',
};

export const Resources = {
  MONEY: 'money',
  TIME: 'time',
  WELLBEING: 'wellbeing',
};

export const GameStates = {
  START: 'start',
  MIGRANT_SELECT: 'migrant-select',
  JOB_SELECT: 'job-select',
  INSTRUCTIONS: 'instructions',
  ROUND_START: 'round-start',
  INCOME: 'income',
  EXPENSES: 'expenses',
  DRAW_CARD: 'draw-card',
  DECISION: 'decision',
  GAME_END: 'game-end',
};

// ----------------
// Type Definitions
// ----------------

/**
 * @typedef Option
 * @prop {number} id - The option ID, used when consulting the past actions
 * @prop {string} description - What the option entails for the user
 * @prop {ResourcesObject} updates - A set of updates to specific resources. Any
 *    'quantitative' resource updates is represented by the change in value in
 *    this object (e.g., if choosing this option means you lose `5` units of time,
 *    you would encode `{ time: -5 }`). Any skill gain is encoded in an array of
 *    skill strings. For example, if the user gains digital skills, you would
 *    encode `{ skills: ['digital skills'] }`
 */

/**
 * @typedef Card
 * @prop {number} id - The card ID
 * @prop {string} category - The overall card category
 * @prop {string} title - The title, summary of what the card is
 * @prop {string} description - Detailed description of the card and what it
 *    offers or what it requests from users
 * @prop {string} prompt - The card's prompt, from which the user will have to
 *    make a decision based on the card's options
 * @prop {string[]} resourcesRequired - List of required resources if users
 *    choose to accept the card's prompt, may be empty
 * @prop {string[]} skillsEarned - List of skills earned if users choose to
 *    accept the card's prompt, may be empty
 * @prop {Option[]} options - List of options associated with this card, may be
 *    empty
 */

/**
 * @typedef PastAction
 * @prop {number} cardId - The card that was drawn
 * @prop {number} optionId - The ID of the option that was selected
 */

/**
 * @typedef GameData
 * @prop {string} state - The current game state
 * @prop {string | null} currentCardId - The current card ID the user has drawn
 * @prop {string | null} migrantId - The selected migrant ID
 * @prop {number} round - 0-indexed round number, can be used to index past actions
 * @prop {ResourcesObject} resources - The migrant's resources (e.g. time,
 *    money, wellbeing)
 * @prop {PastAction[]} pastActions - List of past actions in this game
 */

/**
 * @typedef ResourcesObject
 * @prop {string[]} skills - Array of skills (see Skills enum)
 * @prop {number} time - Time quantitative resource
 * @prop {number} money - Money quantitative resource
 * @prop {number} wellbeing - Wellbeing quantitative resource
 */

// ---------
// Constants
// ---------

/** The number of rounds in a game. */
export const NUM_ROUNDS = 4;

/**
 * @type {GameData}
 */
export const INITIAL_GAME_DATA = {
  state: GameStates.START,
  currentCardId: null,
  migrantId: null,
  round: 0,
  resources: {
    skills: [],
    time: 0,
    money: 0,
    wellbeing: 0,
  },
  pastActions: [],
};

// Used for round numbers (for 4 rounds)
export const NUM_TO_ORDINAL_ARR = ['first', 'second', 'third', 'fourth'];

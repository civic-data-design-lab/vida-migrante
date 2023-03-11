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

export const Assistances = {
  TRAINING: 'training',
  JOB_FINDING: 'jobFind',
  LEGALIZATION_DOCS: 'legalDocs',
  LEGALIZATION_ACRDT: 'legalAcrdt',
  FOOD_ASSIST_CASH: 'foodAssistCash',
  FOOD_ASSIST_IN_KIND: 'foodAssistIK',
  MEDICINES_ASSIST_CASH: 'medAssistCash',
  MEDICINES_ASSIST_IN_KIND: 'medAssistIK',
  INTERNET: 'internet',
};

export const GameStates = {
  START: 'start', // Start
  MIGRANT_SELECT: 'migrant-select',
  JOB_SELECT: 'job-select',
  PROFILE: 'profile',
  ROUND_START: 'round-start',
  INCOME: 'income',
  EXPENSES: 'expenses',
  DRAW_CARD: 'draw-card',
  DECISION: 'decision',
  /** Users select an assistance card, shows up after rounds 1 and 3 */
  ASSISTANCE: 'assistance',
  GAME_END: 'game-end',
};

export const CopingLevels = {
  STRESS: 'stress',
  CRITICAL: 'critical',
  EMERGENCY: 'emergency',
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
 * @prop {string} implicationText - Describes qualitatively the implication of
 *    the decision associated with this option
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
 * @prop {string} image - The full name of the image to use with this card (with
 *    file extension)
 */

/**
 * @typedef PastAction
 * @prop {number} cardId - The card that was drawn
 * @prop {number} optionId - The ID of the option that was selected
 */

/**
 * @typedef GameData
 * @prop {string} state - The current game state
 * @prop {number | null} currentCardId - The current card ID the user has drawn
 * @prop {number | null} migrantId - The selected migrant ID
 * @prop {number | null} jobId - The selected job the migrant has
 * @prop {number} round - 0-indexed round number, can be used to index past actions
 * @prop {ResourcesObject} resources - The migrant's resources (e.g. time,
 *    money, wellbeing)
 * @prop {PastAction[]} pastActions - List of past actions in this game
 */

/**
 * @typedef ExpendituresObject
 *
 * Represents the monthly expenditures of a migrant broken down into different
 * categories such as rent, food, health, etc.
 *
 * @prop {number} rent - Amount of rent expenses
 * @prop {number} food - Amount of food expenses
 * @prop {number} health - Amount of basic health expenses
 * @prop {number} housholdUtilitiesEssential - *Essential* household expenses
 * @prop {number} householdUtilitiesNonEssential - *Non-essential* household
 *    expenses
 * @prop {number} remittances - Amount spent on remittances each month
 * @prop {number} internet - Amount spent on internet expenses
 */

/**
 * @typedef ResourcesObject
 *
 * Represents the resources a migrant has. This also includes "negative"
 * resources such as expenditures.
 *
 * @prop {string[]} skills - Array of skills (see Skills enum)
 * @prop {number} time - Time quantitative resource
 * @prop {number} money - Money quantitative resource
 * @prop {ExpendituresObject} expenditures - Expenditures broken down into
 *    several categories (see `ExpendituresObject`)
 * @prop {object} income - Income object, broken down into salary and assistance
 * @prop {number} income.salary - The migrant's income from job salary
 * @prop {number} income.assistance - The migrant's income from assistance
 * @prop {string | null} copingLevel - The coping level the migrant is
 *    experiencing (see `CopingLevel` enum)
 * @prop {string[]} accreditations - List of the migrant's accreditations
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
  jobId: null,
  round: 0,
  resources: null,
  pastActions: [],
};

// Used for round numbers (for 4 rounds)
export const NUM_TO_ORDINAL_ARR = ['first', 'second', 'third', 'fourth'];

export const CARD_CATEGORY_COLOR_MAP = {
  'Personal Improvement': 'red',
  Assistance: 'blue',
  'Life Event': 'yellow',
};

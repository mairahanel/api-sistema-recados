/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],

  preset: "ts-jest",

  testEnvironment: "node",

  transform: {
    ".+\\.ts$": "ts-jest",
  },

  roots: ["<rootDir>/tests"],
};

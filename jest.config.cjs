/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json", // Path to your tsconfig for Jest
      },
    ],
  },
  setupFiles: ["<rootDir>/src/setupTests.ts"], // If setupTests.ts is inside `src`
};

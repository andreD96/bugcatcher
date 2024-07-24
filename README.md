# BugCatcher

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Tests](#running-the-tests)
   - [Running UI Tests](#running-ui-tests)
   - [Running API Tests](#running-api-tests)
- [Writing Tests](#writing-tests)
   - [UI Tests](#ui-tests)
   - [API Tests](#api-tests)
- [Reporting](#reporting)
- [Configuration](#configuration)

## Project Overview
The Bugcatcher project is an automated testing framework utilizing WebdriverIO, Cucumber, and Gherkin syntax. 
It supports both UI and API testing and follows the Page Object Model (POM) design pattern to organize test code efficiently.

## Prerequisites
- [Node.js](https://nodejs.org/en/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/andreD96/bugcatcher.git
    ```
2. Navigate to the project directory:
    ```sh
    cd bugcatcher
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
   or
    ```sh
    yarn install
    ```

## Running the Tests

### Running UI Tests
To run the UI tests, execute the following command:
```sh
  npm run test:functional
  ```
This will run the tests defined in the functional suite, which includes the `pricing.feature` and `searchCourse.feature`.

### Running API Tests
To run the API tests, execute the following command:
```sh
  npm run test:api
  ```
This will run the tests defined in the api suite, which includes the `apis.feature`.


## Writing tests

### UI Tests
UI tests are written using Gherkin syntax and placed in the features directory. Each feature file corresponds to a specific test scenario.

#### Example pricing.feature:
```gherkin
  Feature: Pricing Page

   Scenario: As a user, I want to check the info necessary to sign up
      Given I am on the pricing page
      When I click on start now for small teams
      And I land on the self serve page
      Then I expect to see the Google social login
      And I expect to see the email form
  ```
### API Tests
API tests are also written using Gherkin syntax and placed in the features directory.
#### Example apis.feature:
```gherkin
  Feature: API Testing

   Scenario: GET request to fetch character details
      Given I set the REST API endpoint to "/character/1"
      When I send a GET request to the REST endpoint
      Then the response status code should be 200
      And the REST response should contain the following data:
         | id   | 1            |
         | name | Rick Sanchez |
      And the response latency should be below 1000 milliseconds
  ```

## Reporting

This project uses Allure for reporting the test results. The report files are generated automatically thanks to the
`onComplete()` hook in the configuration. To see the report run the following command:

```sh
  allure serve
  ```

The terminal also shows the "spec" reporter, a more concise reporter useful for a local run.


## Configuration
The WebdriverIO configuration file (wdio.conf.ts) sets up the necessary settings for running your tests. 
Key configurations include:

* **Runner Configuration**: Runs tests locally.
* **Test Files**: Specifies the location of feature files (features/**/*.feature).
* **Test Suites**: Defines separate suites for functional tests and API tests:
  - **functional**: Runs tests in features/pricing.feature and features/searchCourse.feature.
  - **api**: Runs tests in features/apis.feature.
* **Capabilities**: Configures the browser settings for testing:
  - For API tests, Chrome runs in headless mode.
  - For other tests, Chrome runs with default settings.
* **Test Framework**: Uses Cucumber for writing and running tests.
* **Reporters**: Configures Allure and Spec reporters for generating test reports.
* **Cucumber Options**: Specifies the location of step definitions and other Cucumber-specific settings.
* **Hooks**: Includes various hooks for executing custom logic at different points in the test lifecycle, such as:
  - **onPrepare**: Logs suite and spec information before tests start.
  - **afterStep**: Takes a screenshot if a test step fails.
  - **onComplete**: Generates an Allure report after tests complete.

This configuration ensures a structured and efficient test execution process, with clear separation between different
types of tests and comprehensive reporting.

For detailed customization, you can modify the wdio.conf.ts file according to your project’s requirements.

Feature: API Testing

  Scenario: GET request to fetch character details
    Given I set the REST API endpoint to "/character/1"
    When I send a GET request to the REST endpoint
    Then the response status code should be 200
    And the REST response should contain the following data:
      | id   | 1            |
      | name | Rick Sanchez |
    And the response latency should be below 1000 milliseconds

  Scenario: GraphQL query to fetch character details
    Given I set the GraphQL query to:
      """
      {
        character(id: 1) {
          id
          name
        }
      }
      """
    When I send a POST request to the GraphQL endpoint
    Then the response status code should be 200
    And the GraphQL response should contain the following data:
      | character | {"id":"1","name":"Rick Sanchez"} |
    And the response latency should be below 1000 milliseconds

  Scenario: Negative case - GET request to fetch non-existent character
    Given I set the REST API endpoint to "/character/999999"
    When I send a GET request to the REST endpoint
    Then the response status code should be 404
    And the response latency should be below 1000 milliseconds

  Scenario: Negative case - GraphQL query to fetch non-existent character
    Given I set the GraphQL query to:
      """
      {
        character(id: 999999) {
          id
          name
        }
      }
      """
    When I send a POST request to the GraphQL endpoint
    Then the response status code should be 200
    And the GraphQL response should contain the following data:
      | character | null               |
    And the response latency should be below 1000 milliseconds

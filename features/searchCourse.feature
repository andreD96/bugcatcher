Feature: Search Course in the website

  Scenario Outline: As a user, I want to search for a course by main topic

    Given I am on the library page
    When I search for <term>
    Then I should see results related to <term> or <alternative>

    Examples:
      | term    | alternative |
      | AWS     | Amazon      |
      | GCP     | Google      |
      | Azure   | Microsoft   |

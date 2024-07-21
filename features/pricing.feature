Feature: Explore pricing options

  Scenario: As a user, I want to check for business pricing options

    Given I am on the pricing page
    Then I expect to see the business pricing plans

  Scenario: As a user, I want to check the info necessary to sign up
    Given I am on the pricing page
    When I click on start now for small teams
    And I land on the self serve page
    Then I expect to see the Google social login
    And I expect to see the email form

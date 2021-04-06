Feature: Custom Restaurant Greeter Bot

    Scenario: Homer arrives at a restaurant then is greeted and seated immediately
        Given the user is "homer"
        And the user begins a new chat with "RestaurantGreeter"
        * User: Hello, is the wait long today?
        * Bot: Good evening Homer Simpson! Do you have a reservation with us?
        * User: I'm sorry, I forgot to call it in.
        * Bot: No problem at all, how many are in your party?
        * User: Just me
        * Bot: Thank you Homer, please follow me to your table.
        Then userAttributes.address = Springfield
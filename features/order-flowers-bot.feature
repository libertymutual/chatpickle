Feature: OrderFlowers Bot

    Scenario: Happy Path - Anonymous orders roses for tomorrow at 4pm
        Given the user begins a new chat with "OrderFlowers_bot"
        When they say:
        * User: I want to order flowers
        * Bot: What type of flowers would you like to order?
        * User: roses
        * Bot:  What day do you want the roses to be picked up?
        * User: tomorrow
        * BotRegex: Pick up the roses at what time on \d{4}-\d{2}-\d{2}\?
        * User: four pm
        * BotRegex: Okay, your roses will be ready for pickup by \d{2}:\d{2} on \d{4}-\d{2}-\d{2}.  Does this sound okay?

    Scenario: Happy Path - Anonymous orders tulips for next friday at 9am but doesn't confirm and exits
        Given the user begins a new chat with "OrderFlowers_bot"
        When they say:
        * User: I want to order flowers
        * Bot: What type of flowers would you like to order?
        * User: tulips
        * Bot:  What day do you want the tulips to be picked up?
        * User: next friday
        * BotRegex: Pick up the tulips at what time on \d{4}-\d{2}-\d{2}\?
        * User: 9 in the morning
        * BotRegex: Okay, your tulips will be ready for pickup by \d{2}:\d{2} on \d{4}-\d{2}-\d{2}.  Does this sound okay?
        * User: no
        * Bot: Okay, I will not place your order.

    Scenario: Unhappy path - Anonymous does not order flower
        Given the user begins a new chat with "OrderFlowers_bot"
        When they say:
        * User: What is my name
        * Bot: I didn't understand you, what would you like to do?
        * User: where is my car
        * Bot: I didn't understand you, what would you like to do?
        * User: never mind
        * Bot: Sorry, I am not able to assist at this time
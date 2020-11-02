Feature: OrderFlowers Bot

    Scenario: Anonymous orders roses for tomorrow at 4pm
        Given the user begins a new chat with "OrderFlowers"
        * User: I want to order flowers
        * Bot:  What type of flowers you want?
        * User: roses
        * Bot:  What day do you want the roses to be picked up?
        * User: tomorrow
        * Bot:  /^Pick up the roses at what time on \d{4}-\d{2}-\d{2}\?$/
        * User: four pm
        * Bot:  /^Okay, your roses will be ready for pickup by 16:00 on \d{4}-\d{2}-\d{2}.  Does this sound okay\?$/
        Then slots.FlowerType is roses
        And sessionAttributes.FlowerType is undefined
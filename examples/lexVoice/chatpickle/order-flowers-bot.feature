Feature: OrderFlowers Bot

    Scenario: Anonymous orders roses for tomorrow at 4pm
        Given the user begins a new chat with "OrderFlowers"
        * User: I would like to order some flowers
        * Bot:  What type of flowers would you like to order?
        * User: roses
        * Bot:  What day do you want the roses to be picked up?
        * User: tomorrow
        * Bot:  /^Pick up the roses at what time on \d{4}-\d{2}-\d{2}\?$/
        * User: four pm
        * Bot:  /^Okay, your roses will be ready for pickup by 16:00 on \d{4}-\d{2}-\d{2}.  Does this sound okay\?$/
        Then slots.FlowerType = roses
        And sessionAttributes.FlowerType = undefined

    Scenario: Anonymous orders roses for tomorrow at 5pm but decides to cancel
        Given the user begins a new chat with "OrderFlowers"
        * User: I would like to order some flowers
        * Bot:  What type of flowers would you like to order?
        * User: roses
        * Bot:  What day do you want the roses to be picked up?
        * User: tomorrow
        * Bot:  /^Pick up the roses at what time on \d{4}-\d{2}-\d{2}\?$/
        * User: five pm
        * Bot:  /^Okay, your roses will be ready for pickup by 17:00 on \d{4}-\d{2}-\d{2}.  Does this sound okay\?$/
        * User: no
        * Bot: Okay, I will not place your order.
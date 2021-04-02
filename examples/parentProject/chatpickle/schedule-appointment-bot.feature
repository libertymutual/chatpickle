Feature: ScheduleAppointment Bot

    Scenario: Happy Path - Anonymous sets up cleaning appointment
        Given the user begins a new chat with "ScheduleAppointment"
        * User: I would like to book an appointment
        * Bot: What type of appointment would you like to schedule?
        * User: cleaning
        * Bot: When should I schedule your cleaning?
        * User: tomorrow
        * Bot: /At what time/
        * User: four pm
        * Bot: /\d{2}:\d{2} is available, should I go ahead and book your appointment\?/
        * User: yes
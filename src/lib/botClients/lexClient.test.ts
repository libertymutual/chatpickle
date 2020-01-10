import LexClient from './LexClient';

test('LexClient.speak()', async (): Promise<void> => {
    const botContext = {
        botName: 'OrderFlowers',
        botAlias: 'prod',
        region: 'us-east-1',
    };
    const userContext = {
        userId: 'homer',
        userAttributes: {
            firstName: 'Homer',
            lastName: 'Simpson',
            address: 'Springfield',
        },
    };
    const botClient = new LexClient(botContext, userContext);
    const reply = await botClient.speak('Hello World');
    expect(reply).toBe("I didn't understand you, what would you like to do?");
});

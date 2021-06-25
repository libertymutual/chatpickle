// Need to bypass type safety of typescript to allow this approach for mocking to work.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LexRuntime = require('aws-sdk/clients/lexruntime');
import LexVoiceClient from './LexVoiceClient';

jest.mock('aws-sdk/clients/lexruntime');

const lexRuntimePostTextPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
        sessionAttributes: { foo: 'bar' },
        message: 'This is a mocked message.',
    }),
});

LexRuntime.mockImplementation(() => ({
    postContent: lexRuntimePostTextPromise,
}));

test('LexVoiceClient.speak()', async (): Promise<void> => {
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
    const botClient = new LexVoiceClient(botContext, userContext);
    const reply = await botClient.speak('Hello World');
    expect(reply).toBe('This is a mocked message.');
});

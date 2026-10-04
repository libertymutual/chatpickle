// Need to bypass type safety of typescript to allow this approach for mocking to work.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LexRuntime = require('aws-sdk/clients/lexruntime');
import LexClient from './LexClient';

jest.mock('aws-sdk/clients/lexruntime');

const lexRuntimePostTextPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
        sessionAttributes: { foo: 'bar' },
        message: 'This is a mocked message.',
    }),
});

LexRuntime.mockImplementation(() => ({
    postText: lexRuntimePostTextPromise,
}));

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
    expect(reply).toBe('This is a mocked message.');
});

test('LexClient uses a unique userId for each conversation', async (): Promise<void> => {
    const botContext = { botName: 'OrderFlowers', botAlias: 'prod', region: 'us-east-1' };
    const userContext = { userId: 'homer', userAttributes: {} };
    lexRuntimePostTextPromise.mockClear();

    const firstClient = new LexClient(botContext, userContext);
    const secondClient = new LexClient(botContext, userContext);
    await firstClient.speak('Hello');
    await secondClient.speak('Hello');

    const firstUserId = lexRuntimePostTextPromise.mock.calls[0][0].userId;
    const secondUserId = lexRuntimePostTextPromise.mock.calls[1][0].userId;
    expect(firstUserId).toMatch(/^homer-[0-9a-f-]{36}$/);
    expect(secondUserId).toMatch(/^homer-[0-9a-f-]{36}$/);
    expect(firstUserId).not.toBe(secondUserId);
});

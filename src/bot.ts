import LexRuntime from 'aws-sdk/clients/lexruntime';

export class Bot {
    private botName: string;
    private botAlias: string;
    private userId: string;
    private lex: LexRuntime;
    public reply: string;

    constructor(botName: string, botAlias: string, region: string, userId: string) {
        this.botName = botName;
        this.botAlias = botAlias;
        this.userId = userId;
        this.lex = new LexRuntime({region: region});
        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async send(inputText: string): Promise<void> {
        const params = {
            botName: this.botName,
            botAlias: this.botAlias,
            userId: this.userId,
            inputText
        };

        try {
            console.log(`[${this.userId}] User: ${inputText}`);

            const response = await this.lex.postText(params).promise();

            this.reply = response.message.trim();

            console.log(`[${this.userId}] Bot: ${this.reply}`);
        } catch (e) {
            throw e;
        }
    }
}
import LexRuntime from 'aws-sdk/clients/lexruntime';
import get from 'lodash.get';
import { BotClient } from './BotClient';
import Polly from 'aws-sdk/clients/polly';
const Stream = require('stream');
const fs = require('fs');
const path = require('path');

export default class LexVoiceClient extends BotClient {

    private botName: string;
    private botAlias: string;
    private userId: string;
    private lastResponse: any;
    private sessionAttributes: any;
    private props: any;
    private lex: LexRuntime;
    private polly: Polly;

    constructor(botContext: any, userContext: any) {
        super(botContext, userContext);
        this.botName = this.botContext.botName;
        this.botAlias = this.botContext.botAlias;
        this.userId = `${this.userContext.userId}-${Date.now()}`;
        this.lastResponse = null;
        this.sessionAttributes = this.userContext.userAttributes;

        this.props = {
            region: this.botContext.region,
        };
        // Optional Auth Environment Variables
        this.props.accessKeyId = process.env.chatpickle_access_id || undefined;
        this.props.secretAccessKey = process.env.chatpickle_access_secret || undefined;

        this.lex = new LexRuntime(this.props);

        const pollyParams = {
            accessKey: process.env.chatpickle_access_id || undefined,
            secretAccessKey: process.env.chatpickle_access_secret || undefined,
            signatureVersion: "v4",
            region: 'us-east-1'
        }
        this.polly = new Polly(pollyParams);

        console.log(`[${this.userId}] New Conversation with ${this.botName}`);
    }

    public async speak(inputText: string): Promise<string> {

        console.log(`[${this.userId}] User: ${inputText}`);

        let audioStream: Buffer = null;

        if (inputText && inputText.indexOf('.pcm') >= 0) {

            const fileName = inputText.trim();
            try {
                audioStream = fs.readFileSync('./examples/lexVoice/chatpickle/UserAudioResponses/' + fileName);
            } catch (error) {
                console.log("Exception occurred while reading audio file: " + error.message);
            }

        } else {

            if (inputText === null) {
                inputText = '';
            }

            let pollyParams = {
                'Text': inputText,
                'OutputFormat': 'pcm',
                'VoiceId': 'Joanna'
            };

            try {
                const data = await this.polly.synthesizeSpeech(pollyParams).promise();
                if (data) {
                    if (data.AudioStream instanceof Buffer) {
                        audioStream = data.AudioStream;
                    }
                }
            } catch (err) {
                console.log('Unexpected error while synthesizing polly speech ' + err.code);
            }
        }

        console.log('Calling bot with inputText: ' + inputText);

        const params = {
            botName: this.botName,
            botAlias: this.botAlias,
            userId: this.userId,
            sessionAttributes: this.sessionAttributes,
            contentType: 'audio/x-l16; sample-rate=16000; channel-count=1',
            inputStream: audioStream,
            accept: 'text/plain; charset=utf-8'
        };


        try {
            this.lastResponse = await this.lex.postContent(params).promise();
        } catch (err) {
            console.log(err, err.stack);
        }

        let reply: string = null;

        if (this.lastResponse) {
            this.sessionAttributes = this.lastResponse ? this.lastResponse.sessionAttributes : null;
            reply = this.lastResponse.message ? this.lastResponse.message.trim() : null;
            console.log(`[${this.userId}] Bot: ${reply}`);
        }

        return reply;
    }

    public async fetch(attributePath: string): Promise<string> {
        return await get(this.lastResponse, attributePath);
    }
}

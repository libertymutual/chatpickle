import { Cli } from 'cucumber';

process.env.CHATPICKLE_CONSUMER_PATH_ABSOLUTE = process.env.CHATPICKLE_CONSUMER_PATH
    ? `${process.cwd()}/${process.env.CHATPICKLE_CONSUMER_PATH}`
    : process.cwd();

const runArgs = [
    null,
    '',
    `${process.env.CHATPICKLE_CONSUMER_PATH || ''}chatpickle`,
    '--require',
    'dist/cucumberSupport',
];
const cliArgs = { argv: runArgs, cwd: process.cwd(), stdout: process.stdout };
const cli = new Cli(cliArgs);

cli.run();

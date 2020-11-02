#!/usr/bin/env node

import { Cli } from 'cucumber';

const consumerPathArg = process.argv[2];

process.env.CHATPICKLE_CONSUMER_PATH_ABSOLUTE = consumerPathArg
    ? `${process.cwd()}/${consumerPathArg}`
    : process.cwd();

const runArgs = [
    null,
    '',
    `${consumerPathArg || ''}chatpickle`,
    '--require',
    `${__dirname}/cucumberSupport`,
];
const cliArgs = { argv: runArgs, cwd: process.cwd(), stdout: process.stdout };
const cli = new Cli(cliArgs);

cli.run();

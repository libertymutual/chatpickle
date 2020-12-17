#!/usr/bin/env node

import { Cli } from 'cucumber';

let consumerPathArg;
let passthruArgs;
if (process.argv[2] === '--cpPath') {
    consumerPathArg = process.argv[3];
    passthruArgs = process.argv.slice(4);
} else {
    passthruArgs = process.argv.slice(2);
} 

process.env.CHATPICKLE_CONSUMER_PATH_ABSOLUTE = consumerPathArg
    ? `${process.cwd()}/${consumerPathArg}`
    : process.cwd();

const runArgs = [
    null,
    '',
    `${consumerPathArg || ''}chatpickle`,
    '--require',
    `${__dirname}/cucumberSupport`,
    ...passthruArgs
];
const cliArgs = { argv: runArgs, cwd: process.cwd(), stdout: process.stdout };
const cli = new Cli(cliArgs);

cli.run()
    .then(result => {
        if (result.success) {
            process.exit(0);
        } else {
            process.exit(1);
        }
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

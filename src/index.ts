import { Cli } from 'cucumber';

const runArgs = ['', '../features'];
const cliArgs = {argv : runArgs, cwd: process.cwd(), stdout: process.stdout};

const cli = new Cli(cliArgs);

cli.run();
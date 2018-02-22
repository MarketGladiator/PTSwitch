#!/usr/bin/env node

'use strict';

const program = require('commander');
const pt = require('./lib/pt');
 
program
  .version('1.0.0', '-v, --version')
  .option('-p, --path <DIR>', 'Path to the ProfitTrailer Directory')
  .option('-f, --from <BTC>', 'Convert From')
  .option('-t, --to <ETH>', 'Convert To')
  .parse(process.argv);

pt.init(program.path, program.from, program.to);
const chalk = require("chalk");

const FILE_NOT_FOUND = () => {
  return console.log(`
${chalk.red("Warning")}: File not found. Please ensure the following path exists

${chalk.red(process.cwd() + "/.birdhouse.yml")}

    __________________________
   /.-.-.-.-.-.-.-.-.-.-.-.-.-\\
  /.-.-.-.-.-.-.-.-.-.-.-.-.-.-\\
 /.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\\
/.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-\\
'=================================='
\\||                          ||/
 ||         _         _      ||
 ||        ('<       <')     ||
 ||_______\\(_)_______(_)/____||
_||__________________________||__
|________________________________|
`);
};

const FAILED = message => {
  console.log(`
${chalk.red(message)}


${chalk.red("Process Failed. Please read above for error details.")}
${chalk.green("Thank you for using Birdhouse!")}
`);
};

const NO_COMMAND = () => {
  return console.log(`

    Usage: birdhouse ${chalk.red("<command>")}
  
    Where ${chalk.red("<command>")} is one of:
    construct, init
  
    
    construct: Build from ${chalk.blue(".birdhouse.yml")} file
  
    init: Initialize a basic yml example
  
    `);
};

module.exports = {
  NO_COMMAND,
  FILE_NOT_FOUND,
  FAILED
};

import { logconfig } from './common/tools/log.tool';
import { GameSocket } from './server/game/socket/game.socket';
import * as log from 'log4js';
import * as chalk from 'chalk';

log.configure(logconfig());
const serve = new GameSocket(9000);
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.green('@@@@@@@@>>>开启成功端口为[9000]<<<@@@@@@@'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
console.log(chalk.default.red('--------------------------------------------------'));
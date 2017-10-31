import { GameServe } from './GameServe';
var options = process.argv;
const port = options[2];
console.log(port);
new GameServe(port);

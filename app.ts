import { GameSocket } from './server/game/socket/game.socket';
const serve = new GameSocket(9000);
console.log('开启成功端口为9000');
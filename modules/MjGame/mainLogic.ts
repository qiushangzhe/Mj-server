
import { Position } from '../../enums/player.enum';
import { StateMachine } from './stateMachine';
import { Player } from '../player';

export class MainLogic extends StateMachine{
    nowPosition:Position = null;

    constructor(){
        super();
    }

    
}
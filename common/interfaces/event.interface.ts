import { MjCard } from './../../server/game/model/MjCard/mjCard';
import { SPlayer } from './../../server/game/model/smartPlayer';

import { MainStage } from '../enums/stage.enum';
export interface GameEvent{
    who ?: SPlayer; 
    /**
     * 当前前置状态是
     */
    beforeState:MainStage;
    /**
     * 当前牌的信息
     */
    targetCard?:MjCard;

}

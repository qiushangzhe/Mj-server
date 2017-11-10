import { QLOG } from './../../../../common/tools/log.tool';
interface msgInterface{
    type : number;
    data : any;
}
export class GameMainValidation{
    static LOG:QLOG = new QLOG('validation');
    static checkMsg_Main(msg):{result:boolean;data?:any}{
        let dealt_msg:msgInterface = null;
        if(msg === undefined || msg === null || msg === ''){
            GameMainValidation.LOG.error('a');
            return {result:false}
        }
        if(typeof msg === 'string'){
            dealt_msg = JSON.parse(msg);
        }else {
            dealt_msg = msg;
        }
        if(dealt_msg.type === null || dealt_msg.type === undefined){
            return {result : false};
        }else{
            return {result:true,data:dealt_msg};
        }
    }

    static checkMsg_Ready(msg){
        return {result:true,data:msg}
    }

    static test(msg){
        this.LOG.error('呵呵');
    }

    static checkMsg_Discard(msg){
        return true;
    }

    static checkMsg_PengCard(msg){
        return true;
    }

    static checkMsg_AnGangCard(msg){
        return true;
    }

    static checkMsg_MingGangCard(msg){
        return true;
    }

    static checkMsg_BuGangCard(msg){
        return true;
    }

    static checkMsg_HuCard(msg){
        return true;
    }

    static checkMsg_Pass(msg){
        return true;
    }
}
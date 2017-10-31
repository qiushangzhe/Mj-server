import * as ws from 'ws'
export class NetModule {
    protected serve:any = null;
    protected ws = null;
    constructor(port?:number){
        this.serve = new ws.Server({
            port: port || 9000 
        });
    }
}
import * as koa from 'koa';
import * as Router from 'koa-router';
import * as body from 'koa-body';
export class GameHttp{
    koaHandle:koa;
    router:Router;
    port:number;
    constructor(_port){
        this.koaHandle = new koa();
        this.koaHandle.use(body());
        this.router = new Router();
        this.port = _port;
    }

    init(){
        this.router.post('/sendUserInfo',(ctx)=>{
            
        });
    }

    start(){
        this.koaHandle.use(this.router.routes()).use(this.router.allowedMethods());;
        this.koaHandle.listen(this.port);
    }

}
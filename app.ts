const Koa = require('koa');
const app = new Koa();
const views = require('koa-views')
const path = require('path')
const ssr = require('./utils/ssr')
const utils = require('./utils')
const koaStatic = require('koa-static');
const KoaCache = require('./utils/cache')
const log4js = require('log4js');
log4js.configure({
    appenders: {
        //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        errorLog: { type: 'file', filename: 'logs/error.log' },
        error: { type: "logLevelFilter", level: "error", appender: 'errorLog' },
        infoLog: { type: 'file', filename: 'logs/info.log' },
        info: { type: "logLevelFilter", level: "info", appender: 'infoLog' },
        console: { type: 'console' }
    },
    categories: {
        info: { appenders: ['info'], level: 'info' },
        error: { appenders: ['error'], level: 'error' },
        default: { appenders: ['console', 'error'], level: 'trace' }
    }
});
// 如果需要组件匹配 使用此匹配
import { matchRoutes } from "react-router-config";
import routes from './client/router.config'
// redux同构
import { createServerStore } from './client/redux/store'

const errlogger = log4js.getLogger('error');
// 加载模板引擎
app.use(views(path.join(__dirname, './templates'), {
    extension: 'ejs'
}))
// 静态文件访问
app.use(koaStatic(path.join(__dirname,'./static')));
// 错误处理
app.on('error', (err:any) =>  {
    errlogger.error('ERR',err)
});

app.use(async ctx => {
    if(ctx.URL.pathname.indexOf('.')>-1) { 
        return false;
    }
    // 组件
    let branch =  matchRoutes(routes,ctx.URL.pathname);
    let component:any
    // 路由参数
    let params:any
    if (branch.length != 0) {
        component = branch[0].route.component;
        params = branch[0].match.params
    }else{
        branch = matchRoutes(routes,'/404');
        component = branch[0].route.component;
    }
    // redux state
    let state:any = {}
    // 数据预取data
    let data:any = {};
    try {
        data = await component.initData(params)
    } catch (error) {
        errlogger.error('获取数据错误 ERR',error)
        await ctx.render('error',{message:error})
    }
    console.log(data)
    // 状态
    let store = createServerStore({})
    // 标题
    let normalTitle = component.title?component.title:"通用标题"
    let dynamicTitle = data?data.hasOwnProperty('dynamicTitle')?data.dynamicTitle:null:null

    let title = dynamicTitle?dynamicTitle:normalTitle

    let ssrData = ssr({componentName:"SPA",data:{url:ctx.URL.pathname,data:data}},store)

    // let ssrData = ssr({componentName:"SPA",data:{url:"/test"}})

    // console.log(ssrData)

    await ctx.render('index', render(title,data,ssrData.html,state))
});

// 渲染配置
function render(title:string,initData:any,body:any,state:any){
    let head = utils.templateHead
    let foot = utils.templateFoot
    return {
        title,
        head:head(),
        foot:foot(),
        initData:'<script id="js-data" type="text/json">'+ JSON.stringify(initData) +'</script>',
        initState:'<script>window.STATE_FROM_SERVER = '+JSON.stringify(state)+'</script>',
        body
    }
}


app.listen(3000);
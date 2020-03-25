const Koa = require('koa');
const app = new Koa();
const views = require('koa-views')
const path = require('path')
const ssr = require('./utils/ssr')
const utils = require('./utils')

// 加载模板引擎
app.use(views(path.join(__dirname, './templates'), {
    extension: 'ejs'
}))

app.use(async ctx => {
    let title = 'hello koa2'
    let head = utils.templateHead
    let foot = utils.templateFoot

    let ssrData = ssr({componentName:"SPA",data:{url:"/test"}})

    console.log(ssrData)

    await ctx.render('index', {
        title,
        head:head(),
        foot:foot(),
        body:ssrData.html
    })
});

app.listen(3000);
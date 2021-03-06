var config = require('../config')
// 模板头部
function templateHead(){
    var head = 
    '<meta charset="utf-8">'+
    '<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">'+
    // '<script type="text/javascript" src="//connect.qq.com/qc_jssdk.js" data-appid="101748432" charset="utf-8"></script>'+
    '<link  rel="stylesheet" type="text/css" href="'+config.staticHost+'/css/index.css"/>'
    return head
}

// 模板尾部
function templateFoot(){
    var foot = 
    '<script src="'+config.staticHost+'/js/1.react.js"></script>' +
    '<script src="'+config.staticHost+'/js/react.js"></script>' 
    return foot
}

module.exports = {
    templateHead,
    templateFoot
}
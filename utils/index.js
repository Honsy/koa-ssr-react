const config = require('./../config')
// 模板头部
function templateHead(){
    var head = ''
    return head
}

// 模板尾部
function templateFoot(){
    var foot = 
    '  <script defer src="'+config.staticHost+'/static/js/react.js"></script>'
    return foot
}

module.exports = {
    templateHead,
    templateFoot
}
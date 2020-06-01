import * as React from 'react'
import GAProvider from './../ga-provider'

export default class Home extends React.Component{

    static contextType = GAProvider.context;

    static title = "我是首页啊"
    // 数据获取
    static async initData(params:any) {

        return {content:"首页"}
    }
    constructor(props:any){
        super(props)
    }

    render(){
        const { content } = this.context

        return (
            <div>Home{content}</div>
        )
    }
}
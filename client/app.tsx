import * as React from 'react'
import { Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Test from './pages/test'

function app() {
    return (
        <Switch>
            <Route exact path="/" component = {Home}></Route>
            <Route path="/test" component = {Test}></Route>
        </Switch>
    )
}

export default app
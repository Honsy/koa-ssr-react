import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,document.getElementById('react-container')
)
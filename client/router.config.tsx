import Home from './pages/home'
import Test from './pages/test'

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },{
        path: "/test",
        exact: true,
        component: Test
    }
]
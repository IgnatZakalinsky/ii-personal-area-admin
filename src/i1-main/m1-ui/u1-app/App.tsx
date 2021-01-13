import React from 'react'
import 'antd/dist/antd.dark.css' // antd
import './App.css'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import Main from '../u2-main/Main'
import store from '../../m2-bll/store'

// contexts
const App = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <div className='App'>
                    <Main/>
                </div>
            </Provider>
        </HashRouter>
    )
}

export default App

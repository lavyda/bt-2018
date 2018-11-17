import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Main from './components/Main'
import store from './store'
import './App.css'

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div className='app'>
                <Header />
                <Main />
            </div>
        </BrowserRouter>
    </Provider>
)

export default App
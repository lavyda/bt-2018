import React from 'react';
import { Route, Switch } from 'react-router-dom'
import About from '../About'
import HistoryContainer from '../HistoryContainer'
import ResultsContainer from '../ResultsContainer'
import './Main.css'

const Main = () => (
    <main className='main'>
        <Switch>
            <Route exact path="/" component={ResultsContainer} />
            <Route exact path="/history" component={HistoryContainer} />
            <Route exact path="/about" component={About} />
            <Route component={ResultsContainer} />
        </Switch>
    </main>
)

export default Main
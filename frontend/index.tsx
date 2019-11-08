import { h, render } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory, createBrowserHistory } from 'history';
import { FromPage, ToPage, RoutesPage } from './pages/index';

import './styles/main.scss';

const Redirect = (props: any = {}) => {
    route(props.to || '/from');
    return null;
}

const App = () => {
    return (
        <Router history={ createHashHistory() }>
            <FromPage path="/from"/>
            <ToPage path="/from/:from/to"/>
            <RoutesPage path="/from/:from/to/:to"/>
            <Redirect path="/" to="/from"/>
        </Router>
    )
}

render(<App />, document.body);
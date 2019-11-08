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
        <Router history={ createBrowserHistory() }>
            <FromPage href="/from"/>
            <ToPage href="/from/:from/to"/>
            <RoutesPage href="/from/:from/to/:to"/>
            <Redirect to="/from"/>
        </Router>
    )
}

render(<App />, document.body);
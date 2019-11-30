import { h, render, Component, Fragment } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';
import { PageShell, FromPage, ToPage, RoutesPage } from './pages/index';

import './styles/main.scss';
import { trainService, stationService } from './services';
import { Hero, Container } from './components';
import { TicketsPage } from './pages/tickets.page';

const Redirect = (props: any = {}) => {
    route(props.to || '/from');
    return null;
}

class App extends Component {
    public state = {
        loading: true,
        hashHistory: createHashHistory()
    }

    async componentDidMount() {
        await trainService.getList();
        await stationService.getList();
        this.setState({ loading: false })
    }

    goBackward = () => {
        this.state.hashHistory.goBack();
    }

    goForward = () => {
        this.state.hashHistory.goForward();
    }

    goHome = () => {
        route('/');
    }

    render () {
        if (this.state.loading) {
            return (
                <Hero>
                    <Container>
                        Loading....
                    </Container>
                </Hero>
            )
        }

        return (
            <div className="shell has-padding-bottom-6" data-version="1.0.0">
                <Router history={ this.state.hashHistory }>
                    <FromPage path="/from" />
                    <ToPage path="/from/:from/to" />
                    <RoutesPage path="/from/:from/to/:to" />
                    <TicketsPage path="/from/:from/to/:to/no/:trainno" />
                    <Redirect path="/" to="/from" />
                </Router>
                <div className="float-menu">
                    <div className="float-menu-item" onClick={ this.goBackward }>
                        <i className="ion ion-md-arrow-round-back"></i>
                    </div>
                    <div className="float-menu-item" onClick={ this.goHome }>
                        <i className="ion ion-md-home"></i>
                    </div>
                    <div className="float-menu-item" onClick={ this.goForward }>
                        <i className="ion ion-md-arrow-round-forward"></i>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App />, document.body);
import { h, render, Component } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';
import { FromPage, ToPage, RoutesPage } from './pages/index';

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
        loading: true
    }

    async componentDidMount() {
        await trainService.getList();
        await stationService.getList();
        this.setState({ loading: false })
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
            <Router history={ createHashHistory() }>
                <FromPage path="/from" />
                <ToPage path="/from/:from/to" />
                <RoutesPage path="/from/:from/to/:to" />
                <TicketsPage path="/from/:from/to/:to/no/:trainno" />
                <Redirect path="/" to="/from" />
            </Router>
        )
    }
}

render(<App />, document.body);
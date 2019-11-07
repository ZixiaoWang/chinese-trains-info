import { h, render } from 'preact';
import { FromPage, ToPage, RoutesPage } from './pages/index';

import './styles/main.scss';

const App = () => {
    return (
        // <FromPage />
        // <ToPage />
        <RoutesPage />
    )
}

render(<App />, document.body);
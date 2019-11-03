import { h, render } from 'preact';
import { HomePage } from './pages/index';

import './styles/main.scss';

const App = () => {
    return (
        <HomePage />
    )
}

render(<App />, document.body);
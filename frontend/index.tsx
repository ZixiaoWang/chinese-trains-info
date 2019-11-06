import { h, render } from 'preact';
import { FromPage, ToPage } from './pages/index';

import './styles/main.scss';

const App = () => {
    return (
        <FromPage />
        // <ToPage />
    )
}

render(<App />, document.body);
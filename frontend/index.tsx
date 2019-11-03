import { trainService, stationService } from './services/index';
import { h, render } from 'preact';

const App = () => {
    return (
        <div>Hello World</div>
    )
}

render(<App />, document.body);
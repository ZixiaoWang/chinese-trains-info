import { h, Component, ComponentChild } from 'preact';
import lodash from 'lodash';

export abstract class PageBase extends Component {
    onValueChange = (path: string, value: any) => {
        let state: any = this.state;
        lodash.set(state, path, value);
        console.log(state)
        this.setState(state);
    }
    
    onEventChange = (path: string, event: Event) => {
        let state: any = this.state;
        let target: HTMLInputElement = event.target as HTMLInputElement;
        lodash.set(state, path, target.value);
        console.log(state);
        this.setState(state);
    }

    abstract render(): h.JSX.Element;
}
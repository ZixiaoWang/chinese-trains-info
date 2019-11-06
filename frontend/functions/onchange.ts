import { set } from 'lodash';

export function onValueChange (this: any, path: string, value: any) {
    let state: any = this.state;
    set(state, path, value);
    this.setState(state);
}

export function onEventChange (this: any, path: string, event: Event) {
    let state: any = this.state;
    let target: HTMLInputElement = event.target as HTMLInputElement;
    set(state, path, target.value);
    this.setState(state);
}
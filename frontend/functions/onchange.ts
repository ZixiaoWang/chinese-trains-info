import lodash from 'lodash';

export interface valueChange {
    onValueChange: (path: string, value: any) => void
}

export interface eventChange {
    onEventChange: (path: string, event: Event) => void
}

export function onValueChange (this: any, path: string, value: any) {
    let state: any = this.state;
    lodash.set(state, path, value);
    this.setState(state);
}

export function onEventChange (this: any, path: string, event: Event) {
    let state: any = this.state;
    let target: HTMLInputElement = event.target as HTMLInputElement;
    lodash.set(state, path, target.value);
    this.setState(state);
}
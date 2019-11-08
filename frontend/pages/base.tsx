import { h, Component, Fragment } from 'preact';
import lodash from 'lodash';

export abstract class PageBase extends Component<any, any> {
    onValueChange = (path: string, value: any) => {
        let state: any = this.state;
        lodash.set(state, path, value);
        this.setState(state);
    }
    
    onEventChange = (path: string, event: Event) => {
        let state: any = this.state;
        let target: HTMLInputElement = event.target as HTMLInputElement;
        lodash.set(state, path, target.value);
        this.setState(state);
    }

    renderHighlight = (original: string, highlights: string | null) => {
        if (!highlights) {
            return original;
        }

        const reg: RegExp = new RegExp(highlights, 'g');
        const fragments: string[] = original.split(reg);
        return fragments
            .map((fragment: string, index: number) => {
                return (
                    <Fragment>
                        <span>{ fragment }</span>
                        { index > 0 && <strong className="has-text-link">{ highlights }</strong> }
                    </Fragment>
                )
            });
    }

    abstract render(props?: any): h.JSX.Element;
}
import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';

export class PageShell extends Component {

    render (props: any) {
        return (
            <div className="shell">
                it works
                { props.children }
            </div>
        )
    }
}
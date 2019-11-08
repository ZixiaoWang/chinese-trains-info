import { h, Component, Fragment } from 'preact';
import { PageBase } from './base';

export class RoutesPage extends PageBase {

    renderRoutes = () => {
        return (
            null
        )
    }

    render() {
        return (
            <div className="page has-padding-top-7">
                <div className="is-fixed-top is-height-7 has-shadow-3">
                    <div className="is-flex has-addons">
                        <div className="control">
                            <div className="input is-borderless is-shadowless">
                                <span className="has-text-gray">从</span>
                            </div>
                        </div>
                        <div className="control">
                            <div className="input is-borderless is-shadowless">
                                <span className="has-text-info">新疆</span>
                            </div>
                        </div>
                    </div>
                    <div className="is-flex has-addons">
                        <div className="control">
                            <div className="input is-borderless is-shadowless">
                                <span className="has-text-gray">到</span>
                            </div>
                        </div>
                        <div className="control">
                            <div className="input is-borderless is-shadowless">
                                <span className="has-text-info">呼和浩特</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Fragment>
                    { this.renderRoutes() }
                </Fragment>
            </div>
        )
    }
}
import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';
import { PageBase } from './base';
import { Hero, Spinner } from '../components';
import { Train } from '../interfaces';
import { trainService } from '../services';

export class RoutesPage extends PageBase {

    public state: any = {
        list: [],
        loading: true
    }

    async componentDidMount() {
        this.setState({
            loading: false
        })
    }

    navigateTo = (train: Train) => {
        route(`${ this.props.url }/no/${ train.no }`);
    }

    renderHeader = () => {
        const from: string = decodeURIComponent(this.props.from);
        const to: string = this.props.to === 'all' ? '我也不知道' : decodeURIComponent(this.props.to);

        return (
            <div className="is-fixed-top is-height-7 has-shadow-3 has-background-white">
                <div className="is-flex has-addons">
                    <div className="control">
                        <div className="input is-borderless is-shadowless">
                            <span className="has-text-gray">从</span>
                        </div>
                    </div>
                    <div className="control">
                        <div className="input is-borderless is-shadowless">
                            <span className="has-text-info">{from}</span>
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
                            <span className="has-text-info">{to}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderRoutes = () => {
        const from: string = this.props.from;
        const to: string | null | undefined = this.props.to === 'all' ? null : this.props.to;
        const trains: Train[] = trainService.searchByFromAndOrTo(from, to);

        return (
            <Fragment>
                <div className="panel">
                    {
                        trains.map((train: Train, index: number) => {
                            return (
                                <div key={ index }
                                    className="panel-block is-block" 
                                    onClick={ this.navigateTo.bind(this, train) }>
                                    <div className="is-size-7">{ train.code }</div>
                                    <div>
                                        <span>{ train.from }</span>
                                        <span> - </span>
                                        <strong className="has-text-info">{ train.to }</strong>
                                    </div>
                                    <div className="is-size-7">
                                        <i className="has-text-grey">{ train.no }</i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Fragment>
        )
    }

    render(props: any) {
        if (this.state.loading) {
            return (
                <div className="has-padding-top-7">
                    <Hero>
                        <Spinner />
                    </Hero>
                    {this.renderHeader()}
                </div>
            )
        }

        return (
            <div className="has-padding-top-7">
                {this.renderRoutes()}
                {this.renderHeader()}
            </div>
        )
    }
}
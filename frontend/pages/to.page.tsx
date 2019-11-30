import { h, Fragment, createRef, RefObject } from 'preact';
import { route, Link } from 'preact-router';
import { Container, Hero } from '../components';
import { attach, onValueChange, onEventChange } from '../functions';
import { PageBase } from './base';
import { Train } from '../interfaces';
import { trainService } from '../services';

@attach({ onValueChange })
@attach({ onEventChange })
export class ToPage extends PageBase {
    public state = {
        focus: false,
        keyword: null
    };
    private searchInput = createRef();

    navigateTo = (train: Train) => {
        const to: string = encodeURIComponent(train.to);
        route(`/from/${ this.props.from }/to/${ to }`);
    }

    focus = () => {
        this.onValueChange('focus', true);
        setTimeout(() => {
            this.searchInput.current.focus();
        }, 0)
    }

    reset = () => {
        this.setState({
            focus: false,
            keyword: null
        })
    }

    renderItems = () => {
        if (!this.state.keyword) {
            return null;
        }

        const from: string = decodeURIComponent(this.props.from);
        const keyword: string | null = this.state.keyword;
        const items = trainService
            .searchByTo(this.state.keyword)
            .map((train: Train, index: number) => {
                return (
                    <div key={ index }
                        className="panel-block is-block"
                        onClick={ this.navigateTo.bind(this, train) }>
                        <div className="is-size-7">
                            { this.renderHighlight(train.code, keyword) }
                        </div>
                        <div>
                            <span>{ from }</span>
                            <span> - </span>
                            <span>{ this.renderHighlight(train.to, keyword) }</span>
                        </div>
                        <div className="is-size-7">
                            <i className="has-text-grey">{ train.no }</i>
                        </div>
                    </div>
                )
            });

        return (
            <div className="panel">
                { items }
            </div>
        )
    }
    
    renderUnfocusedStatus() { 
        const from: string = decodeURIComponent(this.props.from);
        return (
            <Hero>
                <Container>
                    <form className="form">
                        <div className="field">
                            <div className="control">
                                <div className="input is-shadowless is-borderless">
                                    <span>我从</span>
                                    <strong className="has-text-link">&nbsp;{ from }&nbsp;</strong>
                                    <span>出发</span>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input type="text" 
                                    className="input is-rounded" 
                                    placeholder="我想去..." 
                                    onClick={ this.focus }/>
                                <span className="icon is-small is-left">
                                    <i className="ion ion-md-map"></i>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="field">
                            <Link href={`${this.props.url}/all`}
                                className="button is-info is-rounded is-fullwidth">
                                随便
                            </Link>
                        </div>
                    </form>
                </Container>
            </Hero>
        )
    }

    renderFocusedStatus = () => {
        return (
            <div className="has-top-input">
                { this.renderItems() }
                <div className="field has-addons is-fixed-top">
                    <div className="control is-expanded">
                        <input type="text" 
                            ref={ this.searchInput }
                            onKeyUp={ this.onEventChange.bind(this, 'keyword') }
                            className="input is-radiusless" 
                            placeholder="从哪里出发?"/>
                    </div>
                    <div className="control">
                        <a className="button is-radiusless" onClick={ this.reset }>
                            <i className="ion ion-md-close-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                { 
                    (this.state.focus || this.state.keyword) && 
                    this.renderFocusedStatus() 
                }
                { 
                    !(this.state.focus || this.state.keyword) && 
                    this.renderUnfocusedStatus() 
                }
            </Fragment>
        )
    }
}
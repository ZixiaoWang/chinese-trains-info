import { h, Fragment } from 'preact';
import { route } from 'preact-router';
import { PageBase } from './base';
import { Container, Hero } from '../components';
import { stationService } from '../services';
import { Station } from '../interfaces';

export class FromPage extends PageBase {
    public state = {
        focus: false,
        keyword: null,
        stations: []
    }

    navigateTo = (station: Station) => {
        const name: string = encodeURIComponent(station.name);
        route(`/from/${ name }/to`);
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

        const items = stationService
            .search(this.state.keyword)
            .map((station: Station, index: number) => {
                return (
                    <div key={ index } 
                        className="panel-block is-block" 
                        onClick={ this.navigateTo.bind(this, station) }>
                        <div>
                            { this.renderHighlight(station.name, this.state.keyword) }
                            &nbsp;
                            { this.renderHighlight(station.abbreviation, this.state.keyword) }
                        </div>
                        <small>{ this.renderHighlight(station.pinyin, this.state.keyword) }</small>
                    </div>
                );
            });

        return (
            <div className="panel">
                { items }
            </div>
        )
    }

    renderUnfocusedStatus = () => (
        <Hero>
            <Container>
                <form className="form">
                    <div className="field">
                        <div className="content">
                            <label className="label">第一步</label>
                            <p className="is-size-6">请说明您的出发地</p>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left">
                            <input type="text" 
                                onClick={ this.onValueChange.bind(this, 'focus', true) }
                                className="input is-rounded" 
                                placeholder="从哪里出发?" />
                            <span className="icon is-small is-left">
                                <i className="ion ion-md-pin"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </Container>
        </Hero>
    );

    renderFocusedStatus = () => (
        <div className="page has-top-input">
            { this.renderItems() }
            <div className="field has-addons is-fixed-top">
                <div className="control">
                    <a className="button is-radiusless" onClick={ this.reset }>
                        <i className="ion ion-md-arrow-back"></i>
                    </a>
                </div>
                <div className="control is-expanded">
                    <input type="text" 
                        onKeyUp={ this.onEventChange.bind(this, 'keyword') }
                        className="input is-radiusless" 
                        placeholder="从哪里出发?"/>
                </div>
            </div>
        </div>
    )

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
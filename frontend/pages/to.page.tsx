import { h, Component, Fragment } from 'preact';
import { route, Link } from 'preact-router';
import { Container, Hero } from '../components';
import { attach, onValueChange, onEventChange } from '../functions';
import { PageBase } from './base';

@attach({ onValueChange })
@attach({ onEventChange })
export class ToPage extends PageBase {
    public state = {
        focus: false,
        keyword: null
    };
    
    render(props: any) { 
        console.log(props)
        const from: string = decodeURIComponent(props.from);

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
                                <input type="text" className="input is-rounded" placeholder="我想去..." />
                                <span className="icon is-small is-left">
                                    <i className="ion ion-md-map"></i>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="field">
                            <Link href={`${props.url}/all`}
                                className="button is-info is-rounded is-fullwidth">
                                随便
                            </Link>
                        </div>
                    </form>
                </Container>
            </Hero>
        )
    }
}
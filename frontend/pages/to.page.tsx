import { h, Component } from 'preact';
import { Container, Hero } from '../components';
import { attach, onValueChange, onEventChange } from '../functions';

@attach({ onValueChange })
@attach({ onEventChange })
export class ToPage extends Component<any, any> {
    public state = {
        focus: false,
        keyword: null
    };
    
    render() {
        return (
            <Hero>
                <Container>
                    <form className="form">
                        <div className="field">
                            <div className="control">
                                <div className="input is-shadowless is-borderless">
                                    <span>我从</span>
                                    <strong className="has-text-link">新疆</strong>
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
                            <button className="button is-info is-rounded is-fullwidth">随便</button>
                        </div>
                    </form>
                </Container>
            </Hero>
        )
    }
}
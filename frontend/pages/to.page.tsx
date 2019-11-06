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
                            <div className="content">
                                <label className="label">第二步</label>
                                <p className="is-size-6">
                                    请告诉我们您想去哪，或者您可以选择“随机”
                            </p>
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
                        <div className="field">
                            <button className="button is-info is-rounded is-fullwidth">随机</button>
                        </div>
                        <hr />
                        <div className="field">
                            <button className="button is-primary is-rounded is-fullwidth">下一步</button>
                        </div>
                    </form>
                </Container>
            </Hero>
        )
    }
}
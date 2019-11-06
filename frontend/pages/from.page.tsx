import { h, Component, Fragment } from 'preact';
import { Container, Hero } from '../components';
import { attach, onValueChange, onEventChange } from '../functions';

@attach({ onValueChange })
@attach({ onEventChange })
export class FromPage extends Component {
    public state = {
        focus: false,
        keyword: null
    }
    
    render() {
        return (
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
                                <input type="text" className="input is-rounded" placeholder="从哪里出发?" />
                                <span className="icon is-small is-left">
                                    <i className="ion ion-md-pin"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-fullwidth is-rounded is-primary">下一步</button>
                        </div>
                    </form>
                </Container>
            </Hero>
        )
    }
}
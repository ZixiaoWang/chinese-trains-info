import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';
import { ticketService, trainService } from '../services';
import { Ticket, Train } from '../interfaces';
import { Container } from '../components';

export class TicketsPage extends Component<any, any> {
    public state = {
        train: trainService.searchByNo(this.props.trainno),
        train_no: null,
        left_tickets: [],
        loading: false,
        error: null
    }

    async componentDidMount() {
        if (this.props.trainno) {
            this.setState({
                loading: true
            });

            try {
                const train_no: string = this.props.trainno;
                const left_tickets: Ticket[] = await ticketService.queryLeftTicket(train_no);
                this.setState({
                    loading: false,
                    train_no,
                    left_tickets
                })
            } catch (e) {
                this.setState({
                    loading: false,
                    error: e
                })
            }
        }
    }

    renderHead = () => {
        const train: Train | null | undefined = this.state.train;

        if (!train) {
            return (
                <div className="field">
                    <div className="card">
                        <div className="card-content">
                            <strong>Train is not found</strong>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="field has-padding-1">
                <div className="card">
                    <div className="card-content">
                        <span className="is-size-7">{ train.code }</span>
                        <div className="control">
                            <div>
                                <span className="is-size-6">from: </span>
                                <strong>{ train.from }</strong>
                            </div>
                            <div>
                                <span className="is-size-6">to: </span>
                                <strong>{ train.to }</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderList = () => {
        if (this.state.left_tickets.length === 0) {
            return (
                <div className="field">
                    No train was found
                </div>
            )
        }

        return (
            this.state.left_tickets
                .map((stop: any, index) => {
                    return (
                        <div className="card">
                            <div className="card-content">
                                { stop.station_name }
                            </div>
                        </div>
                    )
                })
        )
    }

    render () {
        return (
            <Fragment>
                <Container>
                    { this.renderHead() }
                    { this.renderList() }
                </Container>
            </Fragment>
        )
    }
}
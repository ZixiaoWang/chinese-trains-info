import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';
import { ticketService, trainService } from '../services';
import { Ticket, Train } from '../interfaces';

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
            <div className="field">
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

    render () {
        return null;
    }
}
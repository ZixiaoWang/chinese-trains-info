import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';
import { ticketService, trainService } from '../services';
import { Ticket, Train } from '../interfaces';
import { Container, Spinner } from '../components';

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
        const date: Date = new Date();

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
            <div className="has-padding-1">
                <div className="card ticket-card">
                    <div className="has-padding-1">
                        <strong className="has-text-danger is-size-7">{ train.no }</strong>
                        <div className="level is-mobile">
                            <div className="level-left">
                                <strong>{ train.from }</strong>
                            </div>
                            <div className="level-item">
                                <small className="has-text-grey">{ train.code }</small>
                            </div>
                            <div className="level-right">
                                <strong>{ train.to }</strong>
                            </div>
                        </div>
                        <div>
                            <span>{ date.getFullYear() }</span>
                            <small>年</small>
                            <span>{ date.getMonth() + 1 }</span>
                            <small>月</small>
                            <span>{ date.getDate() }</span>
                            <small>日</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderList = () => {
        if (this.state.loading) {
            return <Spinner />;
        }

        if (this.state.left_tickets.length === 0) {
            return (
                <div className="field">
                    No train was found
                </div>
            )
        }

        return (
            this.state.left_tickets
                .map((ticket: Ticket, index: number) => {
                    const classList: string [] = ['ticket'];
                    if (index === 0) {
                        classList.push('is-first');
                    } else if (index === this.state.left_tickets.length - 1) {
                        classList.push('is-last');
                    }

                    return (
                        <div className="card is-shadowless" key={ index }>
                            <div className="card-content">
                                <div className={ classList.join(' ') }>
                                    <small className="ticket-index has-gap">{ ticket.station_no }</small>
                                    <div className="has-gap">
                                        <div>{ ticket.station_name }</div>
                                        <div className="is-size-7">
                                            {
                                                index > 0 &&
                                                ticket.arrive_time &&
                                                <div className="is-inline-flex has-gap">
                                                    <strong>到站：</strong>
                                                    { ticket.arrive_time }
                                                    { 
                                                        ticket.arrive_day_diff &&
                                                        ticket.arrive_day_diff !== '0' &&
                                                        <sup> +{ ticket.arrive_day_diff }</sup>
                                                    }
                                                </div>
                                            }
                                            {
                                                index !== this.state.left_tickets.length - 1 &&
                                                <div className="is-inline-flex has-gap">
                                                    <strong>开车：</strong>
                                                    { ticket.start_time }
                                                    { 
                                                        ticket.arrive_day_diff &&
                                                        ticket.arrive_day_diff !== '0' &&
                                                        <sup> +{ ticket.arrive_day_diff }</sup>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
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
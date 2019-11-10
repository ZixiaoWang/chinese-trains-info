import { h, Component, Fragment } from 'preact';
import { route } from 'preact-router';
import { ticketService, trainService } from '../services';
import { Ticket, Train } from '../interfaces';

export class TicketsPage extends Component<any, any> {
    public state = {
        train: null,
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
                const train: Train | null | undefined = trainService.searchByNo(train_no);
                const left_tickets: Ticket[] = await ticketService.queryLeftTicket(train_no);
                this.setState({
                    loading: false,
                    train,
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

    render () {
        return null;
    }
}
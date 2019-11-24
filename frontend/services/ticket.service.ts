import lodash from 'lodash';
import { Ticket } from '../interfaces';

export const ticketService = (() => {
    const left_ticket_api: string = '/api/v1/leftTickets';
    
    class TicketService {
        queryLeftTicket = async (train_no: string): Promise<Ticket[]> => {
            const date = new Date();
            const train_date: string = date.toISOString().substring(0, 10);
            const params: string[] = [
                `no=${ train_no }`,
                `date=${ train_date }`
            ];

            const api: string = left_ticket_api + '?' + params.join('&');
            const response: Response = await fetch(api, { mode: 'cors' });
            const body = await response.json();
            return lodash.get(body, 'data.data', []);
        }
    }

    return new TicketService();
})()
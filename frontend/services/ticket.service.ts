import lodash from 'lodash';
import { Ticket } from '../interfaces';

export const ticketService = (() => {
    const left_ticket_api: string = 'https://kyfw.12306.cn/otn/queryTrainInfo/query';
    class TicketService {
        queryLeftTicket = async (train_no: string): Promise<Ticket[]> => {
            const date = new Date();
            const train_date: string = date.toISOString().substring(0, 10);
            const rand_code = Math.random();
            const params: string[] = [
                `leftTicketDTO.train_no=${ train_no }`,
                `leftTicketDTO.train_date=${ train_date }`,
                `rand_code=${ rand_code }`
            ];

            const response: Response = await fetch(left_ticket_api + '?' + params.join('&'));
            const body = await response.json();
            return lodash.get(body, 'data.data', []);
        }
    }

    return new TicketService();
})()
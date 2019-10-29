const fs = require('fs-extra');
const axios = require('axios');
const _ = require('lodash');

const api_0 = 'https://kyfw.12306.cn/otn/leftTicketPrice/query?leftTicketDTO.train_date=2019-10-29&leftTicketDTO.from_station=NJH&leftTicketDTO.to_station=SHH&leftTicketDTO.ticket_type=1&randCode=';
const api_1 = 'https://kyfw.12306.cn/otn/queryTrainInfo/query?leftTicketDTO.train_no=2400000D2713&leftTicketDTO.train_date=2019-10-28&rand_code=';
const api = 'https://kyfw.12306.cn/otn/queryTrainInfo/query';

const query = async ({ date, no }) => {
    const params = { 
        leftTicketDTO: {
            train_no: no,
            date
        } 
    }
    const response = axios.get(api, { params });
    const data = _.get(response, 'data.data.data');
    return data;
}

module.exports = query;
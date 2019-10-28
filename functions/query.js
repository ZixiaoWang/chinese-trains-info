const fs = require('fs-extra');
const axios = require('axios');
const _ = require('lodash');

const endpoint = 'https://kyfw.12306.cn/otn/queryTrainInfo/query?leftTicketDTO.train_no=2400000D2713&leftTicketDTO.train_date=2019-10-28&rand_code=';
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
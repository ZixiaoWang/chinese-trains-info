const axios = require('axios');

// https://kyfw.12306.cn/otn/queryTrainInfo/query?leftTicketDTO.train_no=9300000Z7003&leftTicketDTO.train_date=2019-11-24&rand_code=0.08919850605745627
const getLeftTickets = async (request, response) => {
    const baseURL = 'https://kyfw.12306.cn/otn/queryTrainInfo/query';
    const train_no = request.query.no;
    const train_date = request.query.date;
    const rand_code = Math.random().toString();
    const params = {
        'leftTicketDTO.train_no': train_no,
        'leftTicketDTO.train_date': train_date,
        rand_code
    }
    
    const res = await axios.get(baseURL, { params });
    response.status(res.status);
    response.send(res.data);
}

module.exports = { getLeftTickets }
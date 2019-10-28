const fs = require('fs-extra');
const path = require('path');

const api = 'https://kyfw.12306.cn/otn/queryTrainInfo/query?leftTicketDTO.train_no=2400000D2713&leftTicketDTO.train_date=2019-10-28&rand_code=';

const mapifyData = async () => {
    const data_folder = path.resolve(__dirname, '../data');
    const file_list = await fs.readdir(data_folder);
    const file = file_list[file_list.length - 1];
    const records = await fs.readJSON(path.resolve(data_folder, file));

    const start_station_map = {};
    const arrive_station_map = {};
    records.forEach(train => {
        const { from, to, code, no } = train;
        if (!start_station_map[from]) {
            start_station_map[from] = [];
        }
        if (!arrive_station_map[to]) {
            arrive_station_map[to] = [];
        }

        start_station_map[from].push(train);
        arrive_station_map[to].push(train);
    })
}

module.exports = { mapifyData };
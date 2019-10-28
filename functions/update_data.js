const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');

const api = 'https://kyfw.12306.cn/otn/resources/js/query/train_list.js?scriptVersion=2.0';
const output = path.resolve(__dirname, '../data');

const updateDataByDate = async (date, trains_info) => {
    const filename = 'train_list.json';
    const filepath = path.resolve(__dirname, output, filename);
    const is_path_exist = await fs.pathExists(filepath);

    if (!is_path_exist) {
        let train_list = [];

        Object
            .keys(trains_info)
            .forEach(async (code) => {
                const sublist = trains_info[code]
                    .map((record) => {
                        const infos = record.station_train_code.split(/\(|\)|\-/g);
                        return {
                            date,
                            code: infos[0],
                            from: infos[1],
                            to: infos[2],
                            no: record.train_no
                        };
                    });

                train_list = train_list.concat(sublist);
            });
        
        await fs.writeJSON(filepath, train_list);
    }
}

const updateData = async () => {
    await fs.ensureDir(output);
    const response = await axios.get(api); 
    eval(response.data);
    const dates = Object.keys(train_list);
    const latest_date = dates.reduce((the_latest_date, date) => { return date > the_latest_date ? date : the_latest_date }, '');

    updateDataByDate(latest_date, train_list[latest_date])
};

module.exports = updateData;
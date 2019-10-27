const fs = require('fs-extra');
const axios = require('axios');
const path = require('path');

export const getData = async () => {
    const api = 'https://kyfw.12306.cn/otn/resources/js/query/train_list.js?scriptVersion=2.0';
    const output = path.resolve(__dirname, '../data');

    await fs.ensureDir(output);
    let response = await axios.get(api);
    eval(response.data);
    let list = train_list;

    Object
        .keys(list)
        .forEach(async (date) => {
            const filename = date.replace(/-/g, '') + '.json';
            const filepath = path.resolve(__dirname, output, filename);
            const is_path_exist = await fs.pathExists(filepath);

            if (!is_path_exist) {
                let train_list = [];

                Object
                    .keys(list[date])
                    .forEach(async (code) => {
                        const sublist = list[date][code]
                            .map((record) => {
                                const infos = record.station_train_code.split(/\(|\)|\-/g);
                                return {
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
        });
};
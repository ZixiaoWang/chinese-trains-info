const fs = require('fs-extra');
const path = require('path');

const mapifyData = async () => {
    const data_folder = path.resolve(__dirname, '../data');
    const file_list = await fs.readdir(data_folder);
    const file = file_list[file_list.length - 1];
    const trains = await fs.readJSON(path.resolve(data_folder, file));

    const start_station_map = {};
    trains.forEach(async (train) => {
        const { from, to, code, no } = train;
        if (!start_station_map[from]) {
            start_station_map[from] = {};
        }
        start_station_map[from][code] = train;
    });

    await fs.writeJSON(path.resolve(data_folder, 'train_map.json'), start_station_map, { spaces: 2 });
}

module.exports = mapifyData;
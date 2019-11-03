import { Station } from "../interfaces/index";
import { DATA_PATH } from "../constants/index";

export const stationService = (() => {
    class StationService {
        private station_list: Station[] = [];
        private station_map: Map<string, Station> = new Map();
        
        getList = async (forceUpdate: boolean = false) => {
            if (this.station_list.length === 0 || !!forceUpdate === true) {
                const stationsJsonPath: string = DATA_PATH + 'station_list.json';
                const response: Response = await fetch(stationsJsonPath);
                const stations: Station[] = await response.json();
                this.station_list = stations;
            }
            return this.station_list;
        }

        getMap = async (forceUpdate: boolean = false) => {
            if (this.station_map.size === 0 || !!forceUpdate === true) {
                const list = await this.getList();
                list.forEach((station: Station, index: number) => {
                    this.station_map.set(station.name, station);
                })
            }
            return this.station_map;
        }

        search = (keyword: string) => {
            if (!keyword || keyword.length === 0) {
                return this.station_list;
            }

            const lowercase_keyword: string = keyword.toLowerCase();
            return this.station_list.filter((station: Station) => {
                if (station.name.includes(lowercase_keyword) ||
                    station.pinyin.includes(lowercase_keyword) ||
                    station.abbreviation.includes(lowercase_keyword)) {
                        return true;
                    }
                return false;
            });
        }
    }

    return new StationService();
})();
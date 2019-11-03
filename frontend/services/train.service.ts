import { Train } from "../interfaces/index";
import { DATA_PATH } from "../constants/index";

export const trainService = (() => {
    class TrainService {
        private train_list: Train[] = [];
        private train_map: Map<string, Train> = new Map();

        getList = async (forceUpdate: boolean = false) => {
            if (this.train_list.length === 0 || !!forceUpdate === true) {
                const trainListJsonPath: string = DATA_PATH + 'train_list.json';
                const response: Response = await fetch(trainListJsonPath);
                const trainList: Train[] = await response.json();
                this.train_list = trainList;
            }
            return this.train_list;
        }

        getMap = async (forceUpdate: boolean = false) => {
            if (this.train_map.size === 0 || !!forceUpdate === true) {
                const list = await this.getList();
                list.forEach((train: Train, index: number) => {
                    this.train_map.set(train.code, train);
                });
            }
            return this.train_map;
        }
    }
    return new TrainService();
})()
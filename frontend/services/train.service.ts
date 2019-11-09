import { Train } from "../interfaces/index";
import { DATA_PATH } from "../constants/index";

export const trainService = (() => {
    class TrainService {
        private train_list: Train[] = [];
        private train_map: Map<string, Train> = new Map();

        constructor () {
            this.getList();
            this.getMap();
        }

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

        search = (keyword: string) => {
            const list: Train[] = this.train_list;
            const lowercase_keyword: string = keyword.toLowerCase();
            const match_list: any[] = [];

            if (!keyword || keyword.length === 0) {
                return list;
            }

            list.forEach((train: Train) => {
                if (train.code.toLowerCase().includes(lowercase_keyword)) {
                    match_list.push({ ...train, weight: 3 });
                } else if (
                    train.from.includes(lowercase_keyword) ||
                    train.to.includes(lowercase_keyword)) {
                    match_list.push({ ...train, weight: 2 });
                } else if (
                    train.from_pinyin.includes(lowercase_keyword) ||
                    train.to_pinyin.includes(lowercase_keyword)
                ) {
                    match_list.push({ ...train, weight: 1 })
                }
            });

            return match_list.sort((pre, next) => {
                return pre.weight > next.weight ? -1 : 1
            });
        }

        searchFrom = (keyword: string | null | undefined) => {
            if (!keyword) {
                return this.train_list;
            }

            const results = this.search(keyword);
            const lowercase_keyword: string = keyword.toLowerCase();

            return results.filter((train: Train) => {
                if (train.code.toLowerCase().includes(lowercase_keyword) ||
                    train.from.includes(lowercase_keyword) ||
                    train.from_pinyin.includes(lowercase_keyword)){
                    return true;
                }
                return false;
            })
        }

        searchTo = (keyword: string | null | undefined) => {
            if (!keyword) {
                return this.train_list;
            }

            const results = this.search(keyword);
            const lowercase_keyword: string = keyword.toLowerCase();

            return results.filter((train: Train) => {
                if (train.code.toLowerCase().includes(lowercase_keyword) ||
                    train.to.includes(lowercase_keyword) ||
                    train.to_pinyin.includes(lowercase_keyword)){
                    return true;
                }
                return false;
            })
        }

        searchFromAndOrTo = (from: string, to?: string | null) => {
            const from_lowercase: string = from.toLowerCase();
            const fromList: Train[] = this.searchFrom(from_lowercase);
            
            if (!to) {
                return fromList;
            }

            const to_lowercase: string = to.toLowerCase();

            return fromList.filter((train: Train) => {
                if (train.code.toLowerCase().includes(to_lowercase) ||
                    train.to.includes(to_lowercase) ||
                    train.to_pinyin.includes(to_lowercase)){
                    return true;
                }
                return false;
            })
        }
    }
    return new TrainService();
})()
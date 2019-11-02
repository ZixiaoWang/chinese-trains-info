import { Station, TrainList } from "../interfaces/index";
import { DATA_PATH } from "../constants/index";

export const getAllStations = async (): Promise<Station[]> => {
    const stationsJsonPath: string = DATA_PATH + 'station_list.json';
    const response: Response = await fetch(stationsJsonPath);
    const stations: Station[] = await response.json();
    return stations;
}

export const getAllTrains = async (): Promise<TrainList> => {
    const trainListJsonPath: string = DATA_PATH + 'train_map.json';
    const response: Response = await fetch(trainListJsonPath);
    const trainList: TrainList = await response.json();
    return trainList;
}
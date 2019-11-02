import { Station } from "../interfaces/index";
import { DATA_PATH } from "../constants/index";

export const getAllStations = async (): Promise<Station[]> => {
    const stationsJsonPath: string = DATA_PATH + 'stations.json';
    const response: Response = await fetch(stationsJsonPath);
    const stations: Station[] = await response.json();
    return stations;
}
import { Train } from "./train.interface";

export interface TrainList {
    [startStation: string]: {
        [trainCode: string]: Train
    }
}
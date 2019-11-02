import { getAllStations, getAllTrains } from './services/index';

getAllStations().then(console.log);
getAllTrains().then(console.log);
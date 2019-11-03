export interface Station {
    name: string,
    primary: boolean,
    address: string,
    owner: string,
    category: string,
    type: string,
    province: string,
    city: string,
    lng: string | number,
    lat: string | number,
    pinyin: string,
    abbreviation: string
}
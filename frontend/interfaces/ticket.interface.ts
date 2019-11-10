export interface Ticket {
    arrive_day_str: string,
    station_name: string,
    arrive_time: string,
    station_train_code: string,
    arrive_day_diff: string,
    start_time: string,
    station_no: string,
    wz_num: string,
    running_time: string,
    OT?: any[],
    train_class_name?: string,
    is_start?: string,
    service_type?: string,
    end_station_name?: string,
    start_station_name?: string,
}
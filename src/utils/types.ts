export interface DailyInstance {
    hour: number;
    value: number;
}

export interface DailyTrend {
    name: string;
    instances: DailyInstance[];
}

export interface TrendInstance {
    name: string;
    value: number;
}

export interface Position {
    x: number;
    y: number;
}

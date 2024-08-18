import { DateTime } from "luxon";

export interface Condition {
    city: string;
    date: DateTime | string;
    temperature: number;
    altitude: number;
    rainingStatus: number;
    networkPower: number
}
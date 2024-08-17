import { DateTime } from "luxon";

export interface CityOverview{
    name: string;
    lastUpdate: DateTime;
    lastNetworkPower: number;
    avgTemperature: number;
    avgRainingStatus: number;
    avgAltitude: number;
}
import sortBy from "lodash/sortBy";
import {LocationInfo} from "./LocationInfo";

export class ElvGroup {
    private readonly _locations: LocationInfo[];

    constructor(locationIds: LocationInfo[]) {
        this._locations = locationIds;
    }

    public addLocation(locationId: LocationInfo) {
        this._locations.push(locationId);
    }

    get locations(): LocationInfo[] {
        return this._locations;
    }

    get locationsLength(): number {
        return this._locations.length;
    }

    get sortedLocations(): LocationInfo[] {
        return sortBy(this._locations, location => location.number);
    }

    public getLocationByIndex(index: number, sorted: boolean): LocationInfo|undefined {
        if (sorted) {
            return this.sortedLocations[index];
        }
        return this._locations[index];
    }
}
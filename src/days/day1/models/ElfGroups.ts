import sortBy from "lodash/sortBy";
import {ElvGroup} from "./ElfGroup";
import {LocationInfo} from "./LocationInfo";

export class ElvGroups {
    private readonly _groups: ElvGroup[];

    constructor(groups: ElvGroup[]) {
        this._groups = groups;
    }

    get locationsSideBySideSorted(): LocationInfo[][] {
        const sortedGroups = sortBy(this._groups, group => group.locationsLength);
        return this._createSideBySide(sortedGroups);
    }

    get locationDistances() {
        const distances: number[] = [];
        this.locationsSideBySideSorted.forEach(locations => {
            let _distance = 0;
            locations.forEach(location => {
                _distance = location.number - _distance;
            })
            distances.push(Math.abs(_distance));
        })
        return distances;
    }

    get locationSimilarScore() {
        const scores: number[] = [];
        if (this._groups.length) {
            const [firstGroup, ...rest] = this._groups;
            firstGroup.locations.forEach(location => {
                rest.forEach(group => {
                    const same = group.locations.filter(l => l.number === location.number);
                    scores.push(location.number * same.length);
                });
            })
        }

        return scores;
    }

    private _createSideBySide(groups: ElvGroup[]) {
        const sideBySide: LocationInfo[][] = [];
        const [firstLocations, ...rest] = groups;
        firstLocations.sortedLocations.forEach((location, index) => {
            let _currentLocations: LocationInfo[] = [location];
            rest.forEach((group: ElvGroup) => {
                const locationInGroup = group.getLocationByIndex(index, true);
                if (locationInGroup) {
                    _currentLocations.push(locationInGroup);
                }
            })
            sideBySide.push(_currentLocations);
        })
        return sideBySide;
    }
}

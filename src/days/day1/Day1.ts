import {IDay} from "../../IDay";
import {getInputStrings, getNumbersFromLine} from "../../services/input-service";
import {Day} from "../../Day";
import sumBy from "lodash/sumBy";
import {ElvGroups} from "./models/ElfGroups";
import {ElvGroup} from "./models/ElfGroup";
import {LocationInfo} from "./models/LocationInfo";

export class Day1 extends Day implements IDay {
    constructor() {
        super("day1");
    }

    private _createElvGroups(lines: string[]): ElvGroup[] {
        const groups: ElvGroup[] = [];

        lines.forEach(line => {
            const numbers = getNumbersFromLine(line);
            numbers.forEach((number, index) => {
                if (groups[index]) {
                    groups[index].addLocation(new LocationInfo(number));
                } else {
                    groups[index] = new ElvGroup([new LocationInfo(number)]);
                }
            })
        })
        return groups;
    }

    runSilver(): string {
        const lines =  getInputStrings(this._input);
        const elvGroups = new ElvGroups(this._createElvGroups(lines));
        const distances = elvGroups.locationDistances;

        return sumBy(distances).toString();
    }

    runGold(): string {
        const lines =  getInputStrings(this._input);
        const elvGroups = new ElvGroups(this._createElvGroups(lines));
        const scores = elvGroups.locationSimilarScore;

        return sumBy(scores).toString();
    }
}
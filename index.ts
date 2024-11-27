import {IDay} from "./src/IDay";
import {Day1} from "./src/days/day1/Day1";

const currentDay: IDay = new Day1();

console.log("SILVER: ", currentDay.runSilver());
console.log("GOLD: ", currentDay.runGold());
import {IDay} from "./src/IDay";
import {Day1} from "./src/days/day1/Day1";
import {Day2} from "./src/days/day2/Day2";

const currentDay: IDay = new Day2();

console.log("SILVER: ", currentDay.runSilver());
console.log("GOLD: ", currentDay.runGold());
import {IDay} from "./src/IDay";
import {Day1} from "./src/days/day1/Day1";
import {Day2} from "./src/days/day2/Day2";
import {Day3} from "./src/days/day3/Day3";
import {Day4} from "./src/days/day4/Day4";
import {Day5} from "./src/days/day5/Day5";

const currentDay: IDay = new Day5();

console.log("SILVER: ", currentDay.runSilver());
console.log("GOLD: ", currentDay.runGold());
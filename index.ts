import {IDay} from "./src/IDay";
import {Day1} from "./src/days/day1/Day1";
import {Day2} from "./src/days/day2/Day2";
import {Day3} from "./src/days/day3/Day3";
import {Day4} from "./src/days/day4/Day4";
import {Day5} from "./src/days/day5/Day5";
import {Day6} from "./src/days/day6/Day6";
import {Day7} from "./src/days/day7/Day7";
import {Day8} from "./src/days/day8/Day8";
import {Day9} from "./src/days/day9/Day9";

const currentDay: IDay = new Day9();

console.log("SILVER: ", currentDay.runSilver());
console.log("GOLD: ", currentDay.runGold());
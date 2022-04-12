import { parse, stringify } from "csv/sync";
import fs from "fs";

const EVERHOUR_CSV_PATH = "./everhour.csv";
const OUTPUT_CSV_PATH = "./output.csv";

const getTaskKey = (task: string[]) => {
  const splitTaskName = task[0].split("#");

  return splitTaskName[splitTaskName.length - 1];
};

const getTaskTimeSpent = (task: string[]) => `${task[1]}h`;

const getTaskDateStarted = (task: string[]) => `${task[2]} 00:00:00Z`;

const everhourRawData = fs
  .readFileSync(EVERHOUR_CSV_PATH, "utf8")
  .split("\n")
  .slice(2)
  .join("\n");

const everhourData = parse(everhourRawData);

const tasks = everhourData.slice(1, -1);

let output: string[][] = [["Issue Key", "Time Spent", "Date Started"]];

for (const task of tasks) {
  const taskKey = getTaskKey(task);
  const taskTimeSpent = getTaskTimeSpent(task);
  const taskDateStarted = getTaskDateStarted(task);

  const outputRow = [taskKey, taskTimeSpent, taskDateStarted];

  output.push(outputRow);
}

const outputCsv = stringify(output);
fs.writeFileSync(OUTPUT_CSV_PATH, outputCsv);

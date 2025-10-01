#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
const program = new Command();

program
  .name("courses-manager-tool")
  .description("CLI tool for managing courses")
  .version("1.0.0");

const questions = [
  {
    type: "input",
    name: "programming-course",
    message: "What the programming course do you want to add ?",
  },
  {
    type: "number",
    name: "price",
    message: "What the price of the course ?",
  },
];

const filePath = "./programming-courses.json";

program
  .command("add")
  .alias("a")
  .description("add a course")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, "utf-8", (err, fileContent) => {
          if (err) {
            console.log("Error! =>", err);
            process.exit();
          }
          const fileContentAsArray = JSON.parse(fileContent);
          fileContentAsArray.push(answers);
          fs.writeFile(
            filePath,
            JSON.stringify(fileContentAsArray),
            "utf-8",
            () => {
              console.log("add course done");
            }
          );
        });
      } else {
        fs.writeFile(filePath, JSON.stringify([answers]), "utf-8", () => {
          console.log("add course done");
        });
      }
    });
  });

program
  .command("list")
  .alias("l")
  .description("list of all courses")
  .action(() => {
    fs.readFile(filePath, "utf-8", (err, fileContent) => {
      if (err) {
        console.log("Error! =>", err);
        process.exit();
      }
      console.table(JSON.parse(fileContent));
    });
  });

program.parse(process.argv);

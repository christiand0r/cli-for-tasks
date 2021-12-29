// import { pause, showMenu } from "./helpers/message.js";
import colors from "colors";
import {
  confirm,
  inquirerMenu,
  listTaskDelete,
  pause,
  readInput,
  showCheckList,
} from "./helpers/inquirer.js";
import { Task } from "./models/Task.js";
import { Tasks } from "./models/Tasks.js";
import { readData, saveData } from "./helpers/saveData.js";

console.clear;

///DE MANERA MANUAL
/* 
const main = async () => {
  let opt = "";

  do {
    opt = await showMenu();
    console.log({ opt });
    await pause();
  } while (opt !== "0");
};

main(); 
*/
///////////////////

const main = async () => {
  let opt = "";

  const tasks = new Tasks();
  const tasksDB = readData();

  if (tasksDB) {
    tasks.recoverTasks(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Descripción: ");
        tasks.addTask(desc);
        break;

      case "2":
        tasks.showListTasks();
        break;

      case "3":
        tasks.showTasksForState(true);
        break;

      case "4":
        tasks.showTasksForState(false);
        break;

      case "5":
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      case "6":
        const id = await listTaskDelete(tasks.listArr);
        if (id !== "0") {
          const ok = confirm("¿Estas seguro?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Tarea borrada");
          }
        }
    }

    saveData(tasks.listArr);

    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();

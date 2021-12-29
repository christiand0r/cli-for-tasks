import colors from "colors";
import { Task } from "./task.js";

export class Tasks {
  constructor() {
    this._list = {};
  }

  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => list.push(this._list[key]));

    return list;
  }

  addTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  recoverTasks(tasks = []) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  showListTasks() {
    console.log();
    this.listArr.forEach((task, i) => {
      const { desc, completed } = task;
      const idx = i + 1;

      const state = completed
        ? { check: true, text: "Completada".green }
        : { check: false, text: "Pendiente".red };

      if (state.check) {
        console.log(`${colors.green(idx)}. ${desc} :: ${state.text}`);
      } else {
        console.log(`${colors.red(idx)}. ${desc} :: ${state.text}`);
      }
    });
  }

  showTasksForState(status = true) {
    console.log();

    let counter = 0;
    this.listArr.forEach((task, i) => {
      const { desc, completed } = task;

      const state = completed ? "Completada".green : "Pendiente".red;

      if (status) {
        if (completed) {
          counter += 1;
          console.log(
            `${colors.green(counter.toString())}. ${desc} :: ${colors.green(
              completed
            )}`
          );
        }
      } else {
        if (!completed) {
          counter += 1;
          console.log(`${colors.red(counter.toString())}. ${desc} :: ${state}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completed = null;
      }
    });
  }
}

//MODELO REFERENCIA
/* 
  _list
    {
      uuidv4(): {
        id: 00,
        desc: abc,
        completed:123
      }
    }
*/

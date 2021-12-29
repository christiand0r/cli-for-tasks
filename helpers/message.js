import colors from "colors";
import * as process from "node:process";
import * as readline from "node:readline";

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log(colors.green("========================="));
    console.log(colors.green("  Seleccione una opción"));
    console.log(colors.green("=========================\n"));

    //Menu
    console.log(`${"1.".yellow} Crear una tarea`);
    console.log(`${"2.".yellow} Listar tareas`);
    console.log(`${"3.".yellow} Listar tareas completadas`);
    console.log(`${"4.".yellow} Listar tareas pendientes`);
    console.log(`${"5.".yellow} Completar tarea(s)`);
    console.log(`${"6.".yellow} Borrar tarea(s)`);
    console.log(`${"0.".yellow} Salir \n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Seleccione una opción: ", (opt) => {
      rl.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      rl.close();
      resolve();
    });
  });
};

export { showMenu, pause };

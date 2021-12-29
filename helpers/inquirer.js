import colors from "colors";
import inquirer from "inquirer";

const choices = [
  {
    value: "1",
    name: `${"1.".green} Crear tarea`,
  },
  {
    value: "2",
    name: `${"2.".green} Listar tareas`,
  },
  {
    value: "3",
    name: `${"3.".green} Listar tareas completas`,
  },
  {
    value: "4",
    name: `${"4.".green} Listar tareas pendientes`,
  },
  {
    value: "5",
    name: `${"5.".green} Completar tarea(s)`,
  },
  {
    value: "6",
    name: `${"6.".green} Borrar tarea(s)`,
  },
  {
    value: "0",
    name: `${"0.".green} Salir`,
  },
];

const questionOpt = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log(colors.green("========================="));
  console.log(colors.white("  Seleccione una opción"));
  console.log(colors.green("=========================\n"));

  const { opt } = await inquirer.prompt(questionOpt);

  return opt;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "continue",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTaskDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${colors.green(i + 1)}.`;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${colors.green("0")}. Cancelar`,
  });

  console.log(choices);

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${colors.green(i + 1)}.`;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completed ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione las tareas",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

export {
  inquirerMenu,
  pause,
  readInput,
  listTaskDelete,
  showCheckList,
  confirm,
};

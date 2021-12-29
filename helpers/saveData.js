import * as fs from "node:fs";

const folder = "./db/db.json";

const saveData = (data) => {
  fs.writeFile(folder, JSON.stringify(data), (err) => {
    if (err) throw console.error(err);
  });
};

const readData = () => {
  if (!fs.existsSync(folder)) return null;

  const info = fs.readFileSync(folder, { encoding: "utf-8" });
  const data = JSON.parse(info);

  console.log(data);

  return data;
};

export { saveData, readData };

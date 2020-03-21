const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const responseDir = path.join(__dirname, "../test/responses");
const typesDir = path.join(__dirname, "../types");
const projectRoot = path.join(__dirname, "..");

// ./node_modules/.bin/make_types -i ./types/boxScore.ts ./test/responses/data_boxScore.json BoxScore

if (process.cwd() !== projectRoot) throw new Error("must run from project root");

function makeTypesForDataEndpoints () {
  const files = fs.readdirSync(responseDir).map(f => path.join(responseDir, f));
  for (const file of files) {
    const fPath = path.parse(file);
    const [namespace, method] = fPath.name.split("_");
    console.log({ namespace, method });
    const typeName = capitalize(method);
    const outFile = path.join(typesDir, namespace, `${typeName}.ts`);
    const cmd = `./node_modules/.bin/make_types -i ${outFile} ${file} ${typeName}`;
    console.log("running:", cmd);
    execSync(cmd);

    // replace `export interface BoxScore {` with `export default interface BoxScore {`
    const outFileData = fs.readFileSync(outFile, { encoding: "utf8" });
    const fixed = outFileData.replace(`export interface ${typeName}`, `export default interface ${typeName}`);
    fs.writeFileSync(outFile, fixed);
  }
}

makeTypesForDataEndpoints();
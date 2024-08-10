import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

import * as ts from "typescript";

const apiFilePath = path.join(__dirname, "api", "api.ts");
const outputFile = path.join(__dirname, "factories.ts");

interface Property {
  name: string;
  type: string;
}

let aggregatedFactoryCode = "";
let interfaces: string[] = [];

// Read the api.ts file
const sourceFile = ts.createSourceFile(
  "api.ts",
  fs.readFileSync(apiFilePath, "utf-8"),
  ts.ScriptTarget.Latest,
  true,
);

const customizeSourceFile = (node: ts.Node) => {
  if (ts.isInterfaceDeclaration(node)) {
    const interfaceName = node.name.text;

    interfaces.push(interfaceName);
    const properties: Property[] = [];

    node.members.forEach((member: ts.TypeElement) => {
      if (ts.isPropertySignature(member) && member.type) {
        properties.push({
          name: (member.name as ts.Identifier).text,
          type: member.type.getText(sourceFile),
        });
      }
    });

    // Generate Rosie factory using the correct syntax
    const factoryCode = `
export const ${interfaceName}Factory = new Factory<${interfaceName}>()
${properties
  .map((prop: Property) => {
    let value = "undefined";

    if (prop.name === "id") {
      return `  .sequence('${prop.name}')`;
    } else if (prop.type === "string") {
      if (prop.name.includes("email")) {
        value = `() => \`\${faker.internet.userName()}@example.com\``;
      } else if (prop.name.includes("at") || prop.name.includes("date")) {
        value = `() => faker.date.recent().toISOString()`;
      } else {
        value = `() => faker.lorem.word()`;
      }
    } else if (prop.type === "number") {
      value = `() => faker.number.int({min: 1, max: 100})`;
    } else if (prop.type === "boolean") {
      value = `() => faker.datatype.boolean()`;
    } else if (prop.type.endsWith("[]")) {
      const itemType = prop.type.slice(0, -2);

      value = `['id'], (id) => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}), { id })`;
    } else if (prop.type.startsWith("Array<") && prop.type.endsWith(">")) {
      const itemType = prop.type.slice(6, -1);

      value = `['id'], (id) => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}), { id })`;
    } else if (prop.type.includes("|")) {
      const types = prop.type.split("|").map((t) => t.trim());

      if (types.includes("null")) {
        if (types.includes("string")) {
          value = `() => faker.datatype.boolean() ? faker.lorem.word() : null`;
        } else if (types.includes("number")) {
          value = `() => faker.datatype.boolean() ? faker.number.int({min: 1, max: 100}) : null`;
        } else {
          value = `() => faker.datatype.boolean() ? null : undefined`;
        }
      }
    } else if (prop.type.endsWith("Factory")) {
      value = `() => ${prop.type}.build()`;
    } else {
      value = `() => ${prop.type}Factory.build()`;
    }

    return `  .attr('${prop.name}', ${value})`;
  })
  .join("\n")}
;
    `.trim();

    // Append factory code to the aggregated content
    aggregatedFactoryCode += factoryCode + "\n";
  }
};

// Parse the TypeScript file
ts.forEachChild(sourceFile, customizeSourceFile);

// Add necessary imports
const fakerImport = "import { faker } from '@faker-js/faker';";
const modelImport = `import { ${interfaces.join(", ")} } from './api';`;

// Construct the final code
const finalCode = `
${fakerImport}
import { Factory } from 'rosie';
${modelImport}

${aggregatedFactoryCode}
`.trim();

// Write the aggregated factory code to a single file
fs.writeFileSync(outputFile, finalCode, "utf-8");

execSync(`npx prettier --write ${outputFile}`);
execSync(`npx eslint --fix ${outputFile}`);
// eslint-disable-next-line no-console
console.log(`factories written to ${outputFile}`);

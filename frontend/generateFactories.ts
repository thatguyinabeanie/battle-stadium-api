// TODO: fix generateFactories.ts to generate factories for all the types

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

import * as ts from "typescript";

const apiDirPath = path.join(__dirname, "lib/fetch-api/apis");
const outputFile = path.join(__dirname, "factories.ts");

interface Property {
  name: string;
  type: string;
}

let aggregatedFactoryCode = "";
let interfaces: Set<string> = new Set();

const processFile = (filePath: string) => {
  console.log(`Processing file: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  console.log("File content length:", fileContent.length);

  const sourceFile = ts.createSourceFile(
    path.basename(filePath),
    fileContent,
    ts.ScriptTarget.Latest,
    true,
  );

  const customizeSourceFile = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      console.log(`Found type: ${node.name.text}`);
      const typeName = node.name.text;

      interfaces.add(typeName);
      const properties: Property[] = [];

      if (ts.isInterfaceDeclaration(node)) {
        node.members.forEach((member: ts.TypeElement) => {
          if (ts.isPropertySignature(member) && member.type) {
            properties.push({
              name: (member.name as ts.Identifier).text,
              type: member.type.getText(sourceFile),
            });
          }
        });
      } else if (
        ts.isTypeAliasDeclaration(node) &&
        ts.isTypeLiteralNode(node.type)
      ) {
        node.type.members.forEach((member: ts.TypeElement) => {
          if (ts.isPropertySignature(member) && member.type) {
            properties.push({
              name: (member.name as ts.Identifier).text,
              type: member.type.getText(sourceFile),
            });
          }
        });
      }

      // Generate Rosie factory using the correct syntax
      const factoryCode = `
export const ${typeName}Factory = new Factory<${typeName}>()
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

      value = `() => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}))`;
    } else if (prop.type.startsWith("Array<") && prop.type.endsWith(">")) {
      const itemType = prop.type.slice(6, -1);

      value = `() => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}))`;
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
    } else {
      value = `() => ${prop.type}Factory.build()`;
    }

    return `  .attr('${prop.name}', ${value})`;
  })
  .join("\n")}
;
      `.trim();

      // Append factory code to the aggregated content
      aggregatedFactoryCode += factoryCode + "\n\n";
    }
  };

  // Parse the TypeScript file
  ts.forEachChild(sourceFile, customizeSourceFile);
};

// Read the index.ts file to get the list of other files
const indexPath = path.join(apiDirPath, "index.ts");
const indexContent = fs.readFileSync(indexPath, "utf8");
const exportedFiles = indexContent.match(/export \* from "\.\/(.+)";/g);

if (exportedFiles) {
  exportedFiles.forEach((exportLine) => {
    const match = exportLine.match(/"\.\/(.+)"/);

    if (match && match[1]) {
      const fileName = match[1];
      const filePath = path.join(apiDirPath, `${fileName}.ts`);

      processFile(filePath);
    } else {
      console.warn(`Couldn't extract file name from line: ${exportLine}`);
    }
  });
}

console.log("Found types:", Array.from(interfaces));

// Add necessary imports
const fakerImport = "import { faker } from '@faker-js/faker';";
const factoryImport = "import { Factory } from 'rosie';";
const modelImport =
  interfaces.size > 0
    ? `import { ${Array.from(interfaces).join(", ")} } from '@/lib/fetch-api/apis';`
    : "";

// Construct the final code
const finalCode = `
${fakerImport}
${factoryImport}
${modelImport}

${aggregatedFactoryCode}
`.trim();

// Write the aggregated factory code to a single file
fs.writeFileSync(outputFile, finalCode, "utf8");

console.log(`factories written to ${outputFile}`);
console.log("Final code length:", finalCode.length);

// Only run prettier and eslint if there's actual content
if (finalCode.length > 100) {
  execSync(`npx prettier --write ${outputFile}`);
  execSync(`npx eslint --fix ${outputFile}`);
}

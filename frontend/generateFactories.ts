/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

import * as ts from "typescript";

const apiDirPath = path.join(__dirname, "lib/api/apis");
const modelsDirPath = path.join(__dirname, "lib/api/models");
const outputFile = path.join(__dirname, "factories.ts");

interface Property {
  name: string;
  type: string;
}

let aggregatedFactoryCode = "";

// Add DateFactory at the beginning of the aggregatedFactoryCode
aggregatedFactoryCode =
  `
export const DateFactory = new Factory<string>(() => faker.date.recent().toISOString());

` + aggregatedFactoryCode;

let interfaces: Set<string> = new Set();
let processedTypes: Set<string> = new Set();

const processDirectory = (dirPath: string) => {
  fs.readdirSync(dirPath).forEach((file) => {
    if (file.endsWith(".ts") && file !== "index.ts") {
      const filePath = path.join(dirPath, file);

      processFile(filePath);
    }
  });
};

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

  const processNode = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      const typeName = node.name.text;

      if (!processedTypes.has(typeName)) {
        console.log(`Processing type: ${typeName}`);
        processedTypes.add(typeName);
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

        generateFactory(typeName, properties);
      }
    }

    ts.forEachChild(node, processNode);
  };

  ts.forEachChild(sourceFile, processNode);
};

const generateFactory = (typeName: string, properties: Property[]) => {
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
      } else if (prop.name.includes("password")) {
        value = `() => faker.internet.password()`;
      } else {
        value = `() => faker.lorem.word()`;
      }
    } else if (prop.type === "number") {
      value = `() => faker.number.int({min: 1, max: 100})`;
    } else if (prop.type === "boolean") {
      value = `() => faker.datatype.boolean()`;
    } else if (
      prop.type.endsWith("[]") ||
      (prop.type.startsWith("Array<") && prop.type.endsWith(">"))
    ) {
      const itemType = prop.type.endsWith("[]")
        ? prop.type.slice(0, -2)
        : prop.type.slice(6, -1);

      value = `() => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}))`;
      interfaces.add(itemType);
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
      interfaces.add(prop.type);
    }

    // Special handling for passwordConfirmation
    if (prop.name === "passwordConfirmation") {
      return `  .attr('${prop.name}', (f) => f.password)`;
    }

    return `  .attr('${prop.name}', ${value})`;
  })
  .join("\n")}
;
  `.trim();

  aggregatedFactoryCode += factoryCode + "\n\n";
};

// Process both APIs and Models directories
processDirectory(apiDirPath);
processDirectory(modelsDirPath);

console.log("Found types:", Array.from(interfaces));

// Add necessary imports
const fakerImport = "import { faker } from '@faker-js/faker';";
const factoryImport = "import { Factory } from 'rosie';";
const modelImport =
  interfaces.size > 0
    ? `import { ${Array.from(interfaces).join(", ")} } from '@/lib/api';`
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

console.log(`Factories written to ${outputFile}`);
console.log("Final code length:", finalCode.length);

// Only run prettier and eslint if there's actual content
if (finalCode.length > 100) {
  execSync(`npx prettier --write ${outputFile}`);
  execSync(`npx eslint --fix ${outputFile}`);
}

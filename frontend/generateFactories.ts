import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

const modelDir = path.join(__dirname, 'api', 'model');
const outputFile = path.join(__dirname, 'factories.ts');

// Function to convert camelCase to kebab-case
const toKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

// Read all .ts files in the model directory
const files = fs.readdirSync(modelDir).filter((file: string) => file.endsWith('.ts'));

interface Property {
  name: string;
  type: string;
}

let aggregatedFactoryCode = '';
let importStatements = new Set<string>();

files.forEach((file: string) => {
  const filePath = path.join(modelDir, file);
  const sourceFile = ts.createSourceFile(
    file,
    fs.readFileSync(filePath, 'utf-8'),
    ts.ScriptTarget.Latest
  );

  let interfaceName = '';
  let properties: Property[] = [];

  // Parse the TypeScript file
  ts.forEachChild(sourceFile, (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node)) {
      interfaceName = node.name.text;
      node.members.forEach((member: ts.TypeElement) => {
        if (ts.isPropertySignature(member) && member.type) {
          properties.push({
            name: (member.name as ts.Identifier).text,
            type: member.type.getText(sourceFile)
          });
        }
      });
    }
  });

  // Generate the kebab-case file name for import
  const kebabCaseFileName = toKebabCase(interfaceName);

  // Add import statement if interfaceName is not empty
  if (interfaceName) {
    importStatements.add(`import { ${interfaceName} } from '@/api/model/${kebabCaseFileName}';`);

    // Generate Rosie factory using the correct syntax
    const factoryCode = `
export const ${interfaceName}Factory = new Factory<${interfaceName}>()
${properties.map((prop: Property) => {
  let value = 'undefined';
  if (prop.name === 'id') {
    return `  .sequence('${prop.name}')`;
  } else if (prop.type === 'string') {
    if (prop.name.includes('email')) {
      value = `() => \`\${faker.internet.userName()}@example.com\``;
    } else if (prop.name.includes('at') || prop.name.includes('date')) {
      value = `() => faker.date.recent().toISOString()`;
    } else {
      value = `() => faker.lorem.word()`;
    }
  } else if (prop.type === 'number') {
    value = `() => faker.number.int({min: 1, max: 100})`;
  } else if (prop.type === 'boolean') {
    value = `() => faker.datatype.boolean()`;
  } else if (prop.type.endsWith('[]')) {
    const itemType = prop.type.slice(0, -2);
    value = `['id'], (id) => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}), { id })`;
  } else if (prop.type.startsWith('Array<') && prop.type.endsWith('>')) {
    const itemType = prop.type.slice(6, -1);
    value = `['id'], (id) => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}), { id })`;
  } else if (prop.type.includes('|')) {
    const types = prop.type.split('|').map(t => t.trim());
    if (types.includes('null')) {
      if (types.includes('string')) {
        value = `() => faker.helpers.maybe(() => faker.lorem.word(), {probability: 0.8})`;
      } else if (types.includes('number')) {
        value = `() => faker.helpers.maybe(() => faker.number.int({min: 1, max: 100}), {probability: 0.8})`;
      } else {
        value = `() => faker.helpers.maybe(() => null, {probability: 0.2})`;
      }
    }
  } else if (prop.type.endsWith('Factory')) {
    value = `() => ${prop.type}.build()`;
  } else {
    value = `() => ${prop.type}Factory.build()`;
  }
  return `  .attr('${prop.name}', ${value})`;
}).join('\n')}
;
    `.trim();

    // Append factory code to the aggregated content
    aggregatedFactoryCode += factoryCode + '\n';
  }
});

// At the top of the script, add this line:
const fakerImport = "import { faker } from '@faker-js/faker';";

// Then, modify the finalCode construction as follows:
const finalCode = `
${fakerImport}
import { Factory } from 'rosie';
${Array.from(importStatements).join('\n')}

${aggregatedFactoryCode}
`.trim();
// Write the aggregated factory code to a single file
fs.writeFileSync(outputFile, finalCode, 'utf-8');

console.log(`Aggregated factories written to ${outputFile}`);

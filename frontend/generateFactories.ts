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

  // Add import statement
  importStatements.add(`import { ${interfaceName} } from '@/api/model/${kebabCaseFileName}';`);

  // Generate Rosie factory
  const factoryCode = `
export const ${interfaceName}Factory = Factory.define<${interfaceName}>('${interfaceName}')
${properties.map((prop: Property) => {
    let value = 'undefined';
    switch (prop.type) {
      case 'string':
        value = `'${prop.name}'`;
        break;
      case 'number':
        value = '0';
        break;
      case 'boolean':
        value = 'false';
        break;
      // Add more type checks as needed
    }
    return `.attr('${prop.name}', () => ${value})`;
  }).join('\n')}
;
  `.trim();

  // Append factory code to the aggregated content
  aggregatedFactoryCode += factoryCode + '\n';
});

// Combine import statements and factory code
const finalCode = `
import { Factory } from 'rosie';
${Array.from(importStatements).join('\n')}

${aggregatedFactoryCode}
`.trim();

// Write the aggregated factory code to a single file
fs.writeFileSync(outputFile, finalCode, 'utf-8');

console.log(`Aggregated factories written to ${outputFile}`);

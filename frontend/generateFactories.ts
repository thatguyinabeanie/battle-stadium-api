import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { Factory } from 'rosie';

const modelDir = path.join(__dirname, 'api', 'model');
const outputDir = path.join(__dirname, 'factories');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all .ts files in the model directory
const files = fs.readdirSync(modelDir).filter((file: string) => file.endsWith('.ts'));

interface Property {
  name: string;
  type: string;
}

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

  // Generate the lowercase file name for import
  const lowerCaseFileName = interfaceName.charAt(0).toLowerCase() + interfaceName.slice(1);

  // Generate Rosie factory
  const factoryCode = `
import { Factory } from 'rosie';
import { ${interfaceName} } from '@/api/model/${lowerCaseFileName}';

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

  // Write factory to file
  const outputFile = path.join(outputDir, `${interfaceName}Factory.ts`);
  fs.writeFileSync(outputFile, factoryCode);

  console.log(`Generated factory for ${interfaceName} in ${outputFile}`);
});

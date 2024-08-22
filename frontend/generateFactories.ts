/* eslint-disable no-console */
// generateFactories.ts
import * as fs from "fs"
import * as path from "path"
import { execSync } from "child_process"

import * as ts from "typescript"

const apiDirPath = path.join(__dirname, "lib", "api", "apis")
const modelsDirPath = path.join(__dirname, "lib", "api", "models")
const outputFile = path.join(__dirname, "factories.ts")

interface Property {
  name: string
  type: string
}

const isDateField = (name: string): boolean => {
  return (
    name.includes("At") ||
    name.includes("date") ||
    ["startAt", "endAt", "registrationStartAt", "registrationEndAt", "checkInStartAt"].includes(name)
  )
}

let aggregatedFactoryCode = ""
const interfaces: Set<string> = new Set()
const processedTypes: Set<string> = new Set()

const processDirectory = (dirPath: string): void => {
  try {
    fs.readdirSync(dirPath).forEach((file) => {
      if (file.endsWith(".ts") && file !== "index.ts") {
        const filePath = path.join(dirPath, file)

        processFile(filePath)
      }
    })
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error)
  }
}

const processFile = (filePath: string): void => {
  console.log(`Processing file: ${filePath}`)
  try {
    const fileContent = fs.readFileSync(filePath, "utf8")

    console.log("File content length:", fileContent.length)

    const sourceFile = ts.createSourceFile(path.basename(filePath), fileContent, ts.ScriptTarget.Latest, true)

    ts.forEachChild(sourceFile, (node) => processNode(node, sourceFile))
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
  }
}

const processNode = (node: ts.Node, sourceFile: ts.SourceFile): void => {
  if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
    const typeName = node.name.text

    if (!processedTypes.has(typeName)) {
      console.log(`Processing type: ${typeName}`)
      processedTypes.add(typeName)
      interfaces.add(typeName)

      const properties: Property[] = []

      if (ts.isInterfaceDeclaration(node)) {
        node.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.type) {
            properties.push({
              name: (member.name as ts.Identifier).text,
              type: member.type.getText(sourceFile),
            })
          }
        })
      } else if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
        node.type.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.type) {
            properties.push({
              name: (member.name as ts.Identifier).text,
              type: member.type.getText(sourceFile),
            })
          }
        })
      }

      generateFactory(typeName, properties)
    }
  }
}

const generateFactory = (typeName: string, properties: Property[]): void => {
  const factoryCode = `
export const ${typeName}Factory = new Factory<${typeName}>()

${properties
  .map((prop: Property) => {
    let value = "undefined"

    if (prop.name === "id") {
      return `  .sequence('${prop.name}')`
    } else if (prop.type === "string") {
      if (prop.name.includes("email")) {
        value = `() => \`\${faker.internet.userName()}@example.com\``
      } else if (isDateField(prop.name)) {
        value = `() => faker.date.recent()`
      } else if (prop.name.includes("password")) {
        value = `() => faker.internet.password()`
      } else {
        value = `() => faker.lorem.word()`
      }
    } else if (prop.type === "number") {
      value = `() => faker.number.int({min: 1, max: 100})`
    } else if (prop.type === "boolean") {
      value = `() => faker.datatype.boolean()`
    } else if (prop.type.endsWith("[]") || (prop.type.startsWith("Array<") && prop.type.endsWith(">"))) {
      const itemType = prop.type.endsWith("[]") ? prop.type.slice(0, -2) : prop.type.slice(6, -1)

      value = `() => ${itemType}Factory.buildList(faker.number.int({min: 1, max: 5}))`
      interfaces.add(itemType)
    } else if (prop.type.includes("|")) {
      const types = prop.type.split("|").map((t) => t.trim())

      if (types.includes("null")) {
        if (types.includes("string")) {
          value = `() => faker.datatype.boolean() ? faker.lorem.word() : null`
        } else if (types.includes("number")) {
          value = `() => faker.datatype.boolean() ? faker.number.int({min: 1, max: 100}) : null`
        } else if (types.includes("Date")) {
          value = `() => faker.datatype.boolean() ? faker.date.recent() : null`
        } else {
          value = `() => faker.datatype.boolean() ? null : null`
        }
      }
    } else if (prop.type === "Date") {
      value = `() => faker.date.recent()`
    } else {
      value = `() => ${prop.type}Factory.build()`
      interfaces.add(prop.type)
    }

    if (prop.name === "passwordConfirmation") {
      return `  .attr('${prop.name}', function(this: any) { return this.password; })`
    }

    return `  .attr('${prop.name}', ${value})`
  })
  .join("\n")}
;
  `.trim()

  aggregatedFactoryCode += factoryCode + "\n\n"
}

// Process both APIs and Models directories
processDirectory(apiDirPath)
processDirectory(modelsDirPath)
console.log("Found types:", Array.from(interfaces))

// Add necessary imports
const fakerImport = "import { faker } from '@faker-js/faker';"
const factoryImport = "import { Factory, IFactory } from 'rosie';"
const modelImport = interfaces.size > 0 ? `import { ${Array.from(interfaces).join(", ")} } from '@/lib/api';` : ""

// Construct the final code
const finalCode = `
/* eslint-disable @typescript-eslint/no-explicit-any */
${fakerImport}
${factoryImport}
${modelImport}

${aggregatedFactoryCode}
`.trim()

// Write the aggregated factory code to a single file
try {
  fs.writeFileSync(outputFile, finalCode, "utf8")
  console.log(`Factories written to ${outputFile}`)
  console.log("Final code length:", finalCode.length)

  // Only run prettier and eslint if there's actual content
  if (finalCode.length > 100) {
    execSync(`npx prettier --write ${outputFile}`)
    execSync(`npx eslint --fix ${outputFile}`)
  }
} catch (error) {
  console.error("Error writing to file or running Prettier/ESLint:", error)
}

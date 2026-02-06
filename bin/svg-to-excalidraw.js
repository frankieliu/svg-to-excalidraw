#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { Command } = require("commander");
const DOMMatrix = require("dommatrix");

// Setup DOMParser for Node.js environment
const dom = new JSDOM();
global.DOMParser = dom.window.DOMParser;
global.NodeFilter = dom.window.NodeFilter;
global.Document = dom.window.Document;
global.Element = dom.window.Element;
global.document = dom.window.document;
global.DOMMatrix = DOMMatrix;
global.self = global;

// Import the svg-to-excalidraw library
const svgToEx = require("../dist/bundle.js");

const program = new Command();

program
  .name("svg-to-excalidraw")
  .description("Convert SVG files to Excalidraw format")
  .version(require("../package.json").version)
  .argument("<input>", "Input SVG file path (or '-' for stdin)")
  .option("-o, --output <file>", "Output file path (default: stdout)")
  .option("-p, --pretty", "Pretty print the JSON output", false)
  .action((input, options) => {
    try {
      let svgContent;

      // Read SVG content from file or stdin
      if (input === "-") {
        svgContent = fs.readFileSync(0, "utf-8");
      } else {
        if (!fs.existsSync(input)) {
          console.error(`Error: Input file '${input}' does not exist.`);
          process.exit(1);
        }
        svgContent = fs.readFileSync(input, "utf-8");
      }

      // Convert SVG to Excalidraw format
      const { hasErrors, errors, content } = svgToEx.default.convert(svgContent);

      if (hasErrors) {
        console.error("Error: Failed to parse SVG.");
        if (errors) {
          errors.forEach((error) => {
            console.error(error.textContent);
          });
        }
        process.exit(1);
      }

      // Format output
      const output = options.pretty
        ? JSON.stringify(content, null, 2)
        : JSON.stringify(content);

      // Write to file or stdout
      if (options.output) {
        fs.writeFileSync(options.output, output, "utf-8");
        console.log(`✓ Successfully converted to ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse();

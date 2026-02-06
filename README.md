# svg-to-excalidraw

Library to convert SVG to Excalidraw's file format.

## :floppy_disk: Installation

### As a Library

```bash
npm install svg-to-excalidraw
```

### As a CLI Tool

```bash
npm install -g svg-to-excalidraw
```

## :beginner: Usage

### Command Line Interface

Convert SVG files to Excalidraw format from the command line:

```bash
# Basic usage - output to stdout
svg-to-excalidraw input.svg

# Save to a file
svg-to-excalidraw input.svg -o output.excalidraw

# Pretty print the JSON output
svg-to-excalidraw input.svg -p -o output.excalidraw

# Read from stdin
cat input.svg | svg-to-excalidraw -

# Show help
svg-to-excalidraw --help
```

**Options:**
- `-o, --output <file>` - Output file path (default: stdout)
- `-p, --pretty` - Pretty print the JSON output
- `-V, --version` - Output the version number
- `-h, --help` - Display help

### Programmatic Usage

```typescript
import svgToEx from "svg-to-excalidraw";

const heartSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 10,30
           A 20,20 0,0,1 50,30
           A 20,20 0,0,1 90,30
           Q 90,60 50,90
           Q 10,60 10,30 z"/>
</svg>
`;

const { hasErrors, errors, content } = svgToEx.convert(heartSVG);

// SVG parsing errors are propagated through.
if (hasErrors) {
  console.error(errors);
  return;
}

navigator.clipboard.writeText(content);

// the heart excalidraw json is now copied to your clipboard.
// Just Paste it into your Excalidraw session!
```

## :game_die: Running tests

TODO.

### :building_construction: Local Development

#### Building the Project

```bash
yarn build

# Build and watch whenever a file is updated
yarn build:watch
```

## :busts_in_silhouette: Contributing

Pull requests are welcome. For major changes, please [open an issue](https://github.com/excalidraw/svg-to-excalidraw/issues) first to discuss what you would like to change.

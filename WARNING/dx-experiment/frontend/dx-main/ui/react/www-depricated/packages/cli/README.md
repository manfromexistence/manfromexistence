# dx-ui

A CLI for adding components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx dx-ui init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx dx-ui add [component]
```

### Example

```bash
npx dx-ui add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx dx-ui add
```

## Documentation

Visit https://ui.dx.com/docs/cli to view the documentation.

## License

Licensed under the [MIT license](https://github.com/dx/ui/blob/main/LICENSE.md).

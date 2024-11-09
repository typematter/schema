# Cache

[![Node.js Package](https://github.com/typematter/schema/actions/workflows/release-package.yml/badge.svg)](https://github.com/typematter/schema/actions/workflows/release-package.yml)

Schema validation library for [Archetypes](https://github.com/typematter/archetype).

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

## Installation

To install the library, use `pnpm`:

```bash
pnpm install typematter/schema
```

NPM packages coming soon!

## Usage

```typescript
import schema from 'typematter/schema';

schema.valid([1, 2, 3], { type: 'Array', items: { type: 'Number' } }); // true
```

## API Reference

### `valid(value: any, schema: Schema): boolean`

Validates a value against a schema.

#### Parameters

- `value: any`: The value to validate.
- `schema: Schema`: The schema to validate against.

#### Returns

- `boolean`: `true` if the value is valid, `false` otherwise.

### `validate(value: any, schema: Schema): ValidationResult`

Validates a value against a schema and returns detailed information about the validation.

#### Parameters

- `value: any`: The value to validate.
- `schema: Schema`: The schema to validate against.

#### Returns

- `ValidationResult`: An object containing detailed information about the validation.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to open an issue.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-nestjs-route.svg)](https://www.npmjs.com/package/eslint-plugin-nestjs-route)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-nestjs-route.svg)](https://www.npmjs.com/package/eslint-plugin-nestjs-route)
[![license](https://img.shields.io/npm/l/eslint-plugin-nestjs-route.svg)](./LICENSE)
[![Build Status](https://github.com/shine-jung/eslint-plugin-nestjs-route/workflows/CI/badge.svg)](https://github.com/shine-jung/eslint-plugin-nestjs-route/actions)
[![Coverage Status](https://codecov.io/gh/shine-jung/eslint-plugin-nestjs-route/branch/main/graph/badge.svg)](https://codecov.io/gh/shine-jung/eslint-plugin-nestjs-route)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> 🇰🇷 [한국어 README 보기](./README.ko.md) | 🌐 [Try Online Playground](https://shine-jung.github.io/eslint-plugin-nestjs-route/)

# eslint-plugin-nestjs-route

ESLint rules for NestJS route management - ensure proper route ordering and prevent duplicates.

## Installation

```bash
npm install --save-dev eslint-plugin-nestjs-route
```

## ESLint config example

**ESLint v9+ (Flat Config):**

```javascript
// eslint.config.js
const nestjsRoute = require("eslint-plugin-nestjs-route");

module.exports = [
  {
    files: ["**/*.ts"],
    plugins: {
      "nestjs-route": nestjsRoute,
    },
    rules: {
      "nestjs-route/order": "error",
      "nestjs-route/no-duplicates": "error",
    },
  },
];
```

**ESLint v8 and below (Legacy Config):**

```json
{
  "plugins": ["nestjs-route"],
  "rules": {
    "nestjs-route/order": "error",
    "nestjs-route/no-duplicates": "error"
  }
}
```

## Rules

### `nestjs-route/order`

Ensures static routes are placed before parameterized routes in NestJS controllers.

- Enforces that static routes (e.g., 'me') are placed before parameterized routes (e.g., ':id') in NestJS controllers.
- Prevents unexpected routing bugs caused by route order.
- Auto-fixable: Routes can be automatically reordered using `--fix` option.

### `nestjs-route/no-duplicates`

Prevents duplicate route definitions within the same controller.

- Detects when the same HTTP method and path combination is defined multiple times.
- Helps avoid routing conflicts and unexpected behavior.

## Supported Decorators

- `@Get`, `@Post`, `@Put`, `@Delete`, `@Patch`, `@All`, `@Options`, `@Head`

## Auto-fix

The `nestjs-route/order` rule supports automatic fixing. Use ESLint with the `--fix` flag to automatically reorder routes:

```bash
npx eslint --fix your-file.ts
```

## Rule Examples

### Route Order

```ts
// Correct
@Get('me')
@Get(':id')

// Incorrect (will be auto-fixed)
@Get(':id')
@Get('me') // Error: static route should be placed before parameter route
```

### No Duplicates

```ts
// Correct
@Get('users')
@Post('users') // Different HTTP method - OK

// Incorrect
@Get('users')
@Get('users') // Error: duplicate route
```

## Options

- `locale`: Set the error message language (default: 'en')
  - `"en"`: English
  - `"ko"`: Korean

**Example:**

```json
"rules": {
  "nestjs-route/order": ["error", { "locale": "ko" }],
  "nestjs-route/no-duplicates": ["error", { "locale": "ko" }]
}
```

## Error Message Examples

### Route Order

- English: Static route ('me') should be placed before parameter route (':id').
- Korean: 고정 라우트('me')는 파라미터 라우트(':id')보다 위에 위치해야 합니다.

### No Duplicates

- English: Duplicate route Get('users') found. Each route should be unique within a controller.
- Korean: 중복된 라우트 Get('users')가 발견되었습니다. 컨트롤러 내에서 각 라우트는 고유해야 합니다.

## Contributing

Pull requests and issues are welcome!

## License

MIT

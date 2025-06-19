[![npm version](https://img.shields.io/npm/v/eslint-plugin-nestjs-route.svg)](https://www.npmjs.com/package/eslint-plugin-nestjs-route)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-nestjs-route.svg)](https://www.npmjs.com/package/eslint-plugin-nestjs-route)
[![license](https://img.shields.io/npm/l/eslint-plugin-nestjs-route.svg)](./LICENSE)
[![Build Status](https://github.com/shine-jung/eslint-plugin-nestjs-route/workflows/CI/badge.svg)](https://github.com/shine-jung/eslint-plugin-nestjs-route/actions)
[![Coverage Status](https://codecov.io/gh/shine-jung/eslint-plugin-nestjs-route/branch/main/graph/badge.svg)](https://codecov.io/gh/shine-jung/eslint-plugin-nestjs-route)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> 🇺🇸 [View this README in English](./README.md) | 🌐 [온라인 플레이그라운드 체험](https://shine-jung.github.io/eslint-plugin-nestjs-route/)

# eslint-plugin-nestjs-route

NestJS 라우트 관리를 위한 ESLint 규칙 - 올바른 라우트 순서 보장 및 중복 방지.

## 설치

```bash
npm install --save-dev eslint-plugin-nestjs-route
```

## ESLint 설정 예시

**ESLint v9+ (플랫 설정):**

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

**ESLint v8 이하 (레거시 설정):**

```json
{
  "plugins": ["nestjs-route"],
  "rules": {
    "nestjs-route/order": "error",
    "nestjs-route/no-duplicates": "error"
  }
}
```

## 규칙

### `nestjs-route/order`

NestJS 컨트롤러에서 고정 라우트가 파라미터 라우트보다 위에 오도록 강제합니다.

- 고정 라우트('me')는 파라미터 라우트(':id')보다 위에 위치해야 합니다.
- 라우트 순서로 인한 예기치 않은 버그를 방지할 수 있습니다.
- 자동 수정 가능: `--fix` 옵션을 사용하여 라우트를 자동으로 재정렬할 수 있습니다.

### `nestjs-route/no-duplicates`

같은 컨트롤러 내에서 중복된 라우트 정의를 방지합니다.

- 동일한 HTTP 메서드와 경로 조합이 여러 번 정의되는 것을 감지합니다.
- 라우팅 충돌과 예기치 않은 동작을 방지합니다.

## 지원 데코레이터

- `@Get`, `@Post`, `@Put`, `@Delete`, `@Patch`, `@All`, `@Options`, `@Head`

## 자동 수정

`nestjs-route/order` 규칙은 자동 수정을 지원합니다. ESLint의 `--fix` 플래그를 사용하여 라우트를 자동으로 재정렬하세요:

```bash
npx eslint --fix your-file.ts
```

## 규칙 예시

### 라우트 순서

```ts
// 올바른 예시
@Get('me')
@Get(':id')

// 잘못된 예시 (자동 수정됨)
@Get(':id')
@Get('me') // 에러: 고정 라우트는 파라미터 라우트보다 위에 위치해야 합니다.
```

### 중복 방지

```ts
// 올바른 예시
@Get('users')
@Post('users') // 다른 HTTP 메서드 - 정상

// 잘못된 예시
@Get('users')
@Get('users') // 에러: 중복된 라우트
```

## 옵션

- `locale`: 에러 메시지 언어 설정 (기본값: 'en')
  - `"en"`: 영어
  - `"ko"`: 한국어

**예시:**

```json
"rules": {
  "nestjs-route/order": ["error", { "locale": "ko" }],
  "nestjs-route/no-duplicates": ["error", { "locale": "ko" }]
}
```

## 에러 메시지 예시

### 라우트 순서

- 영어: Static route ('me') should be placed before parameter route (':id').
- 한국어: 고정 라우트('me')는 파라미터 라우트(':id')보다 위에 위치해야 합니다.

### 중복 방지

- 영어: Duplicate route Get('users') found. Each route should be unique within a controller.
- 한국어: 중복된 라우트 Get('users')가 발견되었습니다. 컨트롤러 내에서 각 라우트는 고유해야 합니다.

## 기여

이슈 및 PR 환영합니다!

## 라이선스

MIT

import { RuleTester } from "eslint";
import rule from "../src/rules/no-duplicates";

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        decorators: true,
      },
    },
  },
});

ruleTester.run("no-duplicates", rule, {
  valid: [
    // 정상 케이스: 모든 라우트가 고유한 경우
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get(':id')
          getUser() {}
          
          @Post('create')
          createUser() {}
        }
      `,
    },
    // 정상 케이스: 다른 HTTP 메서드로 같은 경로 사용 (정상)
    {
      code: `
        class UserController {
          @Get('users')
          getUsers() {}
          
          @Post('users')
          createUser() {}
          
          @Put('users')
          updateUser() {}
        }
      `,
    },
    // 정상 케이스: 라우트가 하나만 있는 경우
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
        }
      `,
    },
  ],
  invalid: [
    // 비정상 케이스: 같은 HTTP 메서드로 같은 경로 중복
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get('me')
          getMeAgain() {}
        }
      `,
      errors: [
        {
          messageId: "duplicateRoute",
          data: {
            path: "Get('me')",
          },
        },
      ],
    },
    // 비정상 케이스: 한국어 메시지
    {
      code: `
        class UserController {
          @Post('create')
          createUser() {}
          
          @Post('create')
          createUserAgain() {}
        }
      `,
      options: [{ locale: "ko" }],
      errors: [
        {
          messageId: "duplicateRouteKo",
          data: {
            path: "Post('create')",
          },
        },
      ],
    },
    // 비정상 케이스: 여러 중복
    {
      code: `
        class UserController {
          @Get('test')
          test1() {}
          
          @Get('test')
          test2() {}
          
          @Get('test')
          test3() {}
        }
      `,
      errors: [
        {
          messageId: "duplicateRoute",
          data: {
            path: "Get('test')",
          },
        },
        {
          messageId: "duplicateRoute",
          data: {
            path: "Get('test')",
          },
        },
      ],
    },
    // 비정상 케이스: 파라미터 라우트 중복
    {
      code: `
        class UserController {
          @Get(':id')
          getUser() {}
          
          @Get(':id')
          getUserAgain() {}
        }
      `,
      errors: [
        {
          messageId: "duplicateRoute",
          data: {
            path: "Get(':id')",
          },
        },
      ],
    },
  ],
});

import { RuleTester } from "eslint";
import rule from "../src/rules/route-order";

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

ruleTester.run("route-order", rule, {
  valid: [
    // 정상 케이스: static route가 먼저 오는 경우
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get(':id')
          getUser() {}
        }
      `,
    },
    // 정상 케이스: 모두 static route인 경우
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get('profile')
          getProfile() {}
        }
      `,
    },
    // 정상 케이스: 모두 parameterized route인 경우
    {
      code: `
        class UserController {
          @Get(':id')
          getUser() {}
          
          @Get(':id/posts')
          getUserPosts() {}
        }
      `,
    },
    // 정상 케이스: 다양한 HTTP 메서드
    {
      code: `
        class UserController {
          @Post('create')
          createUser() {}
          
          @Put(':id')
          updateUser() {}
          
          @Delete(':id')
          deleteUser() {}
        }
      `,
    },
  ],
  invalid: [
    // 비정상 케이스: static route가 parameterized route 뒤에 오는 경우
    {
      code: `
        class UserController {
          @Get(':id')
          getUser() {}
          
          @Get('me')
          getMe() {}
        }
      `,
      errors: [
        {
          messageId: "staticBeforeParam",
          data: {
            static: "me",
            param: ":id",
          },
        },
      ],
      output: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get(':id')
          getUser() {}
        }
      `,
    },
    // 비정상 케이스: 한국어 메시지
    {
      code: `
        class UserController {
          @Get(':id')
          getUser() {}
          
          @Get('me')
          getMe() {}
        }
      `,
      options: [{ locale: "ko" }],
      errors: [
        {
          messageId: "staticBeforeParamKo",
          data: {
            static: "me",
            param: ":id",
          },
        },
      ],
      output: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get(':id')
          getUser() {}
        }
      `,
    },
    // 비정상 케이스: 복잡한 경우
    {
      code: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get(':id')
          getUser() {}
          
          @Get('profile')
          getProfile() {}
        }
      `,
      errors: [
        {
          messageId: "staticBeforeParam",
          data: {
            static: "profile",
            param: ":id",
          },
        },
      ],
      output: `
        class UserController {
          @Get('me')
          getMe() {}
          
          @Get('profile')
          getProfile() {}
          
          @Get(':id')
          getUser() {}
        }
      `,
    },
    // 비정상 케이스: 다양한 HTTP 메서드
    {
      code: `
        class UserController {
          @Post(':id')
          updateUser() {}
          
          @Put('create')
          createUser() {}
        }
      `,
      errors: [
        {
          messageId: "staticBeforeParam",
          data: {
            static: "create",
            param: ":id",
          },
        },
      ],
      output: `
        class UserController {
          @Put('create')
          createUser() {}
          
          @Post(':id')
          updateUser() {}
        }
      `,
    },
  ],
});

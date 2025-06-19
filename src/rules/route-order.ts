import { Rule } from "eslint";
import { ROUTE_ORDER_MESSAGES } from "../constants";
import type { ClassBodyNode } from "../types";
import { createRouteFixer } from "../utils/fixer";
import { getRouteOrderMessage } from "../utils/message";
import { extractRouteInfos } from "../utils/route";
import {
  getMethodElementsWithDecorators,
  sortMethodElementsByRoute,
} from "../utils/route-sorter";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure static routes are placed before parameterized routes in NestJS controllers",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          locale: {
            type: "string",
            enum: ["en", "ko"],
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      staticBeforeParam: ROUTE_ORDER_MESSAGES.staticBeforeParam,
      staticBeforeParamKo: ROUTE_ORDER_MESSAGES.staticBeforeParamKo,
    },
  },
  create(context: Rule.RuleContext) {
    return {
      ClassBody(node: ClassBodyNode) {
        const routeInfos = extractRouteInfos(node);
        if (routeInfos.length < 2) return;

        const firstParamRoute = routeInfos.find((info) => !info.isStatic);
        if (!firstParamRoute) return;

        const methodElements = getMethodElementsWithDecorators(node.body);
        const { originalElements, sortedElements, needsReordering } =
          sortMethodElementsByRoute(methodElements);

        if (!needsReordering) return;

        const messageId = getRouteOrderMessage(context.options[0]);

        let foundParamRoute = false;
        for (const info of routeInfos) {
          if (!info.isStatic) {
            foundParamRoute = true;
          } else if (foundParamRoute) {
            context.report({
              node: info.node,
              messageId,
              data: {
                static: info.path,
                param: firstParamRoute.path,
              },
              fix: createRouteFixer(context, originalElements, sortedElements),
            });
            break;
          }
        }
      },
    };
  },
};

export default rule;

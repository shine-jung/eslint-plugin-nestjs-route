import { Rule } from "eslint";
import { ROUTE_ORDER_MESSAGES } from "../constants";
import type { ClassBodyNode } from "../types";
import { createRouteFixer } from "../utils/fixer";
import { getRouteOrderMessage } from "../utils/message";
import {
  findViolatingRoutesInSameMethod,
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
        const methodElements = getMethodElementsWithDecorators(node.body);
        if (methodElements.length < 2) return;

        const violationResult = findViolatingRoutesInSameMethod(methodElements);
        if (!violationResult) return;

        const { violatingRoute, firstParamRoute } = violationResult;
        if (!firstParamRoute) return;

        const { originalElements, sortedElements, needsReordering } =
          sortMethodElementsByRoute(methodElements);

        if (!needsReordering) return;

        const messageId = getRouteOrderMessage(context.options[0]);

        context.report({
          node: violatingRoute.node,
          messageId,
          data: {
            static: violatingRoute.path,
            param: firstParamRoute.path,
          },
          fix: createRouteFixer(context, originalElements, sortedElements),
        });
      },
    };
  },
};

export default rule;

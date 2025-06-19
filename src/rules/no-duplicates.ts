import { Rule } from "eslint";
import { NO_DUPLICATES_MESSAGES } from "../constants";
import type { ClassBodyNode } from "../types";
import { findDuplicateRoutes } from "../utils/duplicate-detector";
import {
  formatDuplicateRoutePath,
  getDuplicateRouteMessage,
} from "../utils/message";
import { extractRouteInfos } from "../utils/route";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Prevent duplicate route paths in NestJS controllers",
      category: "Best Practices",
      recommended: false,
    },
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
      duplicateRoute: NO_DUPLICATES_MESSAGES.duplicateRoute,
      duplicateRouteKo: NO_DUPLICATES_MESSAGES.duplicateRouteKo,
    },
  },
  create(context: Rule.RuleContext) {
    return {
      ClassBody(node: ClassBodyNode) {
        const routeInfos = extractRouteInfos(node);
        const duplicateGroups = findDuplicateRoutes(routeInfos);

        if (duplicateGroups.length === 0) return;

        const messageId = getDuplicateRouteMessage(context.options[0]);

        for (const group of duplicateGroups) {
          const pathDisplay = formatDuplicateRoutePath(
            group.method,
            group.path
          );

          group.routes.slice(1).forEach((route) => {
            context.report({
              node: route.node,
              messageId,
              data: { path: pathDisplay },
            });
          });
        }
      },
    };
  },
};

export default rule;

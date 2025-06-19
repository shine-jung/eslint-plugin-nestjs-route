import type { Rule } from "eslint";
import type { Node } from "estree";
import type { MethodElement } from "../types";

export const createRouteFixer = (
  context: Rule.RuleContext,
  originalElements: MethodElement[],
  sortedElements: MethodElement[]
): Rule.ReportFixer => {
  return (fixer) => {
    const sourceCode = context.getSourceCode();
    const replacements = [];

    for (let i = 0; i < originalElements.length; i++) {
      const originalElement = originalElements[i];
      const sortedElement = sortedElements[i];

      if (
        originalElement !== sortedElement &&
        originalElement &&
        sortedElement
      ) {
        replacements.push(
          fixer.replaceText(
            originalElement as Node,
            sourceCode.getText(sortedElement as Node)
          )
        );
      }
    }

    return replacements;
  };
};

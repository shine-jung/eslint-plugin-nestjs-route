import type { Node } from "estree";

export interface RouteInfo {
  path: string;
  method: string;
  isStatic: boolean;
  node: Node;
}

export interface CallExpression {
  callee?: { name?: string };
  arguments?: Array<{ type: string; value: unknown }>;
}

export interface DecoratorNode {
  expression?: CallExpression;
}

export interface MethodElement {
  type: string;
  decorators?: DecoratorNode[];
}

export interface ClassBodyNode {
  body: MethodElement[];
}

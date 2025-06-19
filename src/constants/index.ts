export const ROUTE_DECORATORS = new Set([
  "Get",
  "Post",
  "Put",
  "Delete",
  "Patch",
  "All",
  "Options",
  "Head",
] as const);

export type RouteDecorator =
  | "Get"
  | "Post"
  | "Put"
  | "Delete"
  | "Patch"
  | "All"
  | "Options"
  | "Head";

export const HTTP_METHODS = {
  GET: "Get",
  POST: "Post",
  PUT: "Put",
  DELETE: "Delete",
  PATCH: "Patch",
  ALL: "All",
  OPTIONS: "Options",
  HEAD: "Head",
} as const;

export const ROUTE_ORDER_MESSAGES = {
  staticBeforeParam:
    "Static route ('{{static}}') should be placed before parameter route ('{{param}}').",
  staticBeforeParamKo:
    "고정 라우트('{{static}}')는 파라미터 라우트('{{param}}')보다 위에 위치해야 합니다.",
} as const;

export const NO_DUPLICATES_MESSAGES = {
  duplicateRoute:
    "Duplicate route {{path}} found. Each route should be unique within a controller.",
  duplicateRouteKo:
    "중복된 라우트 {{path}}가 발견되었습니다. 컨트롤러 내에서 각 라우트는 고유해야 합니다.",
} as const;

export const METHOD_DEFINITION_TYPE = "MethodDefinition" as const;
export const LITERAL_TYPE = "Literal" as const;

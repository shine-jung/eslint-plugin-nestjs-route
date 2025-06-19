import type { Node } from "estree";
import {
  LITERAL_TYPE,
  METHOD_DEFINITION_TYPE,
  ROUTE_DECORATORS,
  type RouteDecorator,
} from "../constants";
import type {
  ClassBodyNode,
  DecoratorNode,
  MethodElement,
  RouteInfo,
} from "../types";

/**
 * 주어진 경로가 정적 라우트인지 확인합니다.
 * @param path 라우트 경로
 * @returns 정적 라우트 여부
 */
export const isStaticRoute = (path: string): boolean => {
  if (!path || typeof path !== "string") return false;
  return !path.includes(":");
};

/**
 * 데코레이터에서 라우트 경로를 추출합니다.
 * @param decorator NestJS 라우트 데코레이터
 * @returns 라우트 경로 또는 null
 */
export const getRoutePath = (decorator: DecoratorNode): string | null => {
  try {
    const args = decorator.expression?.arguments;
    if (!args?.length) return "/";

    const firstArg = args[0];
    if (!firstArg) return null;

    return firstArg.type === LITERAL_TYPE && typeof firstArg.value === "string"
      ? firstArg.value
      : null;
  } catch {
    return null;
  }
};

/**
 * 데코레이터에서 HTTP 메서드를 추출합니다.
 * @param decorator NestJS 라우트 데코레이터
 * @returns HTTP 메서드 또는 null
 */
export const getHttpMethod = (decorator: DecoratorNode): string | null => {
  try {
    return decorator.expression?.callee?.name || null;
  } catch {
    return null;
  }
};

/**
 * 주어진 데코레이터가 라우트 데코레이터인지 확인합니다.
 * @param decorator 검사할 데코레이터
 * @returns 라우트 데코레이터 여부
 */
export const isRouteDecorator = (decorator: DecoratorNode): boolean => {
  try {
    const calleeName = decorator.expression?.callee?.name;
    return calleeName
      ? ROUTE_DECORATORS.has(calleeName as RouteDecorator)
      : false;
  } catch {
    return false;
  }
};

/**
 * 메서드 요소에서 라우트 정보를 추출합니다.
 * @param element 클래스의 메서드 요소
 * @returns 라우트 정보 배열
 */
const extractRouteInfoFromElement = (element: MethodElement): RouteInfo[] => {
  if (
    !element ||
    element.type !== METHOD_DEFINITION_TYPE ||
    !element.decorators
  ) {
    return [];
  }

  const routeInfos: RouteInfo[] = [];

  for (const decorator of element.decorators) {
    if (!decorator || !isRouteDecorator(decorator)) continue;

    const path = getRoutePath(decorator);
    const method = getHttpMethod(decorator);

    if (path !== null && method) {
      routeInfos.push({
        path,
        method,
        isStatic: isStaticRoute(path),
        node: decorator as Node,
      });
    }
  }

  return routeInfos;
};

/**
 * 클래스 바디에서 모든 라우트 정보를 추출합니다.
 * @param classBody NestJS 컨트롤러 클래스 바디
 * @returns 라우트 정보 배열
 */
export const extractRouteInfos = (classBody: ClassBodyNode): RouteInfo[] => {
  if (!classBody?.body || !Array.isArray(classBody.body)) {
    return [];
  }

  const routeInfos: RouteInfo[] = [];

  for (const element of classBody.body) {
    const elementRoutes = extractRouteInfoFromElement(element);
    if (elementRoutes.length > 0) {
      routeInfos.push(...elementRoutes);
    }
  }

  return routeInfos;
};

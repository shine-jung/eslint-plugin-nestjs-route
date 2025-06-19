import type { MethodElement } from "../types";
import { extractRouteInfos } from "./route";

export interface SortResult {
  originalElements: MethodElement[];
  sortedElements: MethodElement[];
  needsReordering: boolean;
}

export const sortMethodElementsByRoute = (
  elements: MethodElement[]
): SortResult => {
  const elementsWithRoutes = elements.filter((element) => {
    const routes = extractRouteInfos({ body: [element] });
    return routes.length > 0;
  });

  if (elementsWithRoutes.length < 2) {
    return {
      originalElements: elementsWithRoutes,
      sortedElements: elementsWithRoutes,
      needsReordering: false,
    };
  }

  const sortedElements = [...elementsWithRoutes].sort((a, b) => {
    const aRoutes = extractRouteInfos({ body: [a] });
    const bRoutes = extractRouteInfos({ body: [b] });

    if (aRoutes.length === 0 || bRoutes.length === 0) return 0;

    const aIsStatic = aRoutes[0]?.isStatic ?? false;
    const bIsStatic = bRoutes[0]?.isStatic ?? false;

    if (aIsStatic && !bIsStatic) return -1;
    if (!aIsStatic && bIsStatic) return 1;
    return 0;
  });

  const needsReordering = elementsWithRoutes.some((element, index) => {
    return element !== sortedElements[index];
  });

  return {
    originalElements: elementsWithRoutes,
    sortedElements,
    needsReordering,
  };
};

export const getMethodElementsWithDecorators = (
  elements: MethodElement[]
): MethodElement[] => {
  return elements.filter((element) => {
    return element.type === "MethodDefinition" && element.decorators;
  });
};

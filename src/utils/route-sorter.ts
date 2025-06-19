import type { MethodElement } from "../types";
import { extractRouteInfos } from "./route";

export interface SortResult {
  originalElements: MethodElement[];
  sortedElements: MethodElement[];
  needsReordering: boolean;
}

interface RouteGroup {
  method: string;
  elements: MethodElement[];
}

const groupElementsByHttpMethod = (elements: MethodElement[]): RouteGroup[] => {
  const groups = new Map<string, MethodElement[]>();

  elements.forEach((element) => {
    const routes = extractRouteInfos({ body: [element] });
    if (routes.length === 0) return;

    const firstRoute = routes[0];
    if (!firstRoute) return;

    const method = firstRoute.method;
    const existingGroup = groups.get(method);
    if (existingGroup) {
      existingGroup.push(element);
    } else {
      groups.set(method, [element]);
    }
  });

  return Array.from(groups.entries()).map(([method, elements]) => ({
    method,
    elements,
  }));
};

const sortElementsInGroup = (elements: MethodElement[]): MethodElement[] => {
  return [...elements].sort((a, b) => {
    const aRoutes = extractRouteInfos({ body: [a] });
    const bRoutes = extractRouteInfos({ body: [b] });

    if (aRoutes.length === 0 || bRoutes.length === 0) return 0;

    const aIsStatic = aRoutes[0]?.isStatic ?? false;
    const bIsStatic = bRoutes[0]?.isStatic ?? false;

    if (aIsStatic && !bIsStatic) return -1;
    if (!aIsStatic && bIsStatic) return 1;
    return 0;
  });
};

const hasReorderingNeeded = (
  original: MethodElement[],
  sorted: MethodElement[]
): boolean => {
  return original.some((element, index) => element !== sorted[index]);
};

const mergeGroupsInOriginalOrder = (
  groups: RouteGroup[],
  originalElements: MethodElement[]
): MethodElement[] => {
  const groupMap = new Map<MethodElement, MethodElement>();

  groups.forEach((group) => {
    const sortedGroupElements = sortElementsInGroup(group.elements);
    group.elements.forEach((originalElement, index) => {
      const sortedElement = sortedGroupElements[index];
      if (sortedElement) {
        groupMap.set(originalElement, sortedElement);
      }
    });
  });

  return originalElements.map((element) => groupMap.get(element) || element);
};

export const sortMethodElementsByRoute = (
  elements: MethodElement[]
): SortResult => {
  const elementsWithRoutes = getMethodElementsWithDecorators(elements);

  if (elementsWithRoutes.length < 2) {
    return {
      originalElements: elementsWithRoutes,
      sortedElements: elementsWithRoutes,
      needsReordering: false,
    };
  }

  const groups = groupElementsByHttpMethod(elementsWithRoutes);
  const sortedElements = mergeGroupsInOriginalOrder(groups, elementsWithRoutes);
  const needsReordering = hasReorderingNeeded(
    elementsWithRoutes,
    sortedElements
  );

  return {
    originalElements: elementsWithRoutes,
    sortedElements,
    needsReordering,
  };
};

export const getMethodElementsWithDecorators = (
  elements: MethodElement[]
): MethodElement[] => {
  return elements.filter(
    (element) => element.type === "MethodDefinition" && element.decorators
  );
};

export const findViolatingRoutesInSameMethod = (elements: MethodElement[]) => {
  const groups = groupElementsByHttpMethod(
    getMethodElementsWithDecorators(elements)
  );

  for (const group of groups) {
    const routes = group.elements.flatMap((element) =>
      extractRouteInfos({ body: [element] })
    );

    let foundParamRoute = false;
    for (const route of routes) {
      if (!route.isStatic) {
        foundParamRoute = true;
      } else if (foundParamRoute) {
        const firstParamRoute = routes.find((r) => !r.isStatic);
        return { violatingRoute: route, firstParamRoute };
      }
    }
  }

  return null;
};

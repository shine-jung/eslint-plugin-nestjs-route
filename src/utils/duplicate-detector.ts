import type { RouteInfo } from "../types";

export interface DuplicateGroup {
  key: string;
  routes: RouteInfo[];
  method: string;
  path: string;
}

export const findDuplicateRoutes = (
  routeInfos: RouteInfo[]
): DuplicateGroup[] => {
  if (routeInfos.length < 2) return [];

  const routeMap = new Map<string, RouteInfo[]>();

  for (const info of routeInfos) {
    const key = `${info.method}|${info.path}`;
    const existing = routeMap.get(key);
    existing ? existing.push(info) : routeMap.set(key, [info]);
  }

  const duplicates: DuplicateGroup[] = [];

  for (const [key, routes] of routeMap) {
    if (routes.length > 1) {
      const parts = key.split("|");
      const method = parts[0] || "";
      const path = parts[1] || "";
      duplicates.push({
        key,
        routes,
        method,
        path,
      });
    }
  }

  return duplicates;
};

export interface MessageOptions {
  locale?: "en" | "ko";
}

export const getRouteOrderMessage = (options?: MessageOptions): string => {
  const locale = options?.locale || "en";
  return locale === "ko" ? "staticBeforeParamKo" : "staticBeforeParam";
};

export const getDuplicateRouteMessage = (options?: MessageOptions): string => {
  const locale = options?.locale || "en";
  return locale === "ko" ? "duplicateRouteKo" : "duplicateRoute";
};

export const formatDuplicateRoutePath = (
  method: string,
  path: string
): string => {
  return `${method}('${path}')`;
};

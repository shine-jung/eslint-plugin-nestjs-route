import routeOrder from "./rules/route-order";
import noDuplicates from "./rules/no-duplicates";
import { version } from "../package.json";

export const meta = {
  name: "eslint-plugin-nestjs-route",
  version,
};

export const rules = {
  order: routeOrder,
  "no-duplicates": noDuplicates,
};

export const configs = {
  recommended: {
    plugins: ["nestjs-route"],
    rules: {
      "nestjs-route/order": "error",
      "nestjs-route/no-duplicates": "error",
    },
  },
};

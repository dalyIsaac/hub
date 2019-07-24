import qs from "querystring";
import { match } from "react-router";
import { isUndefined } from "util";

export type RouteIdMatch = match<{ id?: string }>;

export interface RouteIdProps {
  match: RouteIdMatch;
}

export type DisplayOptions = "grid" | "list";

export const basePath = "/";
export const subjectPath = "/:id?";

export const gotoSubject = (display: DisplayOptions, id?: string): string => {
  const url = id ? id : "";
  return url + "?" + qs.stringify({ display });
};

export const getDisplay = (match: RouteIdMatch): DisplayOptions => {
  const query = qs.parse(match.path);
  const display =
    !isUndefined(query.display) && !Array.isArray(query.display)
      ? query.display
      : "grid";
  if (display === "list") {
    return display;
  }
  return "grid";
};

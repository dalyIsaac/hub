import qs from "query-string";
import { isUndefined } from "util";
import { Location } from "history";

export interface RouteIdProps {
  id?: string;
}

export type DisplayOptions = "grid" | "list";

export const basePath = "/";
export const subjectPath = "/:id?";

export const gotoSubject = (display: DisplayOptions, id?: string): string => {
  const url = id ? id : "";
  return url + "?" + qs.stringify({ display });
};

export const getDisplay = (location: Location): DisplayOptions => {
  const query = qs.parse(location.search);
  const display =
    !isUndefined(query.display) && !Array.isArray(query.display)
      ? query.display
      : "grid";
  if (display === "list") {
    return display;
  }
  return "grid";
};

import qs from "query-string";
import { isUndefined } from "util";
import { Location } from "history";
import { Subject } from "./subject/model/Subject";
import { match } from "react-router";

export interface SubjectsRouteProps {
  id?: string;
}

export type DisplayOptions = "grid" | "list";

export const basePath = "/";
export const subjectBase = "/subjects";
export const subjectPath = subjectBase + "/:id?";

export const gotoSubject = (display: DisplayOptions, id?: string): string => {
  const url = id ? id : "";
  return `${subjectBase}/${url}?${qs.stringify({ display })}`;
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

export interface SearchRouteProps {
  param: string;
  query: string;
}

export const searchBase = "/search";
export const searchPath = searchBase + "/:param/:query";

export const gotoSearch = (param: keyof Subject, query: string): string =>
  `${searchBase}/${param}/${query}`;

export const getSearch = (match: match<SearchRouteProps>): [string, string] => {
  const param = match.params.param.toLowerCase();
  const query = match.params.query.toLowerCase();
  return [param, query];
};

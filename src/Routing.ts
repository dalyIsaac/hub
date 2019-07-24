import qs from "query-string";
import { isUndefined } from "util";
import { Location } from "history";
import { Subject } from "./subject/model/Subject";
import { match as Match } from "react-router";

export interface SubjectsRouteProps {
  id?: string;
}

export type DisplayOptions = "grid" | "list";

export const subjectBase = "/subjects";

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

export const gotoSearch = (param: keyof Subject, query: string): string =>
  `${searchBase}/${param}/${query}`;

export const getSearchLocation = (location: Location): [string, string] => {
  const components = location.pathname.split("/").slice(1);
  if (components[0] !== "search" || components.length < 3) {
    throw new Error("This isn't a search path.");
  }
  const param = components[1];
  const query = components[2];
  return [param, query];
};

export const getSearchMatch = (
  match: Match<SearchRouteProps>,
): [string, string] => {
  try {
    const param = match.params.param.toLowerCase();
    const query = match.params.query.toLowerCase();
    return [param, query];
  } catch (error) {
    throw Error("This isn't a search path.");
  }
};

export const Paths = {
  base: "/",
  search: searchBase + "/:param/:query",
  subject: subjectBase + "/:id?",
};

export const AllPaths = [Paths.search, Paths.subject, Paths.base];

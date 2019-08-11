import { match as Match } from "react-router";
import { Subject } from "../model/Subject";

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

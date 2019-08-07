import { SearchRouteProps, searchBase } from "./Search/Routing";
import { SubjectsRouteProps, subjectBase } from "./subject/Routing";
import { ViewRouteProps, viewBase } from "./views/Routing";

export const Paths = {
  base: "/",
  search: searchBase + "/:param/:query",
  subject: subjectBase + "/:parentId?",
  view: viewBase + "/:viewId",
};

// !Make sure that Paths.base is always last
export const AllPaths = [Paths.search, Paths.subject, Paths.view, Paths.base];

export type AllParams = SubjectsRouteProps & SearchRouteProps & ViewRouteProps;

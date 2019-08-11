import { SearchRouteProps, searchBase } from "./model/Search/Routing";
import { SubjectsRouteProps, subjectBase } from "./model/Subject/Routing";
import { ViewRouteProps, viewBase } from "./model/Views/Routing";

import { RouteComponentProps } from "react-router";

export const Paths = {
  base: "/",
  search: searchBase + "/:param/:query",
  subject: subjectBase + "/:parentId?",
  view: viewBase + "/:viewId",
};

// !Make sure that Paths.base is always last
export const AllPaths = [Paths.search, Paths.subject, Paths.view, Paths.base];

export type AllParams = SubjectsRouteProps & SearchRouteProps & ViewRouteProps;
export type AllRouteComponentProps = RouteComponentProps<AllParams>;

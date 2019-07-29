import { searchBase } from "./Search/Routing";
import { subjectBase } from "./subject/Routing";
import { viewBase } from "./views/Routing";

export const Paths = {
  base: "/",
  search: searchBase + "/:param/:query",
  subject: subjectBase + "/:id?",
  view: viewBase + "/:name",
};

// !Make sure that Paths.base is always last
export const AllPaths = [Paths.search, Paths.subject, Paths.view, Paths.base];

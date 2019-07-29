import { searchBase } from "./Search/Routing";
import { subjectBase } from "./subject/Routing";

export const Paths = {
  base: "/",
  search: searchBase + "/:param/:query",
  subject: subjectBase + "/:id?",
};

export const AllPaths = [Paths.search, Paths.subject, Paths.base];

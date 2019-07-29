import qs from "query-string";
import { DisplayOptions } from "../Display";

export interface SubjectsRouteProps {
  id?: string;
}

export const subjectBase = "/subjects";

export const gotoSubject = (display: DisplayOptions, id?: string): string => {
  const url = id ? id : "";
  return `${subjectBase}/${url}?${qs.stringify({ display })}`;
};

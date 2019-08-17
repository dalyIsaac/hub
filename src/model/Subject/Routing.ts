export interface SubjectsRouteProps {
  parentId?: string;
}

export const subjectBase = "/subjects";

export const gotoSubject = (id?: string): string => {
  const url = id ? id : "";
  return `${subjectBase}/${url}`;
};

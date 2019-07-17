import { SubjectState, Subject, SubjectTypes } from "./Subject";
import { v4 } from "uuid";
import { BaseAction } from "../../Common";

export const CREATE_SUBJECT = "CREATE_SUBJECT";

interface CreateSubjectProps<T extends SubjectTypes> {
  subjectType?: T;
  parent?: string;
}

export interface CreateSubjectAction<T extends SubjectTypes>
  extends BaseAction,
    CreateSubjectProps<T> {}

export const createSubject = <T extends SubjectTypes>(
  props?: CreateSubjectProps<T>,
): CreateSubjectAction<T> => ({
  type: CREATE_SUBJECT,
  ...props,
});

export const createSubjectReducer = (
  state: SubjectState,
  { subjectType, parent }: CreateSubjectAction<SubjectTypes>,
): void => {
  const id = v4();

  const subject: Subject = {
    type: subjectType || "BaseSubject",
    name: "Untitled",
    created: new Date(),
    description: "",
    children: [],
    parents: new Set(),
  };

  if (parent !== undefined) {
    subject.parents.add(parent);
    state[parent].children.push(id);
  }

  state[id] = subject;
};

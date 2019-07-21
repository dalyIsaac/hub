import {
  SubjectState,
  Subject,
  SubjectTypes,
  SubjectBaseAction,
} from "./Subject";
import { v4 } from "uuid";
import { sortItems, getInitialOrder } from "./Order";

export const CREATE_SUBJECT = "CREATE_SUBJECT";

interface CreateSubjectProps<T extends SubjectTypes> {
  subjectType?: T;
  parent?: string;
}

export interface CreateSubjectAction<T extends SubjectTypes>
  extends SubjectBaseAction,
    CreateSubjectProps<T> {}

export const createSubject = <T extends SubjectTypes>(
  props?: CreateSubjectProps<T>,
): CreateSubjectAction<T> => ({
  type: CREATE_SUBJECT,
  subjectId: v4(),
  ...props,
});

export const createSubjectReducer = (
  state: SubjectState,
  { subjectType, parent, subjectId }: CreateSubjectAction<SubjectTypes>,
): void => {
  const subject: Subject = {
    type: subjectType || "BaseSubject",
    name: "Untitled",
    created: new Date(),
    description: "",
    children: getInitialOrder(),
    parents: new Set(),
  };

  state.dict[subjectId] = subject;

  if (parent !== undefined) {
    subject.parents.add(parent);
    const s = state.dict[parent];
    s.children.order.push(subjectId);
    sortItems(state.dict, s.children);
  }
  state.order.order.push(subjectId);
  sortItems(state.dict, state.order);
};

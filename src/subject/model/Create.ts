import {
  SubjectState,
  Subject,
  SubjectTypes,
  SubjectBaseAction,
} from "./Subject";
import { v4 } from "uuid";
import { getInitialOrder } from "../../Order";
import { appendChildReducer, appendChild } from "./AppendChild";

export const CREATE_SUBJECT = "CREATE_SUBJECT";

interface CreateSubjectProps<T extends SubjectTypes> {
  subjectType?: T;
  parentId?: string;
  viewId?: string;
}

export interface CreateSubjectAction<T extends SubjectTypes>
  extends SubjectBaseAction,
    CreateSubjectProps<T> {}

export const createSubject = <T extends SubjectTypes>(
  props?: CreateSubjectProps<T>,
): CreateSubjectAction<T> => ({
  subjectId: v4(),
  type: CREATE_SUBJECT,
  ...props,
});

export const createSubjectReducer = (
  state: SubjectState,
  {
    subjectType,
    parentId,
    subjectId,
    viewId,
  }: CreateSubjectAction<SubjectTypes>,
): void => {
  const subject: Subject = {
    children: getInitialOrder(),
    created: new Date(),
    description: "",
    name: "Untitled",
    parents: new Set(),
    type: subjectType || "BaseSubject",
  };

  state.dict[subjectId] = subject;

  if (parentId !== undefined) {
    appendChildReducer(state, appendChild(parentId, subjectId));
  }
  if (viewId !== undefined) {
    // TODO
  }
  state.order.order.push(subjectId);
};

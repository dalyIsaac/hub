import { Subject, SubjectTypes, SubjectBaseAction } from "./Subject";
import { v4 } from "uuid";
import { getInitialOrder } from "../../Order";
import {
  appendChildReducer as subjectsAppendChildReducer,
  appendChild as subjectsAppendChild,
} from "./AppendChild";
import {
  appendChildReducer as viewsAppendChildReducer,
  appendChild as viewsAppendChild,
} from "../../views/model/AppendChild";
import { State } from "../../Reducer";

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
  state: State,
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

  state.subjects.dict[subjectId] = subject;

  if (parentId !== undefined) {
    subjectsAppendChildReducer(
      state.subjects,
      subjectsAppendChild(parentId, subjectId),
    );
  }
  if (viewId !== undefined) {
    viewsAppendChildReducer(state, viewsAppendChild(viewId, subjectId));
  }
  state.subjects.order.order.push(subjectId);
};

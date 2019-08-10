import { Subject, SubjectBaseAction, SubjectTypes } from "./Subject";
import {
  appendSubjectToView,
  appendSubjectToViewReducer,
} from "../../views/model/AppendSubjectToView";
import {
  appendChildSubjectToSubject as subjectsAppendChild,
  appendChildSubjectToSubjectReducer as subjectsAppendChildReducer,
} from "./AppendChildSubjectToSubject";

import { State } from "../../Reducer";
import { getInitialOrder } from "../../Order";
import { v4 } from "uuid";

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
    views: new Set(),
  };

  state.subjects.dict[subjectId] = subject;

  if (parentId !== undefined) {
    subjectsAppendChildReducer(
      state.subjects,
      subjectsAppendChild(parentId, subjectId),
    );
  }
  if (viewId !== undefined) {
    appendSubjectToViewReducer(state, appendSubjectToView(viewId, subjectId));
  }
  state.subjects.order.order.push(subjectId);
};

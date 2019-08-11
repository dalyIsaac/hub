import {
  APPEND_CHILD_SUBJECT_TO_SUBJECT,
  AppendChildSubjectToSubjectAction,
  appendChildSubjectToSubjectReducer,
} from "./AppendChildSubjectToSubject";
import {
  COMPLETE_SUBJECT,
  CompleteSubjectAction,
  UNCOMPLETE_SUBJECT,
  UncompleteSubjectAction,
  completeSubjectReducer,
  uncompleteSubjectReducer,
} from "./CompleteSubject";
import {
  CREATE_SUBJECT,
  CreateSubjectAction,
  createSubjectReducer,
} from "./CreateSubject";
import {
  DELETE_SUBJECT,
  DeleteSubjectAction,
  deleteSubjectReducer,
} from "./DeleteSubject";
import {
  REMOVE_CHILD_SUBJECT_FROM_SUBJECT_REDUCER,
  RemoveChildSubjectFromSubjectAction,
  removeChildSubjectFromSubjectReducer,
} from "./RemoveChildSubjectFromSubject";
import {
  SET_FIELDS_ARRAY,
  SetFieldsArrayAction,
  setFieldsArrayReducer,
} from "./SetFieldsArray";
import {
  SET_FIELDS_DESC,
  SetFieldsDescAction,
  setFieldsDescReducer,
} from "./SetFieldsDesc";
import {
  SET_SEPARATE_COMPLETE,
  SetSeparateCompleteAction,
  setSeparateCompleteReducer,
} from "./SetSeparateComplete";
import {
  SET_SUBJECT_DESCRIPTION,
  SetSubjectDescriptionAction,
  setSubjectDescriptionReducer,
} from "./SetSubjectDescription";
import {
  SET_SUBJECT_DUE_DATE,
  SetSubjectDueDateAction,
  setSubjectDueDateReducer,
} from "./SetSubjectDueDate";
import {
  SET_SUBJECT_NAME,
  SetSubjectNameAction,
  setSubjectNameReducer,
} from "./SetSubjectName";
import { SubjectState, SubjectTypes } from ".";
import {
  getInitialOrder,
  getInitialSortItemsOptions,
  sortItems,
} from "../Order";

import { Action } from "redux";
import { State } from "../../Reducer";
import { isUndefined } from "lodash";
import produce from "immer";

export const initialSubjectState = (): SubjectState => ({
  dict: {},
  order: getInitialOrder(),
  searchSortOptions: getInitialSortItemsOptions(),
});

// TODO: check if https://github.com/rt2zz/redux-persist/pull/915 is
// distributed. The spread is used since for some reason the NPM package doesn't
// contain the spread from the pull request.
const subjectReducer = (state: State, action: Action): State => ({
  ...produce(
    state,
    (draftState): State => {
      const { subjects } = draftState;
      switch (action.type) {
        case SET_SUBJECT_NAME:
          setSubjectNameReducer(subjects, action as SetSubjectNameAction);
          break;
        case SET_SUBJECT_DESCRIPTION:
          setSubjectDescriptionReducer(
            subjects,
            action as SetSubjectDescriptionAction,
          );
          break;
        case COMPLETE_SUBJECT:
          completeSubjectReducer(subjects, action as CompleteSubjectAction);
          break;
        case UNCOMPLETE_SUBJECT:
          uncompleteSubjectReducer(subjects, action as UncompleteSubjectAction);
          break;
        case DELETE_SUBJECT:
          deleteSubjectReducer(draftState, action as DeleteSubjectAction);
          break;
        case SET_SUBJECT_DUE_DATE:
          setSubjectDueDateReducer(subjects, action as SetSubjectDueDateAction);
          break;
        case CREATE_SUBJECT:
          createSubjectReducer(draftState, action as CreateSubjectAction<
            SubjectTypes
          >);
          break;
        case REMOVE_CHILD_SUBJECT_FROM_SUBJECT_REDUCER:
          removeChildSubjectFromSubjectReducer(
            subjects,
            action as RemoveChildSubjectFromSubjectAction,
          );
          break;
        case APPEND_CHILD_SUBJECT_TO_SUBJECT:
          appendChildSubjectToSubjectReducer(
            subjects,
            action as AppendChildSubjectToSubjectAction,
          );
          break;
        case SET_FIELDS_ARRAY:
          setFieldsArrayReducer(subjects, action as SetFieldsArrayAction);
          break;
        case SET_FIELDS_DESC:
          setFieldsDescReducer(subjects, action as SetFieldsDescAction);
          break;
        case SET_SEPARATE_COMPLETE:
          setSeparateCompleteReducer(
            subjects,
            action as SetSeparateCompleteAction,
          );
          break;
        default:
          break;
      }

      // Prevents redux-persist from being overridden during hydration.
      if (subjects.order.order.length > 0) {
        subjects.order.order = sortItems(subjects.dict, subjects.order);
      }
      // Adds new `searchSortOptions` if it wasn't already in the state
      if (isUndefined(subjects.searchSortOptions)) {
        subjects.searchSortOptions = getInitialSortItemsOptions();
      }
      return draftState;
    },
  ),
});

export default subjectReducer;

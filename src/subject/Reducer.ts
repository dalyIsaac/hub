import produce from "immer";
import { Action } from "redux";
import { SubjectState, SubjectTypes } from "./model/Subject";
import {
  SET_SUBJECT_NAME,
  setSubjectNameReducer,
  SetSubjectNameAction,
} from "./model/Name";
import {
  SET_SUBJECT_DESCRIPTION,
  setSubjectDescriptionReducer,
  SetSubjectDescriptionAction,
} from "./model/Description";
import {
  COMPLETE_SUBJECT,
  CompleteSubjectAction,
  UNCOMPLETE_SUBJECT,
  uncompleteSubjectReducer,
  completeSubjectReducer,
  UncompleteSubjectAction,
} from "./model/Completed";
import {
  DELETE_SUBJECT,
  DeleteSubjectAction,
  deleteSubjectReducer,
} from "./model/Delete";
import {
  SET_SUBJECT_DUE_DATE,
  SetSubjectDueDateAction,
  setSubjectDueDateReducer,
} from "./model/Date";
import {
  CREATE_SUBJECT,
  createSubjectReducer,
  CreateSubjectAction,
} from "./model/Create";
import {
  REMOVE_CHILD_SUBJECT,
  removeChildReducer,
  RemoveChildAction,
} from "./model/RemoveChild";
import {
  APPEND_CHILD_SUBJECT,
  AppendChildAction,
  appendChildReducer,
} from "./model/AppendChild";
import {
  getInitialOrder,
  sortItems,
  getInitialSortItemsOptions,
} from "../Order";
import {
  SET_FIELDS_ARRAY,
  SetFieldsArrayAction,
  setFieldsArrayReducer,
} from "./model/SetFieldsArray";
import {
  SET_FIELDS_DESC,
  setFieldsDescReducer,
  SetFieldsDescAction,
} from "./model/SetFieldsDesc";
import {
  SET_SEPARATE_COMPLETE,
  setSeparateCompleteReducer,
  SetSeparateCompleteAction,
} from "./model/SetSeparateComplete";
import { isUndefined } from "lodash";
import { State } from "../Reducer";

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
          deleteSubjectReducer(subjects, action as DeleteSubjectAction);
          break;
        case SET_SUBJECT_DUE_DATE:
          setSubjectDueDateReducer(subjects, action as SetSubjectDueDateAction);
          break;
        case CREATE_SUBJECT:
          createSubjectReducer(subjects, action as CreateSubjectAction<
            SubjectTypes
          >);
          break;
        case REMOVE_CHILD_SUBJECT:
          removeChildReducer(subjects, action as RemoveChildAction);
          break;
        case APPEND_CHILD_SUBJECT:
          appendChildReducer(subjects, action as AppendChildAction);
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

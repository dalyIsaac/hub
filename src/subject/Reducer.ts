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

const getInitialState = (): SubjectState => ({
  dict: {},
  order: getInitialOrder(),
  searchSortOptions: getInitialSortItemsOptions(),
});

const subjectReducer = (
  state: SubjectState = getInitialState(),
  action: Action,
): SubjectState =>
  produce(
    state,
    (draftState): SubjectState => {
      switch (action.type) {
        case SET_SUBJECT_NAME:
          setSubjectNameReducer(draftState, action as SetSubjectNameAction);
          break;
        case SET_SUBJECT_DESCRIPTION:
          setSubjectDescriptionReducer(
            draftState,
            action as SetSubjectDescriptionAction,
          );
          break;
        case COMPLETE_SUBJECT:
          completeSubjectReducer(draftState, action as CompleteSubjectAction);
          break;
        case UNCOMPLETE_SUBJECT:
          uncompleteSubjectReducer(
            draftState,
            action as UncompleteSubjectAction,
          );
          break;
        case DELETE_SUBJECT:
          deleteSubjectReducer(draftState, action as DeleteSubjectAction);
          break;
        case SET_SUBJECT_DUE_DATE:
          setSubjectDueDateReducer(
            draftState,
            action as SetSubjectDueDateAction,
          );
          break;
        case CREATE_SUBJECT:
          createSubjectReducer(draftState, action as CreateSubjectAction<
            SubjectTypes
          >);
          break;
        case REMOVE_CHILD_SUBJECT:
          removeChildReducer(draftState, action as RemoveChildAction);
          break;
        case APPEND_CHILD_SUBJECT:
          appendChildReducer(draftState, action as AppendChildAction);
          break;
        case SET_FIELDS_ARRAY:
          setFieldsArrayReducer(draftState, action as SetFieldsArrayAction);
          break;
        case SET_FIELDS_DESC:
          setFieldsDescReducer(draftState, action as SetFieldsDescAction);
          break;
        case SET_SEPARATE_COMPLETE:
          setSeparateCompleteReducer(
            draftState,
            action as SetSeparateCompleteAction,
          );
          break;
        default:
          break;
      }

      // Prevents redux-persist from being overridden during hydration.
      if (draftState.order.order.length > 0) {
        draftState.order.order = sortItems(draftState.dict, draftState.order);
      }
      // Adds new `searchSortOptions` if it wasn't already in the state
      if (isUndefined(draftState.searchSortOptions)) {
        draftState.searchSortOptions = getInitialSortItemsOptions();
      }
      return draftState;
    },
  );

export default subjectReducer;

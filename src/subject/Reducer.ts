import produce from "immer";
import { Action } from "redux";
import { SubjectState, SubjectTypes } from "./model/Subject";
import {
  SET_SUBJECT_NAME,
  setSubjectNameReducer,
  SetSubjectNameAction,
} from "./model/Title";
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
} from "./model/CreateChild";

const NUM_ITEMS = 23;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomChildren = (): string[] => {
  const children = [];
  for (let i = 0; i < getRandomInt(12); i++) {
    children.push(getRandomInt(NUM_ITEMS).toString());
  }
  return children;
};

const getInitialState = (amount: number): SubjectState => {
  const state: SubjectState = {};
  for (let i = 0; i < amount; i++) {
    state[i.toString()] = {
      type: "BaseSubject",
      name: `Name${i}`,
      created: new Date(),
      description: `Description${i}`,
      dueDate: new Date(),
      children: getRandomChildren(),
      parents: new Set(),
    };
  }

  // Update parents
  for (let i = 0; i < amount; i++) {
    for (const childId of state[i.toString()].children) {
      state[childId].parents.add(i.toString());
    }
  }
  return state;
};

const subjectReducer = (
  state: SubjectState = getInitialState(NUM_ITEMS),
  action: Action,
) =>
  produce(state, (draftState) => {
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
        uncompleteSubjectReducer(draftState, action as UncompleteSubjectAction);
        break;
      case DELETE_SUBJECT:
        deleteSubjectReducer(draftState, action as DeleteSubjectAction);
        break;
      case SET_SUBJECT_DUE_DATE:
        setSubjectDueDateReducer(draftState, action as SetSubjectDueDateAction);
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
      default:
        break;
    }
    return draftState;
  });

export default subjectReducer;

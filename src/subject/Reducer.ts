import produce from "immer";
import { Action } from "redux";
import { SubjectState } from "./model/Subject";
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

const NUM_ITEMS = 23;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomChildren = (): string[] => {
  const children = [];
  for (let i = 0; i < 12; i++) {
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
      default:
        break;
    }
    return draftState;
  });

export default subjectReducer;

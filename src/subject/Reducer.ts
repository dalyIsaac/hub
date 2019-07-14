import produce from "immer";
import { Action } from "redux";
import { SubjectState } from "./model/Subject";
import {
  UPDATE_SUBJECT_NAME,
  updateSubjectNameReducer,
  UpdateSubjectNameAction,
} from "./model/Title";
import {
  UPDATE_SUBJECT_DESCRIPTION,
  updateSubjectDescriptionReducer,
  UpdateSubjectDescriptionAction,
} from "./model/Description";

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
    };
  }
  return state;
};

const subjectReducer = (
  state: SubjectState = getInitialState(NUM_ITEMS),
  action: Action,
) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case UPDATE_SUBJECT_NAME:
        updateSubjectNameReducer(draftState, action as UpdateSubjectNameAction);
        break;
      case UPDATE_SUBJECT_DESCRIPTION:
        updateSubjectDescriptionReducer(
          draftState,
          action as UpdateSubjectDescriptionAction,
        );
        break;
      default:
        break;
    }
    return draftState;
  });

export default subjectReducer;

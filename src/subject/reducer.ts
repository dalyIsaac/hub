import produce from "immer";
import { SubjectState, Subject } from "./model";
import { Action } from "redux";

const getInitialState = (amount: number): SubjectState => {
  const state: SubjectState = {};
  for (let i = 0; i < amount; i++) {
    state[i.toString()] = {
      type: "BaseSubject",
      name: `Name${i}`,
      created: new Date(),
      description: `Description${i}`,
      dueDate: new Date()
    };
  }
  return state;
};

const subjectReducer = (
  state: SubjectState = getInitialState(23),
  action: Action
) =>
  produce(state, draftState => {
    return draftState;
  });

export default subjectReducer;

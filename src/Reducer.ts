import { combineReducers } from "redux";
import subjectReducer from "./subject/Reducer";
import { SubjectState } from "./subject/model/Subject";
import updateOrder from "./order/Reducer";
import { OrderState } from "./order/model/Order";

export interface State {
  subjects: SubjectState;
  order: OrderState;
}

export default combineReducers({
  subjects: subjectReducer,
  order: updateOrder,
});

/* eslint @typescript-eslint/explicit-function-return-type: "off" */

import { createTransform } from "redux-persist";
import { ViewState } from "./View";

interface PersistSubjectState extends Omit<ViewState, "orderSet"> {}

const transformViews = createTransform<ViewState, PersistSubjectState>(
  ({ orderSet, ...everythingElse }, _key) => {
    return everythingElse;
  },
  (state, _key) => {
    return { ...state, orderSet: new Set(state.order) };
  },
  {
    whitelist: ["views"],
  },
);

export default transformViews;

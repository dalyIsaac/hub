import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import SortButton from "../../AppCommandBar/SortButton";
import { State } from "../../Reducer";
import { Toggle } from "office-ui-fabric-react";
import { setSeparateComplete } from "../model/SetSeparateComplete";

interface UseCommandBarOptions {
  subjectId?: string;
  isSearch?: boolean;
  showSort?: boolean;
}

export function useCommandBar({ showSort, subjectId }: UseCommandBarOptions) {
  const dispatch = useDispatch();
  const subjects = useSelector((state: State) => state.subjects);

  const currentOrder =
    subjectId && subjectId in subjects.dict
      ? subjects.dict[subjectId].children.options
      : subjects.order.options;

  const setSeparateCompleteOnChange = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { subjectId: subjectId }));
    },
    [dispatch, subjectId],
  );

  const items = [];

  if (showSort) {
    items.push(
      <SortButton
        key="sort"
        subjectId={subjectId}
        fields={currentOrder.fields}
      />,
    );
  }

  items.push(
    <Toggle
      key="separateComplete"
      checked={currentOrder.separateCompletedItems}
      offText={"Don't separate completed items"}
      onText={"Separate completed items"}
      onChange={setSeparateCompleteOnChange}
      styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
    />,
  );

  return items;
}

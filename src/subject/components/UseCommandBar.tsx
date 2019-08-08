import { AllRouteComponentProps, Paths } from "../../Routing";
import { CommandBarButton, Toggle } from "office-ui-fabric-react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppendChildren from "../../views/components/AppendChildren";
import { BUTTON_HEIGHT } from "../../AppCommandBar/Common";
import SortButton from "../../AppCommandBar/SortButton";
import { State } from "../../Reducer";
import { setSeparateComplete } from "../model/SetSeparateComplete";

const commandBarStyles = { root: { height: BUTTON_HEIGHT } };

interface UseCommandBarOptions {
  subjectId?: string;
  showSort?: boolean;
  match: AllRouteComponentProps["match"];
}

export function useCommandBar({
  match,
  showSort,
  subjectId,
}: UseCommandBarOptions) {
  const { viewId } = match.params;
  const isViews = match.path === Paths.view && viewId;

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

  const [panelOpen, setShowPanel] = useState(false);
  const showPanel = useCallback((): void => {
    setShowPanel(true);
  }, []);
  const hidePanel = useCallback((): void => {
    setShowPanel(false);
  }, []);

  if (isViews) {
    items.push(
      <CommandBarButton
        key="appendChildren"
        text="Append child subjects"
        iconProps={{ iconName: "RowsChild" }}
        ariaLabel="Create child subject"
        onClick={showPanel}
        styles={commandBarStyles}
      />,
      <AppendChildren
        key="panel"
        hidePanel={hidePanel}
        isOpen={panelOpen}
        viewId={viewId}
      />,
    );
  }

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

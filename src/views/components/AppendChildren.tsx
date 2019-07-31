import React from "react";
import { Panel, IPanelProps } from "office-ui-fabric-react";
import SimpleListView from "../../subject/components/SimpleListView";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { PANEL_HEADER_HEIGHT } from "../../Common";
import AppendChildrenListItem from "./AppendChildrenListItem";
import { isUndefined } from "lodash";
import { Redirect } from "react-router";
import { Paths } from "../../Routing";

interface AppendChildrenProps {
  isOpen: boolean;
  hidePanel: IPanelProps["onDismiss"];
  viewId?: string;
}

export default function AppendChildren({
  hidePanel,
  isOpen,
  viewId,
}: AppendChildrenProps): JSX.Element {
  const { subjects, views } = useSelector((state: State) => state);

  if (isUndefined(viewId)) {
    return <Redirect to={Paths.base} />;
  }

  const order = subjects.order.order;
  const illegalIds = new Set(views.dict[viewId].children.order);

  return (
    <React.Fragment>
      <Panel
        isOpen={isOpen}
        isLightDismiss={true}
        headerText="Append Children"
        onDismiss={hidePanel}
      >
        <SimpleListView
          viewId={viewId}
          order={order}
          illegalIds={illegalIds}
          notifyNoChildren={true}
          maxHeight={`calc(100vh-${PANEL_HEADER_HEIGHT})`}
          onRenderCell={AppendChildrenListItem}
        />
      </Panel>
    </React.Fragment>
  );
}

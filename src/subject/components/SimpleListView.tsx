import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { FocusZone, List, Text } from "office-ui-fabric-react";
import { mergeStyleSets } from "@uifabric/styling";
import { State } from "../../Reducer";
import { getItems, Item } from "../model/Subject";

interface ListViewProps {
  parentId?: string;
  viewId?: string;
  illegalIds?: Set<string>;
  order: string[];
  maxHeight: number | string;
  onRenderCell: (
    item?: Item,
    index?: number | undefined,
    isScrolling?: boolean | undefined,
  ) => React.ReactNode;

  /**
   * When true, text is shown if there's no children
   */
  notifyNoChildren?: boolean;
}

const styles = mergeStyleSets({
  list: {
    overflow: "auto",
  },
});

export default function SimpleListView({
  order,
  parentId,
  maxHeight,
  onRenderCell,
  illegalIds,
  notifyNoChildren,
  viewId,
}: ListViewProps): JSX.Element {
  const { subjects } = useSelector((state: State) => state);

  const condition = useCallback(
    (i: Item): boolean => !!illegalIds && !illegalIds.has(i.id),
    [illegalIds],
  );

  const options = {
    condition: illegalIds ? condition : undefined,
    parentId,
    viewId,
  };
  const children = getItems(subjects.dict, order, options);

  return (
    <FocusZone className={styles.list} style={{ maxHeight }}>
      {children.length === 0 && notifyNoChildren ? (
        <Text>
          {"There's nothing here"}
          <span role="img" aria-label="Gust of Wind emoji">
            💨
          </span>
        </Text>
      ) : (
        <List items={children} onRenderCell={onRenderCell} />
      )}
    </FocusZone>
  );
}

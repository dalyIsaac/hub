import React from "react";
import { useSelector } from "react-redux";
import { FocusZone, List, Text } from "office-ui-fabric-react";
import { mergeStyleSets } from "@uifabric/styling";
import { State } from "../../Reducer";
import { getItems, Item } from "../model/Subject";

interface ListViewProps {
  subjectId: string;
  maxHeight: number | string;

  /**
   * If `true`, it gets all the children of the `subjectId`. If `false`, it gets
   * all the subjects **except** the children of the `subjectId`.
   */
  getChildren?: boolean;
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
  subjectId,
  maxHeight,
  onRenderCell,
  getChildren,
  notifyNoChildren,
}: ListViewProps): JSX.Element {
  const { dict: subjects, order } = useSelector(
    (state: State) => state.subjects,
  );

  let children;
  if (getChildren) {
    children = getItems(subjects, subjects[subjectId].children.order, {
      parentId: subjectId,
    });
  } else {
    const childrenSet = new Set(subjects[subjectId].children.order);
    const condition = (i: Item): boolean =>
      !childrenSet.has(i.id) && i.id !== subjectId;
    children = getItems(subjects, order.order, {
      condition,
      parentId: subjectId,
    });
  }

  return (
    <FocusZone className={styles.list} style={{ maxHeight }}>
      {children.length === 0 && notifyNoChildren ? (
        <Text>
          There's nothing here{" "}
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

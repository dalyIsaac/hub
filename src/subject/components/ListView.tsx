import React from "react";
import { useSelector } from "react-redux";
import { FocusZone, List } from "office-ui-fabric-react";
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
}

const styles = mergeStyleSets({
  list: {
    overflow: "auto",
  },
});

export default function({
  subjectId,
  maxHeight,
  onRenderCell,
  getChildren,
}: ListViewProps): JSX.Element {
  const { dict: subjects, order } = useSelector(
    (state: State) => state.subjects,
  );

  let children;
  if (getChildren) {
    children = getItems(subjects, subjects[subjectId].children.order, {
      parent: subjectId,
    });
  } else {
    const childrenSet = new Set(subjects[subjectId].children.order);
    const condition = (i: Item) => !childrenSet.has(i.id) && i.id !== subjectId;
    children = getItems(subjects, order.order, {
      condition,
      parent: subjectId,
    });
  }

  return (
    <FocusZone className={styles.list} style={{ maxHeight }}>
      <List items={children} onRenderCell={onRenderCell} />
    </FocusZone>
  );
}

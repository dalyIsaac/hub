import React from "react";
import { useSelector } from "react-redux";
import { FocusZone, List } from "office-ui-fabric-react";
import { mergeStyleSets } from "@uifabric/styling";
import { State } from "../../Reducer";
import { ListViewItem } from "./ListItem/ListItem";

interface ListViewProps {
  id: string;
  maxHeight: number | string;
}

const styles = mergeStyleSets({
  list: {
    overflow: "auto",
  },
});

export default function({ id, maxHeight }: ListViewProps): JSX.Element {
  const subjects = useSelector((state: State) => state.subjects);

  const children = [];
  for (const childId of subjects[id].children) {
    children.push({ id: childId, subject: subjects[childId], parent: id });
  }

  return (
    <FocusZone className={styles.list} style={{ maxHeight }}>
      <List items={children} onRenderCell={ListViewItem} />
    </FocusZone>
  );
}

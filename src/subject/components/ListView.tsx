import React from "react";
import { useSelector } from "react-redux";
import { FocusZone, List } from "office-ui-fabric-react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { State } from "../../Reducer";
import { ListViewItem } from "./ListItem";

interface ListViewProps {
  id: string;
  height: number | string;
}

const theme = getTheme();
const border = "1px solid " + theme.palette.neutralTertiary;
const styles = mergeStyleSets({
  list: {
    overflow: "auto",
    borderTop: border,
    borderBottom: border,
  },
});

export default function({ id, height }: ListViewProps): JSX.Element {
  const subjects = useSelector((state: State) => state.subjects);

  const childIds = subjects[id].children;
  const children = [];
  for (const id of childIds) {
    children.push({ id, subject: subjects[id] });
  }

  return (
    <FocusZone className={styles.list} style={{ height }}>
      <List items={children} onRenderCell={ListViewItem} />
    </FocusZone>
  );
}

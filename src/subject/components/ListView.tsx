import React from "react";
import { useSelector } from "react-redux";
import { FocusZone, List } from "office-ui-fabric-react";
import { mergeStyleSets } from "@uifabric/styling";
import { State } from "../../Reducer";
import { Subject } from "../model/Subject";

interface ListViewProps {
  id: string;
  maxHeight: number | string;
  onRenderCell: (
    item?:
      | {
          id: string;
          subject: Subject<"BaseSubject">;
          parent: string;
        }
      | undefined,
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
  id,
  maxHeight,
  onRenderCell,
}: ListViewProps): JSX.Element {
  const subjects = useSelector((state: State) => state.subjects);

  const children = [];
  for (const childId of subjects[id].children) {
    children.push({ id: childId, subject: subjects[childId], parent: id });
  }

  return (
    <FocusZone className={styles.list} style={{ maxHeight }}>
      <List items={children} onRenderCell={onRenderCell} />
    </FocusZone>
  );
}

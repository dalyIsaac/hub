import { getTheme, mergeStyleSets } from "office-ui-fabric-react";

import React from "react";
import { State } from "../Reducer";
import SubjectComponent from "./Subject";
import { useSelector } from "react-redux";
import useWindowSize from "@rehooks/window-size";

export const MIN_COL_WIDTH = 400;

const theme = getTheme();
const styles = mergeStyleSets({
  content: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  sidebar: {
    border: "1px solid " + theme.palette.white,
    borderRadius: 4,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    minWidth: MIN_COL_WIDTH,
    zIndex: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
});

interface WrapperProps {
  commandBar?: JSX.Element;
  main: JSX.Element;
  parentId?: string;
  title?: JSX.Element;
}

export default function Wrapper({
  commandBar,
  main,
  parentId,
  title,
}: WrapperProps) {
  const { dict } = useSelector((state: State) => state.subjects);

  const sidebar = parentId ? (
    <div className={styles.sidebar}>
      <SubjectComponent item={{ id: parentId, subject: dict[parentId] }} />
    </div>
  ) : null;

  // 2 is for the border
  const width = parentId ? `calc(100% - ${MIN_COL_WIDTH + 2}px)` : "100%";

  const windowSize = useWindowSize();
  if (sidebar && windowSize.innerWidth < MIN_COL_WIDTH * 2) {
    return sidebar;
  }

  return (
    <div className={styles.wrapper}>
      {commandBar}
      <div className={styles.content}>
        <div className={styles.mainWrapper} style={{ width }}>
          {title}
          {main}
        </div>
        {sidebar}
      </div>
    </div>
  );
}

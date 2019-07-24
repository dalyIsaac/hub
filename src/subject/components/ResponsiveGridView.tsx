import React from "react";
import { RouteIdProps, getDisplay } from "../../Routing";
import GridView, { MIN_COL_WIDTH } from "./GridView";
import { isUndefined } from "lodash";
import useWindowSize from "@rehooks/window-size";
import { getTheme, mergeStyleSets } from "office-ui-fabric-react";
import SubjectComponent from "./Subject";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Redirect, RouteComponentProps } from "react-router";
import ListView from "./ListView";

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    display: "grid",
    gridTemplateColumns: `auto ${MIN_COL_WIDTH}px`,
  },
  sidebar: {
    gridColumn: "2",
    border: "1px solid " + theme.palette.white,
    borderRadius: 4,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
});

export default function ResponsiveGridView({
  match,
  location,
}: RouteComponentProps<RouteIdProps>): JSX.Element {
  const { id } = match.params;
  const display = getDisplay(location);

  const windowSize = useWindowSize();
  const { dict } = useSelector((state: State) => state.subjects);

  if (!isUndefined(id) && !(id in dict)) {
    return <Redirect to="/" />;
  }

  if (isUndefined(id)) {
    if (display === "list") {
      return <ListView />;
    } else {
      return <GridView />;
    }
  }

  const parentSubject = <SubjectComponent subject={dict[id]} id={id} />;
  if (windowSize.innerWidth > MIN_COL_WIDTH * 2) {
    const options = { parent: id };
    return (
      <div className={styles.wrapper}>
        {display === "grid" ? (
          <GridView options={options} />
        ) : (
          <ListView options={options} />
        )}
        <div className={styles.sidebar}>{parentSubject}</div>
      </div>
    );
  }

  return parentSubject;
}

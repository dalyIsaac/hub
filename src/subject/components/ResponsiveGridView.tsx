import React from "react";
import { SubjectsRouteProps, getDisplay } from "../../Routing";
import GridView, { MIN_COL_WIDTH } from "./GridView";
import { isUndefined } from "lodash";
import useWindowSize from "@rehooks/window-size";
import SubjectComponent from "./Subject";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Redirect, RouteComponentProps } from "react-router";
import ListView from "./ListView";
import ViewWithSidebar from "./ViewWithSidebar";

export default function ResponsiveGridView({
  match,
  location,
}: RouteComponentProps<SubjectsRouteProps>): JSX.Element {
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
      <ViewWithSidebar
        viewComponent={
          display === "grid" ? (
            <GridView options={options} />
          ) : (
            <ListView options={options} />
          )
        }
        sidebarComponent={parentSubject}
      />
    );
  }

  return parentSubject;
}

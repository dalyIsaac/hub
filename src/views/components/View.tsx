import React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ViewRouteProps } from "../Routing";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { isUndefined } from "lodash";
import GridView from "../../subject/components/GridView";
import ListView from "../../subject/components/ListView/ListView";
import { getDisplay } from "../../Display";

export default function View({
  match,
  location,
}: RouteComponentProps<ViewRouteProps>): JSX.Element {
  const { name } = match.params;
  const { views } = useSelector((state: State) => state);

  if (isUndefined(name) || !(name in views.dict)) {
    return <Redirect to="/" />;
  }

  const display = getDisplay(location);

  const options = { name };
  const viewComponent =
    display === "grid" ? (
      <GridView options={options} />
    ) : (
      <ListView options={options} />
    );

  return <div>{viewComponent}</div>;
}

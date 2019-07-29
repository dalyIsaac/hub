import React from "react";
import { RouteComponentProps } from "react-router";
import { ViewRouteProps } from "../Routing";

export default function View({
  match,
  location,
  history,
}: RouteComponentProps<ViewRouteProps>): JSX.Element {
  console.log(match);
  return <p>Hello View!</p>;
}

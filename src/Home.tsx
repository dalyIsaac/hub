import React from "react";
import { Redirect } from "react-router";
import { gridBaseURL } from "./Routes";

export default function Home(): JSX.Element {
  return <Redirect to={gridBaseURL} />;
}

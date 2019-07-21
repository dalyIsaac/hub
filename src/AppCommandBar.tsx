import React from "react";
import {
  getTheme,
  mergeStyleSets,
  CommandBarButton,
} from "office-ui-fabric-react";
import { RouteIdProps } from "./Routing";
import { useDispatch } from "react-redux";
import { createSubject } from "./subject/model/Create";

export const APP_COMMAND_BAR_HEIGHT = 45;

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export default function({ match }: RouteIdProps): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();

  const dispatchCreateChildSubject = () => {
    dispatch(createSubject({ parent: id }));
  };
  const dispatchCreateSubject = () => {
    dispatch(createSubject());
  };

  const createSubjectButton = id ? (
    <CommandBarButton
      text="Create child subject"
      iconProps={{ iconName: "Childof" }}
      ariaLabel="Create child subject"
      onClick={dispatchCreateChildSubject}
    />
  ) : (
    <CommandBarButton
      text="Create subject"
      iconProps={{ iconName: "Add" }}
      ariaLabel="Create subject"
      onClick={dispatchCreateSubject}
    />
  );

  return <div className={styles.wrapper}>{createSubjectButton}</div>;
}

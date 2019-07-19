import React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { RouteIdProps } from "./Routing";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { createSubject } from "./subject/model/Create";

export const APP_COMMAND_BAR_HEIGHT = 45;

const theme = getTheme();
const styles = mergeStyleSets({
  appCommandBar: {
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
});
const getCommandItems = (
  dispatch: Dispatch,
  id?: string,
): ICommandBarItemProps[] => {
  const items = [];

  if (id !== undefined) {
    items.push({
      key: "createChildSubject",
      name: "Create child subject",
      iconProps: {
        iconName: "Childof",
      },
      ariaLabel: "Create child subject",
      onClick: () => {
        dispatch(createSubject({ parent: id }));
      },
    });
  } else {
    items.push({
      key: "createSubject",
      name: "Create subject",
      iconProps: {
        iconName: "Add",
      },
      ariaLabel: "Create subject",
      onClick: () => {
        dispatch(createSubject());
      },
    });
  }

  return items;
};

export default function({ match }: RouteIdProps): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();

  return (
    <CommandBar
      items={getCommandItems(dispatch, id)}
      className={styles.appCommandBar}
    />
  );
}

import React, { useCallback } from "react";
import {
  getTheme,
  mergeStyleSets,
  CommandBarButton,
  Toggle,
} from "office-ui-fabric-react";
import { useDispatch, useSelector } from "react-redux";
import { createSubject } from "../subject/model/Create";
import { State } from "../Reducer";
import { setSeparateComplete } from "../subject/model/SetSeparateComplete";
import { BUTTON_HEIGHT } from "./Common";
import SortButton from "./SortButton";
import { RouteComponentProps } from "react-router";
import { SubjectsRouteProps, subjectBase } from "../subject/Routing";
import { getDisplay, updateDisplay } from "../Display";
import { SearchRouteProps, searchBase } from "../Search/Routing";
import { Paths } from "../Routing";

const theme = getTheme();
const styles = mergeStyleSets({
  leftWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  rightWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row-reverse",
  },
  wrapper: {
    alignItems: "center",
    backgroundColor: theme.palette.white,
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "row",
    height: BUTTON_HEIGHT,
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
    zIndex: 10,
  },
});

const commandBarStyles = { root: { height: BUTTON_HEIGHT } };

export default function AppCommandBar({
  match,
  location,
  history,
}: RouteComponentProps<SubjectsRouteProps & SearchRouteProps>): JSX.Element {
  const { parentId } = match.params;
  const dispatch = useDispatch();
  const display = getDisplay(location);

  const { dict, order: rootOrder, searchSortOptions } = useSelector(
    (state: State) => state.subjects,
  );

  const dispatchCreateChildSubject = useCallback((): void => {
    dispatch(createSubject({ parentId }));
  }, [dispatch, parentId]);

  const dispatchCreateSubject = useCallback((): void => {
    dispatch(createSubject());
  }, [dispatch]);

  const dispatchSetSeparateComplete = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { subjectId: parentId }));
    },
    [dispatch, parentId],
  );

  const dispatchSetSeparateCompleteSearch = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { setSearchOptions: true }));
    },
    [dispatch],
  );

  const toggleView = useCallback((): void => {
    history.push(updateDisplay(location, display === "grid" ? "list" : "grid"));
  }, [display, history, location]);

  const leftComponents: JSX.Element[] = [];
  const rightComponents: JSX.Element[] = [];

  if (match.path === Paths.subject || match.path === subjectBase) {
    const order =
      parentId && parentId in dict
        ? dict[parentId].children.options
        : rootOrder.options;

    const createSubjectButton = parentId ? (
      <CommandBarButton
        text="Create child subject"
        iconProps={{ iconName: "Childof" }}
        ariaLabel="Create child subject"
        onClick={dispatchCreateChildSubject}
        styles={commandBarStyles}
      />
    ) : (
      <CommandBarButton
        text="Create subject"
        iconProps={{ iconName: "Add" }}
        ariaLabel="Create subject"
        onClick={dispatchCreateSubject}
        styles={commandBarStyles}
      />
    );

    leftComponents.push(<div key="createSubject">{createSubjectButton}</div>);

    if (display === "grid") {
      leftComponents.push(
        <SortButton key="sort" subjectId={parentId} fields={order.fields} />,
      );
    }

    leftComponents.push(
      <Toggle
        key="separateComplete"
        checked={order.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateComplete}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />,
    );
  } else if (match.path === Paths.search || match.path === searchBase) {
    if (display === "grid") {
      leftComponents.push(
        <SortButton
          key="sort"
          setSearchOptions={true}
          fields={searchSortOptions.fields}
        />,
      );
    }

    leftComponents.push(
      <Toggle
        key="separateComplete"
        checked={searchSortOptions.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateCompleteSearch}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />,
    );
  }

  rightComponents.push(
    <CommandBarButton
      key="toggleView"
      ariaLabel="Toggle view"
      iconProps={{
        iconName: display === "list" ? "BulletedListText" : "GridViewMedium",
      }}
      text={display === "list" ? "List" : "Grid"}
      styles={{
        root: { background: theme.palette.white, height: BUTTON_HEIGHT },
      }}
      menuProps={{
        directionalHintFixed: true,
        items: [
          display === "list"
            ? {
                iconProps: { iconName: "GridViewMedium" },
                key: "gridButton",
                onClick: toggleView,
                text: "Grid",
              }
            : {
                iconProps: { iconName: "BulletedListText" },
                key: "listButton",
                onClick: toggleView,
                text: "List",
              },
        ],
      }}
    />,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>{leftComponents}</div>
      <div className={styles.rightWrapper}>{rightComponents}</div>
    </div>
  );
}

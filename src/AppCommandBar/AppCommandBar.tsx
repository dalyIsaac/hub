import React, { useCallback } from "react";
import {
  getTheme,
  mergeStyleSets,
  CommandBarButton,
  Toggle,
} from "office-ui-fabric-react";
import {
  SubjectsRouteProps,
  SearchRouteProps,
  Paths,
  subjectBase,
  searchBase,
  getDisplay,
  updateDisplay,
} from "../Routing";
import { useDispatch, useSelector } from "react-redux";
import { createSubject } from "../subject/model/Create";
import { State } from "../Reducer";
import { setSeparateComplete } from "../subject/model/SetSeparateComplete";
import { BUTTON_HEIGHT } from "./Common";
import SortButton from "./SortButton";
import { RouteComponentProps } from "react-router";

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
  },
});

export default function AppCommandBar({
  match,
  location,
  history,
}: RouteComponentProps<SubjectsRouteProps & SearchRouteProps>): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const display = getDisplay(location);

  const { dict, order: rootOrder, searchSortOptions } = useSelector(
    (state: State) => state.subjects,
  );

  const dispatchCreateChildSubject = useCallback((): void => {
    dispatch(createSubject({ parent: id }));
  }, [dispatch, id]);

  const dispatchCreateSubject = useCallback((): void => {
    dispatch(createSubject());
  }, [dispatch]);

  const dispatchSetSeparateComplete = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { subjectId: id }));
    },
    [dispatch, id],
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
      id && id in dict ? dict[id].children.options : rootOrder.options;

    const createSubjectButton = id ? (
      <CommandBarButton
        text="Create child subject"
        iconProps={{ iconName: "Childof" }}
        ariaLabel="Create child subject"
        onClick={dispatchCreateChildSubject}
        styles={{ root: { height: BUTTON_HEIGHT } }}
      />
    ) : (
      <CommandBarButton
        text="Create subject"
        iconProps={{ iconName: "Add" }}
        ariaLabel="Create subject"
        onClick={dispatchCreateSubject}
        styles={{ root: { height: BUTTON_HEIGHT } }}
      />
    );

    if (display === "grid") {
      leftComponents.push(<div key="createSubject">{createSubjectButton}</div>);
    }
    leftComponents.push(
      <SortButton key="sort" subjectId={id} fields={order.fields} />,
    );

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
    <Toggle
      key="toggleView"
      checked={display === "list"}
      offText="Grid view"
      onText="List view"
      onChange={toggleView}
      styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
    />,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>{leftComponents}</div>
      <div className={styles.rightWrapper}>{rightComponents}</div>
    </div>
  );
}

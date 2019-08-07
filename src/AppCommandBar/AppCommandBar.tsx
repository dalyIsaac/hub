import {
  CommandBarButton,
  Toggle,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  SearchRouteProps,
  getSearchMatch,
  searchBase,
} from "../Search/Routing";
import { SubjectsRouteProps, subjectBase } from "../subject/Routing";
import { getDisplay, updateDisplay } from "../Display";
import { useDispatch, useSelector } from "react-redux";

import AppendChildren from "../views/components/AppendChildren";
import { BUTTON_HEIGHT } from "./Common";
import { Paths } from "../Routing";
import { RouteComponentProps } from "react-router";
import SortButton from "./SortButton";
import { State } from "../Reducer";
import { ViewRouteProps } from "../views/Routing";
import { createSubject } from "../subject/model/Create";
import { setSeparateComplete } from "../subject/model/SetSeparateComplete";

const theme = getTheme();

export const commandBarStyle = {
  borderBottom: "1px solid " + theme.palette.neutralQuaternary,
  boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  height: BUTTON_HEIGHT,
  margin: 0,
  padding: 0,
  zIndex: 10
};

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
    ...commandBarStyle,
    alignItems: "center",
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
  },
});

const commandBarStyles = { root: { height: BUTTON_HEIGHT } };

type AppCommandbarProps = RouteComponentProps<
  SubjectsRouteProps & SearchRouteProps & ViewRouteProps
>;

export default function AppCommandBar({
  match,
  location,
  history,
}: AppCommandbarProps): JSX.Element {
  const { parentId, viewId } = match.params;
  const dispatch = useDispatch();
  const display = getDisplay(location);

  const { subjects, views } = useSelector((state: State) => state);

  //#region Append children panel
  const [appendChildrenPanelVisible, setAppendChildrenPanelVisible] = useState(
    false,
  );
  const showAppendChildrenPanel = useCallback((): void => {
    setAppendChildrenPanelVisible(true);
  }, []);
  const hideAppendChildrenPanel = useCallback((): void => {
    setAppendChildrenPanelVisible(false);
  }, []);
  //#endregion

  //#region Create child subject
  const dispatchCreateChildSubject = useCallback((): void => {
    dispatch(createSubject({ parentId, viewId }));
  }, [dispatch, parentId, viewId]);

  const dispatchCreateSubject = useCallback((): void => {
    dispatch(createSubject());
  }, [dispatch]);

  const dispatchSetSeparateComplete = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { subjectId: parentId }));
    },
    [dispatch, parentId],
  );
  //#endregion

  const dispatchSetSeparateCompleteSearch = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, { setSearchOptions: true }));
    },
    [dispatch],
  );

  const toggleView = useCallback((): void => {
    history.push(updateDisplay(location, display === "grid" ? "list" : "grid"));
  }, [display, history, location]);

  const subjectPath =
    match.path === Paths.subject || match.path === subjectBase;
  const searchPath = match.path === Paths.search || match.path === searchBase;
  const viewsPath = match.path === Paths.view && viewId;

  const leftComponents: JSX.Element[] = [];
  const rightComponents: JSX.Element[] = [];
  let panel: JSX.Element | null = null;

  if (subjectPath) {
    const currentOrder =
      parentId && parentId in subjects.dict
        ? subjects.dict[parentId].children.options
        : subjects.order.options;

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
        <SortButton
          key="sort"
          subjectId={parentId}
          fields={currentOrder.fields}
        />,
      );
    }

    leftComponents.push(
      <Toggle
        key="separateComplete"
        checked={currentOrder.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateComplete}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />,
    );
  } else if (searchPath) {
    if (display === "grid") {
      leftComponents.push(
        <SortButton
          key="sort"
          setSearchOptions={true}
          fields={subjects.searchSortOptions.fields}
        />,
      );
    }

    leftComponents.push(
      <Toggle
        key="separateComplete"
        checked={subjects.searchSortOptions.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateCompleteSearch}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />,
    );
  } else if (viewsPath) {
    leftComponents.push(
      <CommandBarButton
        key="appendChildren"
        text="Append child subjects"
        iconProps={{ iconName: "RowsChild" }}
        ariaLabel="Create child subject"
        onClick={showAppendChildrenPanel}
        styles={commandBarStyles}
      />,
      <CommandBarButton
        key="createSubjectForView"
        text="Create child subject"
        iconProps={{ iconName: "Childof" }}
        ariaLabel="Create child subject"
        onClick={dispatchCreateChildSubject}
        styles={commandBarStyles}
      />,
    );

    panel = (
      <AppendChildren
        hidePanel={hideAppendChildrenPanel}
        isOpen={appendChildrenPanelVisible}
        viewId={viewId}
      />
    );
  }

  // Responsive page title
  useEffect((): void => {
    let path: string | null = null;
    let titleChild: string | null = null;
    if (subjectPath) {
      path = "subjects";
      if (parentId) {
        titleChild = subjects.dict[parentId].name;
      }
    } else if (searchPath) {
      const [param, query] = getSearchMatch(match);
      path = "search/" + param;
      titleChild = query;
    } else if (viewsPath) {
      if (viewId) {
        path = "views";
        titleChild = views.dict[viewId].name;
      }
    }

    if (path) {
      if (titleChild) {
        document.title = `hub/${path}: ${titleChild}`;
      } else {
        document.title = `hub/${path}`;
      }
    } else {
      document.title = `hub`;
    }
  }, [
    subjectPath,
    parentId,
    subjects.dict,
    searchPath,
    match,
    viewsPath,
    viewId,
    views.dict,
  ]);

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
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.leftWrapper}>{leftComponents}</div>
        <div className={styles.rightWrapper}>{rightComponents}</div>
      </div>
      {panel}
    </React.Fragment>
  );
}

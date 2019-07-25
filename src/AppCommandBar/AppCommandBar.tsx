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
  wrapper: {
    alignItems: "center",
    backgroundColor: theme.palette.white,
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "row",
    height: BUTTON_HEIGHT,
    paddingLeft: 24,
  },
});

export default function AppCommandBar({
  match,
}: RouteComponentProps<SubjectsRouteProps & SearchRouteProps>): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { dict, order: rootOrder } = useSelector(
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
      dispatch(setSeparateComplete(checked!, id));
    },
    [dispatch, id],
  );

  const components = [];

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

    components.push(<div key="createSubject">{createSubjectButton}</div>);
    components.push(<SortButton key="sort" id={id} order={order} />);

    components.push(
      <Toggle
        key="separateComplete"
        checked={order.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateComplete}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />,
    );
  }

  return <div className={styles.wrapper}>{components}</div>;
}

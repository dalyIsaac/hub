import React, { useCallback, useState, useEffect } from "react";
import {
  Nav,
  getTheme,
  mergeStyleSets,
  INavLinkGroup,
  INavLink,
} from "office-ui-fabric-react";
import { useDispatch, useSelector } from "react-redux";
import { createView } from "../model/Create";
import { State } from "../../Reducer";
import { RouteComponentProps } from "react-router";
import { ViewRouteProps, gotoView } from "../Routing";
import { SubjectsRouteProps, subjectBase } from "../../subject/Routing";

const theme = getTheme();
const styles = mergeStyleSets({
  nav: {
    background: theme.palette.white,
    borderRight: "1px solid " + theme.palette.neutralQuaternary,
    boxSizing: "border-box",
    height: "100%",
    overflowY: "auto",
    width: 208,
  },
});

export default function ViewsNav({
  match,
  location,
  history,
}: RouteComponentProps<SubjectsRouteProps & ViewRouteProps>): JSX.Element {
  const dispatch = useDispatch();
  const [gotoNewView, setGotoNewView] = useState(false);
  const { views } = useSelector((state: State) => state);

  const dispatchCreateView = useCallback((): void => {
    dispatch(createView());
    setGotoNewView(true);
  }, [dispatch]);

  useEffect((): void => {
    if (gotoNewView) {
      setGotoNewView(false);
      history.push(gotoView(views.order[views.order.length - 1]));
    }
  }, [gotoNewView, history, views]);

  const viewGroup: INavLink = {
    isExpanded: true,
    key: "views",
    links: [],
    name: "Views",
    url: "",
  };

  for (const name of views.order) {
    viewGroup.links!.push({
      key: name,
      name,
      url: "#" + gotoView(name),
    });
  }

  const groups: INavLinkGroup[] = [
    {
      links: [
        {
          key: "allSubjects",
          name: "All subjects",
          url: "#" + subjectBase,
        },
        viewGroup,
        {
          icon: "Add",
          key: "createView",
          name: "Create view",
          onClick: dispatchCreateView,
          url: "",
        },
      ],
    },
  ];

  return (
    <Nav
      selectedKey="key3"
      expandButtonAriaLabel="Expand or collapse"
      className={styles.nav}
      groups={groups}
    />
  );
}

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
import { Paths } from "../../Routing";

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
  history,
}: RouteComponentProps<SubjectsRouteProps & ViewRouteProps>): JSX.Element {
  const dispatch = useDispatch();
  const [gotoNewView, setGotoNewView] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const { views } = useSelector((state: State) => state);

  const allSubjects = "allSubjects";

  useEffect((): void => {
    if (match.url === subjectBase) {
      setSelectedKey(allSubjects);
    } else if (match.path === Paths.view) {
      const { viewId } = match.params;
      if (!viewId || !(viewId in views.dict)) {
        history.push(Paths.base);
      } else {
        setSelectedKey(viewId);
      }
    } else {
      setSelectedKey("");
    }
  }, [match, history, views.dict]);

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

  for (const viewId of views.order) {
    const v = views.dict[viewId];
    viewGroup.links!.push({
      key: viewId,
      name: v.name,
      url: "#" + gotoView(viewId),
    });
  }

  const groups: INavLinkGroup[] = [
    {
      links: [
        {
          key: allSubjects,
          name: "All subjects",
          url: "#" + subjectBase,
        },
      ],
    },
  ];

  if (viewGroup.links!.length > 0) {
    groups[0].links.push(viewGroup);
  }

  groups[0].links.push({
    icon: "Add",
    key: "createView",
    name: "Create view",
    onClick: dispatchCreateView,
    url: "",
  });

  return (
    <Nav
      selectedKey={selectedKey}
      expandButtonAriaLabel="Expand or collapse"
      className={styles.nav}
      groups={groups}
    />
  );
}

import { AllParams, Paths } from "../../../Routing";
import {
  CommandBar,
  INavLink,
  INavLinkGroup,
  Nav,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RouteComponentProps } from "react-router";
import { State } from "../../../Reducer";
import { commandBarStyle } from "../../../AppCommandBar/AppCommandBar";
import { createView } from "../../model/CreateView";
import { gotoView } from "../../Routing";
import { subjectBase } from "../../../subject/Routing";
import { useGetCreateButtonItems } from "./UseGetCreateButtonItems";

export const viewsNavWidth = 208;

const theme = getTheme();
const styles = mergeStyleSets({
  navWrapper: {
    borderRight: "1px solid " + theme.palette.neutralQuaternary,
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    background: theme.palette.white,
    boxSizing: "border-box",
    height: "100%",
    overflowY: "auto",
    width: viewsNavWidth,
  },
});

export default function ViewsNav({
  match,
  history,
}: RouteComponentProps<AllParams>): JSX.Element {
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

  const items = useGetCreateButtonItems(match.params);

  return (
    <div className={styles.navWrapper}>
      <CommandBar items={items} styles={{ root: commandBarStyle }} />
      <Nav
        selectedKey={selectedKey}
        expandButtonAriaLabel="Expand or collapse"
        className={styles.nav}
        groups={groups}
        styles={{ navItems: { margin: 0 } }}
      />
    </div>
  );
}

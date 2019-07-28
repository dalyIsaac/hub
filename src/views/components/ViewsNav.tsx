import React, { useCallback } from "react";
import {
  Nav,
  getTheme,
  mergeStyleSets,
  INavLinkGroup,
} from "office-ui-fabric-react";
import { useDispatch } from "react-redux";
import { createView } from "../model/Create";

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

export default function ViewsNav(): JSX.Element {
  const dispatch = useDispatch();

  const dispatchCreateView = useCallback((): void => {
    dispatch(createView());
    // TODO: navigate to new view
  }, [dispatch]);

  const groups: INavLinkGroup[] = [
    {
      links: [
        {
          name: "Home",
          url: "http://example.com",
          links: [
            {
              name: "Activity",
              url: "http://msn.com",
              key: "key1",
              target: "_blank",
            },
            {
              name: "MSN",
              url: "http://msn.com",
              disabled: true,
              icon: "News",
              key: "key2",
              target: "_blank",
            },
          ],
          isExpanded: true,
        },
      ],
    },
  ];

  groups[0].links.push({
    icon: "Add",
    key: "createView",
    name: "Create view",
    onClick: dispatchCreateView,
    url: "",
  });

  return (
    <Nav
      selectedKey="key3"
      expandButtonAriaLabel="Expand or collapse"
      className={styles.nav}
      groups={groups}
    />
  );
}

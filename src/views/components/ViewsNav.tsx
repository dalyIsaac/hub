import React from "react";
import { Nav, getTheme, mergeStyleSets } from "office-ui-fabric-react";

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
  return (
    <Nav
      selectedKey="key3"
      expandButtonAriaLabel="Expand or collapse"
      className={styles.nav}
      groups={[
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
                  key: "key2",
                  target: "_blank",
                },
              ],
              isExpanded: true,
            },
            {
              name: "Documents",
              url: "http://example.com",
              key: "key3",
              isExpanded: true,
              target: "_blank",
            },
            {
              name: "Pages",
              url: "http://msn.com",
              key: "key4",
              target: "_blank",
            },
            {
              name: "Notebook",
              url: "http://msn.com",
              key: "key5",
              disabled: true,
            },
            {
              name: "Communication and Media",
              url: "http://msn.com",
              key: "key6",
              target: "_blank",
            },
            {
              name: "News",
              url: "http://cnn.com",
              icon: "News",
              key: "key7",
              target: "_blank",
            },
          ],
        },
      ]}
    />
  );
}

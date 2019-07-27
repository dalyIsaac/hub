import React, { useCallback } from "react";
import { SearchRouteProps, getDisplay, getSearchMatch } from "../Routing";
import { RouteComponentProps } from "react-router";
import { Item, Subject } from "../subject/model/Subject";
import ListView from "../subject/components/ListView/ListView";
import GridView from "../subject/components/GridView";
import { Text } from "office-ui-fabric-react";
import { options } from "./SearchBar";
import { useSelector } from "react-redux";
import { State } from "../Reducer";

const searchParams = new Set(
  options.reduce(
    (acc, curr): string[] => {
      acc.push(String(curr.key).toLowerCase());
      return acc;
    },
    [] as string[],
  ),
);

export default function SearchResults({
  match,
  location,
}: RouteComponentProps<SearchRouteProps>): JSX.Element {
  const display = getDisplay(location);
  const [param, query] = getSearchMatch(match);
  const { dict, searchSortOptions } = useSelector(
    (state: State) => state.subjects,
  );

  const condition = useCallback(
    (i: Item): boolean => {
      const subject = i.subject;
      switch (param) {
        case "childname": {
          for (const childId of subject.children.order) {
            const child = dict[childId];
            if (child.name.toLowerCase().includes(query)) {
              return true;
            }
          }
          return false;
        }
        case "childdescription": {
          for (const childId of subject.children.order) {
            const child = dict[childId];
            if (child.description.toLowerCase().includes(query)) {
              return true;
            }
          }
          return false;
        }
        default: {
          return (i.subject[param as keyof Subject] as string)
            .toLowerCase()
            .includes(query);
        }
      }
    },
    [dict, param, query],
  );

  if (!searchParams.has(param)) {
    return <Text>Sorry that search parameter was invalid.</Text>;
  }

  if (display === "list") {
    return <ListView options={{ condition }} sortOptions={searchSortOptions} />;
  } else {
    return <GridView options={{ condition }} sortOptions={searchSortOptions} />;
  }
}

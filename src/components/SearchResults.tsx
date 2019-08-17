import React, { useCallback } from "react";
import { SearchRouteProps, getSearchMatch } from "../model/Search/Routing";
import { RouteComponentProps } from "react-router";
import { Item, Subject } from "../model/Subject";
import ListView from "./ListView";
import GridView from "./GridView";
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
}: RouteComponentProps<SearchRouteProps>): JSX.Element {
  const [param, query] = getSearchMatch(match);
  const {
    display: { display },
    subjects: { dict, searchSortOptions },
  } = useSelector((state: State) => state);

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

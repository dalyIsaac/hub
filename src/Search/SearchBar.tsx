import React, { useCallback, useState, useEffect } from "react";
import {
  IDropdownOption,
  Dropdown,
  SearchBox,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { RouteComponentProps } from "react-router";
import { gotoSearch, SearchRouteProps, getSearchMatch } from "./Routing";
import { Subject } from "../subject/model/Subject";

const styles = mergeStyleSets({
  search: {
    display: "flex",
    flexDirection: "row",
    // width: "calc(100vw / 3)",
  },
  searchBox: {
    flexGrow: 1,
  },
  searchDropdown: {
    width: 150,
  },
});

export const options: IDropdownOption[] = [
  { key: "name", text: "Name" },
  { key: "description", text: "Description" },
  { key: "childname", text: "Child name" },
  { key: "childdescription", text: "Child description" },
];

export default function SearchBar({
  history,
  match,
}: RouteComponentProps<SearchRouteProps>): JSX.Element {
  const [param, setParam] = useState("name");
  const [query, setQuery] = useState("");

  useEffect((): void => {
    try {
      const [param, query] = getSearchMatch(match);
      setParam(param);
      setQuery(query);
    } catch (error) {
      setParam("name");
      setQuery("");
    }
  }, [match]);

  const updateParam = useCallback((e: any, option?: IDropdownOption): void => {
    const key = option ? option.key : undefined;
    if (typeof key === "string") {
      setParam(key);
    }
  }, []);

  const onSearch = useCallback(
    (query: any): void => {
      history.push(gotoSearch(param as keyof Subject, query));
    },
    [history, param],
  );

  return (
    <div className={styles.search}>
      <Dropdown
        options={options}
        selectedKey={param}
        className={styles.searchDropdown}
        onChange={updateParam}
      />
      <SearchBox
        className={styles.searchBox}
        value={query}
        placeholder="Search"
        onSearch={onSearch}
      />
    </div>
  );
}

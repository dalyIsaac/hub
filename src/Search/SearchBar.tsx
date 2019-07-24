import React, { useCallback, useState, useEffect } from "react";
import {
  IDropdownOption,
  Dropdown,
  SearchBox,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { withRouter, RouteComponentProps } from "react-router";
import { gotoSearch, SearchRouteProps, getSearchLocation } from "../Routing";
import { Subject } from "../subject/model/Subject";

const styles = mergeStyleSets({
  searchDropdown: {
    width: 150,
  },
  title: {
    paddingLeft: 24,
  },
});

export const options: IDropdownOption[] = [
  { key: "name", text: "Name" },
  { key: "description", text: "Description" },
  { key: "childName", text: "Child name" },
  { key: "childDescription", text: "Child description" },
];

function SearchBar({
  history,
  location,
}: RouteComponentProps<SearchRouteProps>): JSX.Element {
  const [param, setParam] = useState("name");
  const [query, setQuery] = useState("");

  useEffect((): void => {
    try {
      const [param, query] = getSearchLocation(location);
      setParam(param);
      setQuery(query);
    } catch (error) {
      setParam("name");
      setQuery("");
    }
  }, [location]);

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
    <React.Fragment>
      <Dropdown
        options={options}
        selectedKey={param}
        className={styles.searchDropdown}
        onChange={updateParam}
      />
      <SearchBox value={query} placeholder="Search" onSearch={onSearch} />
    </React.Fragment>
  );
}

export default withRouter(SearchBar);

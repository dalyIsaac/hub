import React, { useCallback, useState } from "react";
import {
  IDropdownOption,
  Dropdown,
  SearchBox,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { withRouter, RouteComponentProps } from "react-router";
import { gotoSearch } from "../Routing";
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

function SearchBar({ history }: RouteComponentProps): JSX.Element {
  const [param, setParam] = useState("name");

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
        defaultSelectedKey={param}
        className={styles.searchDropdown}
        onChange={updateParam}
      />
      <SearchBox placeholder="Search" onSearch={onSearch} />
    </React.Fragment>
  );
}

export default withRouter(SearchBar);

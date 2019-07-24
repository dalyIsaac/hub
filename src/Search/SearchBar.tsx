import React, { useState, useRef, useCallback } from "react";
import {
  IDropdownOption,
  Dropdown,
  SearchBox,
  Callout,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import { DirectionalHint } from "office-ui-fabric-react/lib/components/Callout";
import { useSelector } from "react-redux";
import { State } from "../Reducer";
import ListView from "../subject/components/ListView";

const theme = getTheme();
const styles = mergeStyleSets({
  searchDropdown: {
    width: 150,
  },
  title: {
    paddingLeft: 24,
  },
});

export default function SearchBar(): JSX.Element {
  const [resultsVisible, setResultsVisible] = useState(false);
  const target = useRef(null);

  const { dict } = useSelector((state: State) => state.subjects);

  const onSearch = useCallback((newValue: any): void => {
    setResultsVisible(true);
  }, []);
  const dismissResults = useCallback((): void => setResultsVisible(false), []);

  const options: IDropdownOption[] = [
    { key: "name", text: "Name" },
    { key: "description", text: "Description" },
    { key: "childName", text: "Child name" },
    { key: "childDescription", text: "Child description" },
  ];

  return (
    <React.Fragment>
      <Dropdown
        options={options}
        defaultSelectedKey="name"
        className={styles.searchDropdown}
      />
      <div ref={target}>
        <SearchBox placeholder="Search" onSearch={onSearch} />
      </div>
      <Callout
        hidden={!resultsVisible}
        isBeakVisible={false}
        target={target}
        onDismiss={dismissResults}
        directionalHint={DirectionalHint.bottomCenter}
      >
        <ListView />
      </Callout>
    </React.Fragment>
  );
}

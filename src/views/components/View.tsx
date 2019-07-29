import React, { useCallback, useState } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ViewRouteProps } from "../Routing";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { isUndefined } from "lodash";
import GridView from "../../subject/components/GridView";
import ListView from "../../subject/components/ListView/ListView";
import { getDisplay } from "../../Display";
import { mergeStyleSets } from "@uifabric/styling";
import TitleInput from "../../TitleInput";

const styles = mergeStyleSets({
  title: {
    padding: 10,
  },
  wrapper: {
    display: "flex",
    height: "100%",
    padding: 5,
    width: "100%",
  },
});

export default function View({
  match,
  location,
}: RouteComponentProps<ViewRouteProps>): JSX.Element {
  const { name } = match.params;
  const { views } = useSelector((state: State) => state);
  const [localName, setLocalName] = useState(name || "");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLocalName(e.target.value);
    },
    [],
  );

  const updateName = useCallback((): void => {
    // TODO
  }, []);

  if (isUndefined(name) || !(name in views.dict)) {
    return <Redirect to="/" />;
  }

  const display = getDisplay(location);

  const options = { name };
  const viewComponent =
    display === "grid" ? (
      <GridView options={options} />
    ) : (
      <ListView options={options} />
    );

  return (
    <div className={styles.wrapper}>
      <TitleInput
        className={styles.title}
        value={localName}
        onChange={onChange}
        onBlur={updateName}
      />
      {viewComponent}
    </div>
  );
}

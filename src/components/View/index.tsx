import React, { useCallback, useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import GridView from "../GridView";
import ListView from "../ListView";
import { Location } from "history";
import { Paths } from "../../Routing";
import { State } from "../../Reducer";
import TitleInput from "../TitleInput";
import { ViewRouteProps } from "../../model/Views/Routing";
import { isUndefined } from "lodash";
import { mergeStyleSets } from "@uifabric/styling";
import { setViewName } from "../../model/Views/SetViewName";

const styles = mergeStyleSets({
  title: {
    marginTop: 10,
    padding: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});

interface ViewProps {
  location: Location;
  viewId: string;
}

function ViewComponent({ viewId }: ViewProps): JSX.Element {
  const {
    display: { display },
    views,
  } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const view =
    viewId && viewId in views.dict ? views.dict[viewId] : { name: "" };

  const [localName, setLocalName] = useState(view.name);
  const updateName = useCallback((): void => {
    if (viewId) {
      dispatch(setViewName(viewId, localName));
    }
  }, [viewId, dispatch, localName]);
  useEffect((): void => {
    setLocalName(view.name);
  }, [view.name]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setLocalName(e.target.value);
    },
    [],
  );

  const options = { viewId };
  const title = (
    <TitleInput
      className={styles.title}
      value={localName}
      onChange={onChange}
      onBlur={updateName}
    />
  );
  const viewComponent =
    display === "grid" ? (
      <GridView options={options} showCloseButton={true} title={title} />
    ) : (
      <ListView options={options} showCloseButton={true} title={title} />
    );

  return <div className={styles.wrapper}>{viewComponent}</div>;
}

export default function View({
  match,
  location,
}: RouteComponentProps<ViewRouteProps>): JSX.Element {
  const { views } = useSelector((state: State) => state);
  const { viewId } = match.params;

  if (isUndefined(viewId) || !(viewId in views.dict)) {
    return <Redirect to={Paths.base} />;
  }
  return <ViewComponent viewId={viewId} location={location} />;
}

import React, { useState, useRef } from "react";
import {
  getTheme,
  mergeStyleSets,
  CommandBarButton,
  Callout,
  DirectionalHint,
} from "office-ui-fabric-react";
import { RouteIdProps } from "./Routing";
import { useDispatch } from "react-redux";
import { createSubject } from "./subject/model/Create";

export const APP_COMMAND_BAR_HEIGHT = 45;
const BUTTON_HEIGHT = 44;

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "row",
    height: BUTTON_HEIGHT,
    backgroundColor: theme.palette.white,
    paddingLeft: 24,
  },
});

export default function({ match }: RouteIdProps): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const target = useRef(null);
  const [calloutVisible, setShowCallout] = useState(false);

  const dismissCallout = () => setShowCallout(false);
  const openCallout = () => setShowCallout(true);

  const dispatchCreateChildSubject = () => {
    dispatch(createSubject({ parent: id }));
  };
  const dispatchCreateSubject = () => {
    dispatch(createSubject());
  };

  const createSubjectButton = id ? (
    <CommandBarButton
      text="Create child subject"
      iconProps={{ iconName: "Childof" }}
      ariaLabel="Create child subject"
      onClick={dispatchCreateChildSubject}
    />
  ) : (
    <CommandBarButton
      text="Create subject"
      iconProps={{ iconName: "Add" }}
      ariaLabel="Create subject"
      onClick={dispatchCreateSubject}
    />
  );

  return (
    <div className={styles.wrapper}>
      {createSubjectButton}
      <div ref={target}>
        <CommandBarButton
          text="Sort"
          iconProps={{ iconName: "Sortlines" }}
          ariaLabel="Sort"
          onClick={openCallout}
          styles={{ root: { height: 44 } }}
        />
      </div>
      <Callout
        target={target.current}
        onDismiss={dismissCallout}
        hidden={!calloutVisible}
        directionalHint={DirectionalHint.bottomCenter}
        isBeakVisible={false}
      >
        <div>Hello world</div>
      </Callout>
    </div>
  );
}

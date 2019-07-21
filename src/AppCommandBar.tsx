import React, { useState, useRef } from "react";
import {
  getTheme,
  mergeStyleSets,
  CommandBarButton,
  Callout,
  DirectionalHint,
  DetailsList,
  IColumn,
  Toggle,
  Selection,
  SelectionMode,
  IDragDropEvents,
  IDragDropContext,
} from "office-ui-fabric-react";
import { RouteIdProps } from "./Routing";
import { useDispatch, useSelector } from "react-redux";
import { createSubject } from "./subject/model/Create";
import { State } from "./Reducer";
import { SortField } from "./subject/model/Order";
import { setFieldsArray } from "./subject/model/SetFieldsArray";
import { setFieldsDesc } from "./subject/model/SetFieldsDesc";

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
  dragEnterClass: {
    backgroundColor: theme.palette.neutralLight,
  },
});

export default function({ match }: RouteIdProps): JSX.Element {
  const { id } = match.params;
  const dispatch = useDispatch();
  const target = useRef(null);
  const [calloutVisible, setShowCallout] = useState(false);
  const { dict, order: rootOrder } = useSelector(
    (state: State) => state.subjects,
  );
  const draggedIndex = useRef(-1);
  const draggedItem = useRef(null);
  const selection = useRef(new Selection());

  const order =
    id && id in dict ? dict[id].children.options : rootOrder.options;

  const dismissCallout = () => setShowCallout(false);
  const openCallout = () => setShowCallout(true);

  const dispatchCreateChildSubject = () => {
    dispatch(createSubject({ parent: id }));
  };
  const dispatchCreateSubject = () => {
    dispatch(createSubject());
  };
  const dispatchSetFieldsDesc = (e: any, checked: boolean, key: string) => {
    dispatch(setFieldsDesc(key, checked, id));
  };

  const insertBeforeItem = (item: any) => {
    const draggedItems = selection.current.isIndexSelected(draggedIndex.current)
      ? (selection.current.getSelection() as SortField[])
      : [draggedItem.current!];

    const items = order.fields.filter(
      (itm) => draggedItems.indexOf(itm) === -1,
    );
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);
    dispatch(setFieldsArray(items, id));
  };

  const dragDropEvents: IDragDropEvents = {
    canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) =>
      true,
    canDrag: (item?: any) => true,
    onDragEnter: (item?: any, event?: DragEvent) => {
      // return string is the css classes that will be added to the entering element.
      return styles.dragEnterClass;
    },
    onDragLeave: (item?: any, event?: DragEvent) => {
      return;
    },
    onDrop: (item?: any, event?: DragEvent) => {
      if (draggedItem.current) {
        insertBeforeItem(item);
      }
    },
    onDragStart: (
      item?: any,
      itemIndex?: number,
      selectedItems?: any[],
      event?: MouseEvent,
    ) => {
      draggedItem.current = item;
      draggedIndex.current = itemIndex!;
    },
    onDragEnd: (item?: any, event?: DragEvent) => {
      draggedItem.current = null;
      draggedIndex.current = -1;
    },
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

  const sortColumns: IColumn[] = [
    {
      key: "param",
      name: "Parameter",
      fieldName: "name",
      minWidth: 150,
    },
    {
      key: "direction",
      name: "Direction",
      fieldName: "desc",
      minWidth: 150,
      onRender: (item: SortField) => {
        return (
          <Toggle
            key={item.key}
            defaultChecked={item.desc}
            offText="Ascending"
            onText="Descending"
            onChange={(e, checked) =>
              dispatchSetFieldsDesc(e, checked!, item.key)
            }
          />
        );
      },
    },
  ];

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
        <div onBlur={dismissCallout}>
          <DetailsList
            selection={selection.current}
            columns={sortColumns}
            items={order.fields}
            selectionMode={SelectionMode.none}
            dragDropEvents={dragDropEvents}
          />
        </div>
      </Callout>
    </div>
  );
}

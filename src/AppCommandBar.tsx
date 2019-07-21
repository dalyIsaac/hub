import React, { useState, useRef, useCallback } from "react";
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
import { setSeparateComplete } from "./subject/model/SetSeparateComplete";

export const APP_COMMAND_BAR_HEIGHT = 45;
const BUTTON_HEIGHT = 44;

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    alignItems: "center",
    backgroundColor: theme.palette.white,
    borderBottom: "1px solid " + theme.palette.neutralQuaternary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "row",
    height: BUTTON_HEIGHT,
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

  const order =
    id && id in dict ? dict[id].children.options : rootOrder.options;

  const draggedIndex = useRef(-1);
  const draggedItem = useRef(null);
  const selection = useRef(new Selection());

  const dismissCallout = useCallback((): void => {
    setShowCallout(false);
  }, []);
  const openCallout = useCallback((): void => {
    setShowCallout(true);
  }, []);

  const dispatchCreateChildSubject = useCallback((): void => {
    dispatch(createSubject({ parent: id }));
  }, [dispatch, id]);

  const dispatchCreateSubject = useCallback((): void => {
    dispatch(createSubject());
  }, [dispatch]);

  const dispatchSetFieldsDesc = useCallback(
    (e: any, checked: boolean, key: string): void => {
      dispatch(setFieldsDesc(key, checked, id));
    },
    [dispatch, id],
  );

  const dispatchSetSeparateComplete = useCallback(
    (e: any, checked?: boolean): void => {
      dispatch(setSeparateComplete(checked!, id));
    },
    [dispatch, id],
  );

  const insertBeforeItem = useCallback(
    (item: any): void => {
      const draggedItems = selection.current.isIndexSelected(
        draggedIndex.current,
      )
        ? (selection.current.getSelection() as SortField[])
        : [draggedItem.current!];

      const items = order.fields.filter(
        (itm): boolean => draggedItems.indexOf(itm) === -1,
      );
      let insertIndex = items.indexOf(item);

      // if dragging/dropping on itself, index will be 0.
      if (insertIndex === -1) {
        insertIndex = 0;
      }

      items.splice(insertIndex, 0, ...draggedItems);
      dispatch(setFieldsArray(items, id));
    },
    [dispatch, order, id],
  );

  const canDrop = useCallback(
    (
      _dropContext?: IDragDropContext,
      _dragContext?: IDragDropContext,
    ): boolean => true,
    [],
  );

  const canDrag = useCallback((_item?: any): boolean => true, []);

  const onDragEnter = useCallback((_item?: any, _event?: DragEvent): string => {
    return styles.dragEnterClass;
  }, []);

  const onDragLeave = useCallback((_item?: any, _event?: DragEvent): void => {
    return;
  }, []);

  const onDrop = useCallback(
    (item?: any, _event?: DragEvent): void => {
      if (draggedItem.current) {
        insertBeforeItem(item);
      }
    },
    [insertBeforeItem],
  );

  const onDragStart = useCallback(
    (
      item?: any,
      itemIndex?: number,
      _selectedItems?: any[],
      _event?: MouseEvent,
    ): void => {
      draggedItem.current = item;
      draggedIndex.current = itemIndex!;
    },
    [],
  );

  const onDragEnd = useCallback((_item?: any, _event?: DragEvent): void => {
    draggedItem.current = null;
    draggedIndex.current = -1;
  }, []);

  const dragDropEvents: IDragDropEvents = {
    canDrop,
    canDrag,
    onDragEnter,
    onDragLeave,
    onDrop,
    onDragStart,
    onDragEnd,
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

  const onRenderDirection = useCallback(
    (item: SortField): JSX.Element => (
      <Toggle
        key={item.key}
        defaultChecked={item.desc}
        offText="Ascending"
        onText="Descending"
        onChange={(e, checked) => dispatchSetFieldsDesc(e, checked!, item.key)}
      />
    ),

    [dispatchSetFieldsDesc],
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
      onRender: onRenderDirection,
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
          styles={{ root: { height: BUTTON_HEIGHT } }}
        />
      </div>
      <Toggle
        checked={order.separateCompletedItems}
        offText={"Don't separate completed items"}
        onText={"Separate completed items"}
        onChange={dispatchSetSeparateComplete}
        styles={{ root: { marginBottom: 0, marginLeft: 4, marginRight: 4 } }}
      />
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

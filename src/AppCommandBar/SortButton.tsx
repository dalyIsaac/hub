import React, { useCallback, useRef, useState } from "react";
import {
  Callout,
  DetailsList,
  DirectionalHint,
  IDragDropEvents,
  IDragDropContext,
  Selection,
  SelectionMode,
  IColumn,
  Toggle,
  mergeStyleSets,
  getTheme,
  CommandBarButton,
  Icon,
  Text,
} from "office-ui-fabric-react";
import { SortField, SetSortParameters } from "../subject/model/Order";
import { useDispatch } from "react-redux";
import { setFieldsArray } from "../subject/model/SetFieldsArray";
import { setFieldsDesc } from "../subject/model/SetFieldsDesc";
import { BUTTON_HEIGHT } from "./Common";

interface SortCalloutProps extends SetSortParameters {
  fields: SortField[];
}

const theme = getTheme();
const styles = mergeStyleSets({
  dragEnterClass: {
    backgroundColor: theme.palette.neutralLight,
  },
  gripperWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    justifyContent: "center",
    width: "100%",
    selectors: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: "100%",
    paddingLeft: 2,
    width: "100%",
  },
});

export default function SortButton({
  subjectId,
  setSearchOptions,
  fields,
}: SortCalloutProps): JSX.Element {
  const draggedIndex = useRef(-1);
  const draggedItem = useRef(null);
  const selection = useRef(new Selection());
  const target = useRef(null);

  const [calloutVisible, setShowCallout] = useState(false);

  const dismissCallout = useCallback((): void => {
    setShowCallout(false);
  }, []);
  const openCallout = useCallback((): void => {
    setShowCallout(true);
  }, []);

  const dispatch = useDispatch();

  const insertBeforeItem = useCallback(
    (item: any): void => {
      const draggedItems = selection.current.isIndexSelected(
        draggedIndex.current,
      )
        ? (selection.current.getSelection() as SortField[])
        : [draggedItem.current!];

      const items = fields.filter(
        (itm): boolean => draggedItems.indexOf(itm) === -1,
      );
      let insertIndex = items.indexOf(item);

      // if dragging/dropping on itself, index will be 0.
      if (insertIndex === -1) {
        insertIndex = 0;
      }

      items.splice(insertIndex, 0, ...draggedItems);
      dispatch(setFieldsArray(items, { setSearchOptions, subjectId }));
    },
    [dispatch, fields, subjectId, setSearchOptions],
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
    canDrag,
    canDrop,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragStart,
    onDrop,
  };

  const dispatchSetFieldsDesc = useCallback(
    (e: any, checked: boolean, key: string): void => {
      dispatch(setFieldsDesc(key, checked, { setSearchOptions, subjectId }));
    },
    [dispatch, subjectId, setSearchOptions],
  );

  const onRenderGripper = useCallback(
    (): JSX.Element => (
      <div className={styles.gripperWrapper}>
        <Icon iconName="GripperBarHorizontal" />
      </div>
    ),
    [],
  );

  const onRenderName = useCallback(
    (item: SortField): JSX.Element => (
      <div className={styles.wrapper}>
        <Text>{item.name}</Text>
      </div>
    ),
    [],
  );

  const onRenderDirection = useCallback(
    (item: SortField): JSX.Element => (
      <div className={styles.wrapper}>
        <Toggle
          styles={{ root: { margin: 0 } }}
          key={item.key}
          defaultChecked={item.desc}
          offText="Ascending"
          onText="Descending"
          onChange={(e, checked) =>
            dispatchSetFieldsDesc(e, checked!, item.key)
          }
        />
      </div>
    ),
    [dispatchSetFieldsDesc],
  );

  const sortColumns: IColumn[] = [
    {
      key: "gripper",
      minWidth: 20,
      name: "",
      onRender: onRenderGripper,
    },
    {
      fieldName: "name",
      key: "param",
      minWidth: 150,
      name: "Parameter",
      onRender: onRenderName,
    },
    {
      fieldName: "desc",
      key: "direction",
      minWidth: 150,
      name: "Direction",
      onRender: onRenderDirection,
    },
  ];

  return (
    <React.Fragment>
      <div ref={target}>
        <CommandBarButton
          text="Sort"
          iconProps={{ iconName: "Sortlines" }}
          ariaLabel="Sort"
          onClick={openCallout}
          styles={{ root: { height: BUTTON_HEIGHT } }}
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
            items={fields}
            selectionMode={SelectionMode.none}
            dragDropEvents={dragDropEvents}
          />
        </div>
      </Callout>
    </React.Fragment>
  );
}

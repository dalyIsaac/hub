import React, { useCallback } from "react";
import {
  IColumn,
  DetailsList,
  SelectionMode,
  mergeStyleSets,
  getTheme,
  IconButton,
} from "office-ui-fabric-react";
import { Subject, GetItemsOptions, getItems, Item } from "../model/Subject";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../Reducer";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar/Common";
import { APPBAR_HEIGHT } from "../../Common";
import {
  SortItemsOptions,
  sortItems,
  SortField,
  SortFieldKey,
  SetSortParameters,
} from "../model/Order";
import { gotoSubject } from "../../Routing";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { setFieldsArray } from "../model/SetFieldsArray";
import { setFieldsDesc } from "../model/SetFieldsDesc";

const theme = getTheme();
const styles = mergeStyleSets({
  detailsList: {
    height: `calc(100vh - ${APPBAR_HEIGHT}px - ${APP_COMMAND_BAR_HEIGHT}px)`,
  },
  openButton: {
    selectors: {
      "&:active": {
        filter: "brightness(80%)",
        outline: "none",
      },
      "&:hover": {
        filter: "brightness(90%)",
        outline: "none",
      },
    },
  },
});

interface ListViewProps {
  options?: GetItemsOptions;
  sortOptions?: SortItemsOptions;
}

function ListView({
  history,
  options,
  sortOptions,
}: ListViewProps & RouteComponentProps): JSX.Element {
  const { subjects } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const id = options ? options.parent : undefined;

  let componentOrder: string[];
  let sortFields: SortField[];
  let reorderParams: SetSortParameters;

  if (sortOptions) {
    componentOrder = sortItems(subjects.dict, {
      ...subjects.order,
      options: sortOptions,
    });
    sortFields = sortOptions.fields;
    reorderParams = { setSearchOptions: true };
  } else if (id) {
    componentOrder = subjects.dict[id].children.order;
    sortFields = subjects.dict[id].children.options.fields;
    reorderParams = { subjectId: id };
  } else {
    componentOrder = subjects.order.order;
    sortFields = subjects.order.options.fields;
    reorderParams = {};
  }

  const dispatchSetFieldsDesc = useCallback(
    (e?: any, column?: IColumn): void => {
      if (column!.key !== "openButton") {
        dispatch(
          setFieldsDesc(
            column!.key,
            !column!.isSortedDescending,
            reorderParams,
          ),
        );
      }
    },
    [dispatch, reorderParams],
  );

  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
    [],
  );

  const renderChildren = useCallback(
    (item: Item): string => item.subject.children.order.length.toLocaleString(),
    [],
  );

  const renderDate = useCallback(
    (item: Item, _index?: number, column?: IColumn): string => {
      const date = item.subject[column!.key as keyof Subject] as Date;
      return date ? date.toLocaleString() : "";
    },
    [],
  );

  const renderOpenButton = useCallback((item: Item): JSX.Element => {
    const openLabel = "Open " + item.subject.name;
    return (
      <Link to={gotoSubject("list", item.id)}>
        <IconButton
          primary
          styles={{ root: { width: "" } }}
          className={styles.openButton}
          iconProps={{ iconName: "OpenFile" }}
          title={openLabel}
          ariaLabel={openLabel}
        />
      </Link>
    );
  }, []);

  const invoke = useCallback(
    (item: Item): void => {
      history.push(gotoSubject("list", item.id));
    },
    [history],
  );

  const columnsDict: Partial<{ [key in SortFieldKey]: IColumn }> = {
    children: {
      key: "children",
      minWidth: 150,
      name: "Number of children",
      onRender: renderChildren,
    },
    completed: {
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
    created: {
      key: "created",
      minWidth: 150,
      name: "Date created",
      onRender: renderDate,
    },
    description: {
      key: "description",
      minWidth: 150,
      name: "Description",
      onRender: renderSubjectString,
    },
    dueDate: {
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    name: {
      key: "name",
      minWidth: 150,
      name: "Name",
      onRender: renderSubjectString,
    },
  };

  const reorder = useCallback(
    (draggedIndex: number, targetIndex: number): void => {
      const dragged = sortFields[draggedIndex];
      const fields = sortFields.filter((_, index) => index !== draggedIndex);
      fields.splice(targetIndex, 0, dragged);
      dispatch(setFieldsArray(fields, reorderParams));
    },
    [sortFields, dispatch, reorderParams],
  );

  const items = getItems(subjects.dict, componentOrder, options);
  const columns: IColumn[] = [];
  for (const field of sortFields) {
    const current = columnsDict[field.key];
    if (current) {
      current.isSorted = true;
      current.isSortedDescending = field.desc;
      columns.push(current);
    }
  }

  columns.push({
    key: "openButton",
    minWidth: 24,
    name: "",
    onRender: renderOpenButton,
  });

  return (
    <DetailsList
      onColumnHeaderClick={dispatchSetFieldsDesc}
      className={styles.detailsList}
      columns={columns}
      items={items}
      isHeaderVisible={true}
      selectionMode={SelectionMode.none}
      onItemInvoked={invoke}
      columnReorderOptions={{
        frozenColumnCountFromEnd: 1,
        frozenColumnCountFromStart: 0,
        handleColumnReorder: reorder,
      }}
    />
  );
}

export default withRouter(ListView);

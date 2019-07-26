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
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar/Common";
import { APPBAR_HEIGHT } from "../../Common";
import {
  SortItemsOptions,
  sortItems,
  SortField,
  SortFieldKey,
} from "../model/Order";
import { gotoSubject } from "../../Routing";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

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
  const id = options ? options.parent : undefined;

  const renderSubjectString = useCallback(
    (item: Item, _index?: number, column?: IColumn): string =>
      item.subject[column!.key as keyof Subject] as string,
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
    name: {
      key: "name",
      minWidth: 150,
      name: "Name",
      onRender: renderSubjectString,
    },
    description: {
      key: "description",
      minWidth: 150,
      name: "Description",
      onRender: renderSubjectString,
    },
    created: {
      key: "created",
      minWidth: 150,
      name: "Date created",
      onRender: renderDate,
    },
    dueDate: {
      key: "dueDate",
      minWidth: 150,
      name: "Due date",
      onRender: renderDate,
    },
    completed: {
      key: "completed",
      minWidth: 150,
      name: "Completed",
      onRender: renderDate,
    },
  };

  const { subjects } = useSelector((state: State) => state);

  let componentOrder;
  let sortFields;

  if (sortOptions) {
    componentOrder = sortItems(subjects.dict, {
      ...subjects.order,
      options: sortOptions,
    });
    sortFields = sortOptions.fields;
  } else if (id) {
    componentOrder = subjects.dict[id].children.order;
    sortFields = subjects.dict[id].children.options.fields;
  } else {
    componentOrder = subjects.order.order;
    sortFields = subjects.order.options.fields;
  }

  const items = getItems(subjects.dict, componentOrder, options);
  const columns: IColumn[] = [];
  for (const field of sortFields) {
    const current = columnsDict[field.key];
    if (current) {
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
      className={styles.detailsList}
      columns={columns}
      items={items}
      isHeaderVisible={true}
      selectionMode={SelectionMode.none}
      onItemInvoked={invoke}
    />
  );
}

export default withRouter(ListView);

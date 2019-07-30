import React, { useState } from "react";
import { SubjectsRouteProps } from "../Routing";
import { getDisplay } from "../../Display";
import GridView, { MIN_COL_WIDTH } from "./GridView";
import { isUndefined } from "lodash";
import useWindowSize from "@rehooks/window-size";
import SubjectComponent from "./Subject";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Redirect, RouteComponentProps } from "react-router";
import ListView from "./ListView/ListView";
import ViewWithSidebar from "./ViewWithSidebar";
import { GetItemsOptions, getItems, Item } from "../model/Subject";
import {
  SortItemsOptions,
  sortItems,
  SortField,
  SetSortParameters,
} from "../../Order";

export interface SubjectViewHookProps {
  options?: GetItemsOptions;
  sortOptions?: SortItemsOptions;
  order?: string[];
}

interface UseSubjectView {
  /**
   * Array of the items to render.
   */
  items: Item[];

  /**
   * Array of the `id`s of the items to render.
   */
  componentOrder: string[];

  /**
   * Array of the `id`s of the items to render, stored in React state. This
   * should be used for scrolling to newly added subjects.
   */
  currentOrder: string[];

  /**
   * Sets `currentOrder` in React state.
   */
  setCurrentOrder: React.Dispatch<React.SetStateAction<string[]>>;

  /**
   * Array of the sort fields.
   */
  sortFields: SortField[];

  /**
   * Arguments to be passed to reducers for reordering items.
   */
  reorderParams: SetSortParameters;
}

export function useSubjectView({
  options,
  sortOptions,
}: SubjectViewHookProps): UseSubjectView {
  let parentId;
  let viewId;
  if (options) {
    ({ parentId, viewId } = options);
  }
  const { subjects, views } = useSelector((state: State) => state);

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
  } else if (parentId) {
    componentOrder = subjects.dict[parentId].children.order;
    sortFields = subjects.dict[parentId].children.options.fields;
    reorderParams = { subjectId: parentId };
  } else if (viewId) {
    componentOrder = views.dict[viewId].children.order;
    sortFields = views.dict[viewId].children.options.fields;
    reorderParams = {};
  } else {
    componentOrder = subjects.order.order;
    sortFields = subjects.order.options.fields;
    reorderParams = {};
  }
  const [currentOrder, setOrder] = useState(componentOrder);
  const items = getItems(subjects.dict, componentOrder, options);

  return {
    componentOrder,
    currentOrder,
    items,
    reorderParams,
    setCurrentOrder: setOrder,
    sortFields,
  };
}

export default function SubjectView({
  match,
  location,
}: RouteComponentProps<SubjectsRouteProps>): JSX.Element {
  const { parentId: id } = match.params;
  const display = getDisplay(location);

  const windowSize = useWindowSize();
  const { dict } = useSelector((state: State) => state.subjects);

  if (!isUndefined(id) && !(id in dict)) {
    return <Redirect to="/" />;
  }

  if (isUndefined(id)) {
    if (display === "list") {
      return <ListView />;
    } else {
      return <GridView />;
    }
  }

  const parentSubject = <SubjectComponent subject={dict[id]} id={id} />;
  if (windowSize.innerWidth > MIN_COL_WIDTH * 2) {
    const options = { parentId: id };
    return (
      <ViewWithSidebar
        viewComponent={
          display === "grid" ? (
            <GridView options={options} />
          ) : (
            <ListView options={options} />
          )
        }
        sidebarComponent={parentSubject}
      />
    );
  }

  return parentSubject;
}

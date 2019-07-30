import { BaseAction } from "../../Common";
import { isUndefined } from "lodash";
import { OrderState, SortItemsOptions } from "../../Order";

export type BaseSubject = "BaseSubject";

export type SubjectTypes = BaseSubject;

export interface Subject<T = SubjectTypes> {
  type: T;
  name: string;
  readonly created: Date;
  completed?: Date;
  description: string;
  dueDate?: Date;
  children: OrderState;
  parents: Set<string>;
}

export interface SubjectDictState {
  [key: string]: Subject;
}

export interface SubjectState {
  dict: SubjectDictState;
  order: OrderState;
  searchSortOptions: SortItemsOptions;
}

export interface SubjectBaseAction extends BaseAction {
  subjectId: string;
}

export interface Item {
  id: string;
  subject: Subject<"BaseSubject">;
  parent?: string;
}

export interface GetItemsOptions {
  /**
   * Should only be used for `/views/:viewId` routes.
   */
  viewId?: string;

  /**
   * Should only be used for `/subjects/:id` routes.
   */
  parentId?: string;

  /**
   * Should only be used for searching.
   */
  condition?: (i: Item) => boolean;
}

export function getItems(
  subjects: SubjectDictState,
  order: string[],
  options?: GetItemsOptions,
): Item[] {
  const items = [];
  const parent = options ? options.parentId : undefined;
  for (const id of order) {
    const current = { id, parent, subject: subjects[id] };
    if (
      isUndefined(options) ||
      isUndefined(options.condition) ||
      options.condition(current)
    ) {
      items.push(current);
    }
  }
  return items;
}

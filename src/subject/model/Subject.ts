import { BaseAction } from "../../Common";
import { isUndefined } from "lodash";

export type BaseSubject = "BaseSubject";

export type SubjectTypes = BaseSubject;

export interface Subject<T = SubjectTypes> {
  type: T;
  name: string;
  readonly created: Date;
  completed?: Date;
  description: string;
  dueDate?: Date;
  children: string[];
  parents: Set<string>;
}

export interface SubjectState {
  [key: string]: Subject;
}

export interface SubjectBaseAction extends BaseAction {
  subjectId: string;
}

export interface Item {
  id: string;
  subject: Subject<"BaseSubject">;
  parent?: string;
}

export function comparator(param: keyof Subject, desc = false) {
  const coeff = desc ? -1 : 1;
  return function(a: Item, b: Item): number {
    const aVal = a.subject[param];
    const bVal = b.subject[param];

    const aDefined = !isUndefined(aVal);
    const bDefined = !isUndefined(bVal);

    if (!aDefined && !bDefined) {
      return 0;
    } else if (aDefined && !bDefined) {
      return coeff * 1;
    } else if (!aDefined && bDefined) {
      return coeff * -1;
    } else if (aVal! < bVal!) {
      return coeff * -1;
    } else if (aVal! > bVal!) {
      return coeff * 1;
    }
    return 0;
  };
}

interface GetItemsOptions {
  separateCompletedItems?: boolean;
  getChildrenOfParent?: boolean;
  condition?: (s: Item) => boolean;
}

export function getItems(
  subjects: SubjectState,
  parentId?: string,
  options?: GetItemsOptions,
): Item[] {
  let items: Item[] = [];
  let completedItems: Item[] = [];

  if (parentId !== undefined && options && options.getChildrenOfParent) {
    if (!(parentId in subjects)) {
      throw new Error("Given id is not valid");
    }

    const subject = subjects[parentId];

    for (const childId of subject.children) {
      const current = {
        id: childId,
        subject: subjects[childId],
        parent: parentId,
      };
      const valid =
        isUndefined(options) ||
        isUndefined(options.condition) ||
        options.condition(current);

      if (valid) {
        if (
          options &&
          options.separateCompletedItems &&
          subjects[childId].completed
        ) {
          completedItems.push(current);
        } else {
          items.push(current);
        }
      }
    }
  } else {
    for (const entry of Object.entries(subjects)) {
      const current = { id: entry[0], subject: entry[1], parent: parentId };
      const valid =
        isUndefined(options) ||
        isUndefined(options.condition) ||
        options.condition(current);

      if (valid) {
        if (options && options.separateCompletedItems && entry[1].completed) {
          completedItems.push(current);
        } else {
          items.push(current);
        }
      }
    }
  }

  items.sort(comparator("created", true));
  completedItems.sort(comparator("created", true));
  return items.concat(completedItems);
}

import { BaseAction } from "../../Common";

export type BaseSubject = "BaseSubject";

export interface Subject<T = BaseSubject> {
  type: T;
  name: string;
  readonly created: Date;
  completed?: Date;
  description: string;
  dueDate?: Date;
  children: string[];
}

export interface SubjectState {
  [key: string]: Subject;
}

export interface SubjectBaseAction extends BaseAction {
  subjectId: string;
}

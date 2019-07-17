import { BaseAction } from "../../Common";

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

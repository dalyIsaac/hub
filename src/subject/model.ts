export type BaseSubject = "BaseSubject";

export interface Subject<T = BaseSubject> {
  type: T;
  name?: string;
  description?: string;
  dueDate?: Date;
}

export interface SubjectState {
  [key: string]: Subject;
}

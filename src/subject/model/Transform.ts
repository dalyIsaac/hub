import { createTransform } from "redux-persist";
import { Subject, SubjectState, SubjectDictState } from "./Subject";

interface PersistSubject
  extends Omit<
    Subject,
    "created" | "completed" | "dueDate" | "parents" | "views"
  > {
  created: Date | string;
  completed?: Date | string;
  dueDate?: Date | string;
  parents: string[];
  views: string[];
}

interface PersistSubjectDictState {
  [key: string]: PersistSubject;
}

interface PersistSubjectState extends Omit<SubjectState, "dict"> {
  dict: PersistSubjectDictState;
}

const transformSubjects = createTransform<SubjectState, PersistSubjectState>(
  ({ dict: inboundSubjects, ...everythingElse }, _key) => {
    const dict: PersistSubjectDictState = {};
    for (const [key, s] of Object.entries(inboundSubjects)) {
      dict[key] = { ...s, parents: [...s.parents], views: [...s.views] };
    }
    return { dict, ...everythingElse };
  },
  ({ dict: outboundSubjects, ...everythingElse }, _key) => {
    const dict: SubjectDictState = {};
    for (const [
      key,
      { created, completed, dueDate, parents, views, ...s },
    ] of Object.entries(outboundSubjects)) {
      const completedDate = completed ? new Date(completed) : undefined;
      const dueDateDate = dueDate ? new Date(dueDate) : undefined;
      dict[key] = {
        ...s,
        completed: completedDate,
        created: new Date(created),
        dueDate: dueDateDate,
        parents: new Set(parents),
        views: new Set(views),
      };
    }
    return { dict, ...everythingElse };
  },
  {
    whitelist: ["subjects"],
  },
);

export default transformSubjects;

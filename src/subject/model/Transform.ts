import { createTransform } from "redux-persist";
import { Subject, SubjectState } from "./Subject";

interface PersistSubject
  extends Omit<Subject, "created" | "completed" | "dueDate" | "parents"> {
  created: Date | string;
  completed?: Date | string;
  dueDate?: Date | string;
  parents: string[];
}

interface PersistSubjectState {
  [key: string]: PersistSubject;
}

const transformSubjects = createTransform<SubjectState, PersistSubjectState>(
  (inboundSubjects, key) => {
    const subjects: PersistSubjectState = {};
    for (const [key, s] of Object.entries(inboundSubjects)) {
      subjects[key] = { ...s, parents: [...s.parents] };
    }
    return subjects;
  },
  (outboundSubjects, key) => {
    const subjects: SubjectState = {};
    for (const [
      key,
      { created, completed, dueDate, parents, ...s },
    ] of Object.entries(outboundSubjects)) {
      const completedDate = completed ? new Date(completed) : undefined;
      const dueDateDate = dueDate ? new Date(dueDate) : undefined;
      subjects[key] = {
        ...s,
        parents: new Set(parents),
        created: new Date(created),
        completed: completedDate,
        dueDate: dueDateDate,
      };
    }
    return subjects;
  },
  {
    whitelist: ["subjects"],
  },
);

export default transformSubjects;

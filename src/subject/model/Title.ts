import { ActionBase } from "../../Common";

export const UPDATE_SUBJECT_NAME = "UPDATE_SUBJECT_NAME";

export interface UpdateSubjectNameAction extends ActionBase {
  name: string;
}

export const updateSubjectName = (name: string): UpdateSubjectNameAction => ({
  name,
  type: UPDATE_SUBJECT_NAME,
});

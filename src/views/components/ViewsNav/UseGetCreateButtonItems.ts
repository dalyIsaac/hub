import { AllParams } from "../../../Routing";
import { ICommandBarItemProps } from "office-ui-fabric-react";
import { createSubject } from "../../../model/Subject/CreateSubject";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useGetCreateButtonItems({
  parentId,
  viewId,
}: AllParams): ICommandBarItemProps[] {
  const dispatch = useDispatch();

  const createSubjectOnClick = useCallback((): void => {
    dispatch(createSubject({ parentId, viewId }));
  }, [dispatch, parentId, viewId]);

  return [
    {
      iconProps: {
        iconName: parentId || viewId ? "ChildOf" : "Add",
      },
      key: "createSubject",
      onClick: createSubjectOnClick,
      text: parentId || viewId ? "Create child subject" : "Create subject",
    },
  ];
}

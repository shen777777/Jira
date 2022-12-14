import { useLocation } from "react-router";
import { useProject } from "./../../utils/project";
import { useUrlQueryParam } from "./../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";
import { useDebounce } from "./../../utils/index";

export const useProjectIdInUrl = () => {
  // 取出URL
  const { pathname } = useLocation();
  // 用正常表达式找出 URL 中的 id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  // 将字符串中的 id 转换为 数字 id
  return Number(id);
};

export const useProjectInurl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const debouncedName = useDebounce(param.name, 200);

  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTaskQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};

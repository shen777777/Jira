import React from "react";
import { useDocumentTitle } from "../../utils";
import { useKanbans } from "./../../utils/kanban";
import {
  useKanbanSearchParams,
  useProjectInurl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-pannel";
import { Title } from "../project-list";
import { useTasks } from "./../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInurl();

  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );

  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());

  const isLoading = taskIsLoading || kanbanIsLoading;

  return (
    <div>
      <h1 style={{ color: "black", width: "30rem" }}>
        {currentProject?.name}看板
      </h1>
      <SearchPanel />
      {isLoading ? (
        <MySpin size="large" />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModal />
    </div>
  );
};
export const ColumnContainer = styled.div`
  display: flex;
  margin-right: 4rem;
  overflow-y: scroll;
`;
const MySpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

import { Task } from "../entities/task";

export type taskProps = Pick<
  Task,
  "title" | "description" | "status" | "priority"
>;
export interface ITaskRepository {
  save(task: taskProps): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findByProject(projectId: number): Promise<Task[] | null>;
  findAll(): Promise<Task[]>;
}

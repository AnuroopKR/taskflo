import { Priority, ProjectStatus } from "../../../domain/entities/Project";

export type CreateProjectRequestDto={
    name: string;
    description:string;
    status:ProjectStatus;
    priority:Priority;
    startDate:Date;
    dueDate:Date;

}

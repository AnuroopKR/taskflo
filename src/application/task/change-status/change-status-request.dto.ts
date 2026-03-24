import { TaskStatus } from "../../../domain/entities/task";

export  type StatusHistoryDto={
    status:TaskStatus;
    userId:string;
    comment:string
}
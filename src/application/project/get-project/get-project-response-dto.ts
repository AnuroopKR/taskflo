export type ProjectWithRelations = {
  id: number;
  name: string;
  description: string | null;
  companyId: string;

  status: "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH";

  startDate: Date | null;
  dueDate: Date | null;

  ownerId: string | null;

  createdAt: Date;
  updatedAt: Date;

  // ✅ Relations
  company: {
    id: string;
    name: string;
    email: string;
    plan: string;
    createdAt: Date;
    updatedAt: Date;
  };

  tasks: {
    id: number;
    title: string;
    description: string | null;
    projectId: number | null;

    status: "PENDING" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED" | "REASSIGNED" | "OVERDUE";
    priority: "LOW" | "MEDIUM" | "HIGH";

    createdBy: string | null;
    assignedTo: string | null;

    startDate: Date | null;
    dueDate: Date | null;
    completedAt: Date | null;

    createdAt: Date;
    updatedAt: Date;
  }[];
};
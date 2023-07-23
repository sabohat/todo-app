export enum TODO_ACTIONS {
    ADD = "add",
    DELETE = "delete",
    UPDATE_STATUS = "move",
}

export enum TODO_STATUSES {
    BACKLOG = "backlog",
    TODO = "todo",
    IN_PROGRESS = "inProgress",
    TEST = "test",
    COMPLETED = "done"
}

export interface TodoItem {
    id: string;
    title: string;
    status: TODO_STATUSES;
    createdAt?: Date;
    deletedAt?: Date | null;
}
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

export const todoStatusList = (Object.keys(TODO_STATUSES) as (keyof typeof TODO_STATUSES)[]).map(
    (key) => {
        return TODO_STATUSES[key];
    },
);

export interface TodoItem {
    id: string;
    title: string;
    status: TODO_STATUSES;
    createdAt?: Date;
    deletedAt?: Date | null;
}

export const statusColor = {
    [TODO_STATUSES.BACKLOG]: "bg-yellow-200",
    [TODO_STATUSES.TODO]: "bg-blue-200",
    [TODO_STATUSES.IN_PROGRESS]: "bg-pink-200",
    [TODO_STATUSES.TEST]: "bg-gray-200",
    [TODO_STATUSES.COMPLETED]: "bg-green-200"
}
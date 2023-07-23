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
        console.log(key);
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
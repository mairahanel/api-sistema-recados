import {v4 as createUuid} from 'uuid';

export class Task {

    private _id: string;

    constructor(
        private _description: string,
        private _detail: string,
        private _userId: string
    ) {
        this._id = createUuid();
    }

    public get userId() {
        return this._userId
    }

    public get id() {
        return this._id
    };

    public get description() {
        return this._description
    };

    public set description(description: string) {
        this._description = description
    };

    public get detail() {
        return this._detail
    };

    public set detail(detail: string) {
        this._detail = detail
    };

    public toJson() {
        return {
            id: this._id,
            description: this._description,
            detail: this._detail,
            userId: this._userId,
        }
    }

    public static create(
        id: string,
        description: string,
        detail: string,
        userId: string,
    ) {
        const task = new Task(description, detail, userId);
        task._id = id;

        return task;
    }
}
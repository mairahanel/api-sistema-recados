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
}
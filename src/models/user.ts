import {v4 as createUuid} from 'uuid';
import { Task } from './task';

export class User {

    private _id: string;
    private _tasks: Task[]

    constructor(
        private _email: string,
        private _password: string,
        private _vPassword: string
    ) {
        this._id = createUuid();
        this._tasks = [];
    }

    get id() {
        return this._id
    };

    get email() {
        return this._email
    };

    set email(email: string) {
        this._email = email
    };

    get password() {
        return this._password
    };

    set password(password: string) {
        this._password = password
    };

    get vPassword() {
        return this._vPassword
    };

    set vPassword(password: string) {
        this._vPassword = password
    };

    get tasks() {
        return this._tasks
    };

    set tasks(tasks: Task[]) {
        this._tasks = tasks
    };
}
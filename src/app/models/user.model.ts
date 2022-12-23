import {v4 as createUuid} from 'uuid';
import { Task } from './task.model';

export class User {

    private _id: string;

    constructor(
        private _email: string,
        private _password: string,
        private _vPassword: string
    ) {
        this._id = createUuid();
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

    public toJson() {
        return {
            id: this._id,
            email: this._email,
        }
    }

    public static create(
        id: string,
        email: string,
        senha: string,
        v_senha: string
    ) {
        const user = new User(email, senha, v_senha);
        user._id = id

        return user;
    }
}
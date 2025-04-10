import {Role } from './role';

export class Account {
    [x: string]: any;
    isDeleting: boolean = false;
    constructor(
        public id: string,
        public title: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: Role,
        public dateCreated: Int16Array,
        public isVerified: string,
        public jwtToken?: string
    ) {}
}

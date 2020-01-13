import { Request, Response } from 'express';
import { handleRequest } from '@app';

import UserService from '@services/UserService';

class UsersController {
    constructor(
        private userService: UserService,
    ) {}

    public all = async (request: Request, response: Response) => {
        await handleRequest(request, response, {
            title: 'Get all users',
            params: request.params,
            ...await this.userService.getAll() as {},
        });
    }

    public getUserById = async (request: Request, response: Response) => {
        await handleRequest(request, response, {
            title: 'Get user by ID',
            params: request.params,
            ...await this.userService.getUserById(Number(request.params.id)) as {},
        });
    }

    public getSubordinates = async (request: Request, response: Response) => {
        await handleRequest(request, response, {
            title: 'Get subordinates',
            params: request.params,
            ...await this.userService.getSubordinates(Number(request.params.id)) as {},
        });
    }
}

export default new UsersController(
    new UserService(),
);

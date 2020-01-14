import { Request, Response } from 'express';
import { handleRequest } from '@app';

import UserService from '@services/UserService';

class UsersController {
    constructor(
        private userService: UserService,
    ) {}

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

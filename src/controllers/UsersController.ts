import { Request, Response } from 'express';
import { handleRequest } from '@app';

import UserService from '@services/UserService';

class UsersController {
    static getSubordinates = async (request: Request, response: Response) => {
        await handleRequest(request, response, {
            title: 'Get subordinates',
            params: request.params,
            ...await UserService.getSubordinates(Number(request.params.id)) as {},
        });
    }
}

export default UsersController;

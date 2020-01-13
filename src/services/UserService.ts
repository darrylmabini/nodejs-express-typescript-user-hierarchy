import { successResponse, rejectResponse } from '@app';
import Roles from '@models/RoleModel';
import Users from '@models/UserModel';

class UserService {
    public getAll = async () => {
        return new Promise(async (resolve) => {
            try {
                const users = await Users.all();
                resolve(successResponse({ users }));
            } catch (e) {
                resolve(rejectResponse(
                    e.message || 'Unknown error',
                    e.status || 500,
                ));
            }
        });
    }

    public getUserById = async (id: number) => {
        return new Promise(async (resolve) => {
            try {
                const user = await Users.findById(id);
                resolve(successResponse({ user }));
            } catch (e) {
                resolve(rejectResponse(
                    e.message || 'Unknown error',
                    e.status || 500,
                ));
            }
        });
    }

    public getSubordinates = async (id: number) => {
        return new Promise(async (resolve) => {
            try {
                const user = await Users.findById(id);
                if (user) {
                    const roles = await Roles.findChildrenById(user.Role);
                    if (roles) {
                        const users = await Users.findByRoles(roles.map((role) => role.Id));
                        resolve(successResponse({ subordinates: users }));
                    } else {
                        resolve(successResponse({ subordinates: [] }));
                    }
                } else {
                    throw { message: 'Not found', status: 404 };
                }
            } catch (e) {
                resolve(rejectResponse(
                    e.message || 'Unknown error',
                    e.status || 500,
                ));
            }
        });
    }
}

export default UserService;

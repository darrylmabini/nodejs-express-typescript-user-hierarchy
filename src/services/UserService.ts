import { successResponse, rejectResponse } from '@app';
import Roles from '@models/RoleModel';
import Users from '@models/UserModel';

class UserService {
    static getSubordinates = async (id: number) => {
        return new Promise(async (resolve) => {
            try {
                const user = await Users.findById(id);
                if (user) {
                    const roles = await Roles.findChildrenById(user.Role);
                    const subordinates = roles ? await Users.findByRoles(roles.map((role) => role.Id)) : [];
                    resolve(successResponse({ subordinates }));
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

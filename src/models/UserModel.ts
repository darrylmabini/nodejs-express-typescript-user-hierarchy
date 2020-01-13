interface IUser {
    Id: number;
    Name: string;
    Role: number;
}

const Users: IUser[] = [{
    "Id": 1,
    "Name": "Adam Admin",
    "Role": 1
}, {
    "Id": 2,
    "Name": "Emily Employee",
    "Role": 4
}, {
    "Id": 3,
    "Name": "Sam Supervisor",
    "Role": 3
}, {
    "Id": 4,
    "Name": "Mary Manager",
    "Role": 2
}, {
    "Id": 5,
    "Name": "Steve Trainer",
    "Role": 5
}];

export default (() => ({
    /**
     * Returns collection of user.
     */
    all(): Promise<IUser[]> {
        return new Promise((resolve) => {
            resolve(Users);
        });
    },

    /**
     * Find user by ID
     * 
     * @param id
     */
    findById(id: number): Promise<IUser|false> {
        return new Promise((resolve) => {
            resolve(Users.find((user) => user.Id === id) || false);
        });
    },

    /**
     * Find users by role IDs
     * 
     * @param rids 
     */
    findByRoles(rids: number[]): Promise<IUser[]|[]> {
        return new Promise((resolve) => {
            resolve(Users.filter((user) => rids.indexOf(user.Role) !== -1));
        });
    }
}))();
interface IRoles {
    Id: number;
    Name: string;
    Parent: number;
};

const Roles: IRoles[] = [{
    "Id": 1,
    "Name": "System Administrator",
    "Parent": 0
}, {
    "Id": 2,
    "Name": "Location Manager",
    "Parent": 1,
}, {
    "Id": 3,
    "Name": "Supervisor",
    "Parent": 2,
}, {
    "Id": 4,
    "Name": "Employee",
    "Parent": 3,
}, {
    "Id": 5,
    "Name": "Trainer",
    "Parent": 3,
}];

export default (() => ({
    /**
     * Returns collection of role.
     */
    all(): Promise<IRoles[]> {
        return new Promise((resolve) => {
            resolve(Roles);
        });
    },

    /**
     * Finds and collect the children of the given role id,
     * then stops and return the collection of children roles
     * when a role does not have children.
     * 
     * @param id 
     * @param children
     */
    findChildrenById(id: number, children: IRoles[] = []): Promise<IRoles[]|false> {
        let roles = Roles.filter((role) => role.Parent === id);
        roles.forEach((role) => {
            children.push(role);
            this.findChildrenById(role.Id, children);
        });
        return new Promise((resolve) => {
            resolve(children || false);
        });
    }
}))();
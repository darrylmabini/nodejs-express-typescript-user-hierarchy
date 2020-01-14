import sinon from 'sinon';
import { assert } from 'chai';

import Users from '../../../src/models/UserModel';
import Roles from '../../../src/models/RoleModel';
import UserService from '../../../src/services/UserService';

describe('UserService', function() {
    let findByIdStub;
    let findByRolesStub;
    let findChildrenByIdStub;

    beforeEach(() => {
        findByIdStub = sinon.stub(Users, 'findById');
        findByRolesStub = sinon.stub(Users, 'findByRoles');
        findChildrenByIdStub = sinon.stub(Roles, 'findChildrenById');
    });

    afterEach(() => {
        findByIdStub.restore();
        findByRolesStub.restore();
        findChildrenByIdStub.restore();
    });

    describe('#getSubordinates(1)', function() {
        it('should return all subordinates of user 1', async function() {
            findByIdStub.resolves({
                Id: 1,
                Name: 'Adam Admin',
                Role: 1,
            });

            findChildrenByIdStub.resolves([{
                Id: 2,
                Name: 'Location Manager',
                Parent: 1,
            }, {
                Id: 3,
                Name: 'Supervisor',
                Parent: 2,
            }, {
                Id: 4,
                Name: 'Employee',
                Parent: 3,
            }, {
                Id: 5,
                Name: 'Trainer',
                Parent: 3,
            }]);

            findByRolesStub.resolves([{
                Id: 2,
                Name: 'Emily Employee',
                Role: 4,
            }, {
                Id: 3,
                Name: 'Sam Supervisor',
                Role: 3,
            }, {
                Id: 4,
                Name: 'Mary Manager',
                Role: 2,
            }, {
                Id: 5,
                Name: 'Steve Trainer',
                Role: 5,
            }]);

            const result: any = await UserService.getSubordinates(1);

            assert.equal(result.subordinates.length, 4);
            assert.equal(findByIdStub.calledOnce, true);
            assert.equal(findChildrenByIdStub.calledOnce, true);
            assert.equal(findByRolesStub.calledOnce, true);
        });
    });

    describe('#getSubordinates(3)', function() {
        it('should return all subordinates of user 3', async function() {
            findByIdStub.resolves({
                Id: 3,
                Name: 'Sam Supervisor',
                Role: 3,
            });

            findChildrenByIdStub.resolves([{
                Id: 4,
                Name: 'Employee',
                Parent: 3,
            }, {
                Id: 5,
                Name: 'Trainer',
                Parent: 3,
            }]);

            findByRolesStub.resolves([{
                Id: 2,
                Name: 'Emily Employee',
                Role: 4,
            }, {
                Id: 5,
                Name: 'Steve Trainer',
                Role: 5,
            }]);

            const result: any = await UserService.getSubordinates(3);

            assert.equal(result.subordinates.length, 2);
            assert.equal(findByIdStub.calledOnce, true);
            assert.equal(findChildrenByIdStub.calledOnce, true);
            assert.equal(findByRolesStub.calledOnce, true);
        });
    });
});
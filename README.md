# NodeJS Express Typescript - User Hierarchy

## Prerequisite
1. Node version `v12.0+`.
2. Port 3000 availability.

## Installation
1. Install dependencies
    ```console
    npm install
    ```
2. Build the package
    ```console
    npm run build
    ```
3. Start the application
    ```console
    npm run start
    ```
4. Check user subordinates
    - User #1 subordinates, http://localhost:3000/users/1/subordinates
    - User #2 subordinates, http://localhost:3000/users/2/subordinates
    - User #3 subordinates, http://localhost:3000/users/3/subordinates
    - User #4 subordinates, http://localhost:3000/users/4/subordinates
    - User #5 subordinates, http://localhost:3000/users/5/subordinates
    - Invalid user id subordinates, http://localhost:3000/users/100/subordinates

## File Structure
Javascript doesn't have standard options on putting things all together. That said this is the option based from the popular approaches online.
```
src/
  controllers/
    SampleController.ts
  models/
    SampleModel.ts
  routes/
    sample.ts
  services/
    SampleService.ts
  app.module.ts
  app.ts
```
- **`Controllers`** takes request object, pull out data from request, validate, then send to service(s).
- **`Models`** responsible for managing data, but for this example its responsibility is to find the data.
- **`Routes`** handles the HTTP requests that hits the Express router and route them to appropriate controller(s).
- **`Services`** contains the business logic, derived from business and technical requirements.
- **`app.module`** is where we register the routes.
- **`app`** the main entrypoint.

## Task
Come up with a function, for an arbitrary collection of roles and users, given a user Id returns a list of ALL their subordinates (i.e: including their subordinate's subordinates). Please make sure you put some good effort in and produce good, clean, workable code - that's what we're looking for!

## Solution
To list ALL the user's subordinates, I have a service called `UserService` and has a `getSubordinates` method. First I need to find the user role ID by calling `findById` in the `UserModel` object. After that I will check if there is a user found so that I can ensure that I can get the user role ID else I will just return 404 not found. Once I have the user role ID, I will then get all the roles under that user role ID. I can do this by calling a recursive function called `findChildrenById` in the `RoleModel` object. Now that I have the list of user roles, I can now simply call `findByRoles` in the `UserModel` object to return all the users that are included in the list of sub roles.

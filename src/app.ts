import 'module-alias/register';

import express, { Application, Request, Response, NextFunction, Router } from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';

import { routes } from './app.module';

export const App = () => {
    const Express: Application = express();
    Express.set('port', 3000);
    Express.use(bodyParser.json());
    Express.use(bodyParser.urlencoded({ extended: false }));

    // routes
    routes.forEach((route) => {
        Express.use('/', route);
    });

    // catch 404 and forward to error handler
    Express.use((req: Request, res: Response, next: NextFunction) => {
        next(createError(404));
    });

    // start Express server
    Express.listen(Express.get('port'), () => {
        // tslint:disable-next-line:no-console
        console.log(('> App is running at http://localhost:%d in %s mode'), Express.get('port'), Express.get('env'));
        // tslint:disable-next-line:no-console
        console.log('> Press CTRL-C to stop\n');
    });
};

export const sendResponse = (
    response: Response,
    payload: any,
) => {
    response.status(payload.code || 200);
    if (payload instanceof Object) {
        response.json(payload);
    } else {
        response.end(payload);
    }
};

export const sendError = (
    response: Response,
    error: {
        code: number;
        message: string;
        error: object|string;
    },
) => {
    response.status(error.code || 500);
    if (error.error instanceof Object) {
        response.json(error.error);
    } else {
        response.end(error.error || error.message);
    }
};

export const handleRequest = async (
    request: Request,
    response: Response,
    serviceOperation: any,
) => {
    try {
        let payload = serviceOperation;
        if (typeof serviceOperation !== 'object') {
            payload = await serviceOperation(request);
        }
        sendResponse(response, payload);
    } catch (error) {
        sendError(response, error);
    }
};

export const rejectResponse = (
    error: string,
    code = 500,
) => {
    return { error, code };
};

export const successResponse = (
    data: any,
    code = 200,
) => {
    return { ...data, code };
};

export default App();

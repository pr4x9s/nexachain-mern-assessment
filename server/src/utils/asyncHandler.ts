import type { RequestHandler } from 'express'



const asyncHandler = (requestHandlerFn: RequestHandler): RequestHandler => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandlerFn(req, res, next))
        .catch((err) => next(err))
    }
};

export { asyncHandler }

import { mockUsers } from "./constants.mjs";

const resolveIndexByUserId = (request, response, next) => {
    const { 
        body,
        params: { id }
     } = request;

    // should use parseInt because url parameters are string
    const parsedId = parseInt(id);
    
    if(isNaN(parsedId))
        return response.status(400).send({msg: "Bad Request. Invalid ID!"});

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if(findUserIndex === -1)
        return response.status(404).send({msg: "User Not Found!"})

    request.findUserIndex = findUserIndex;
    request.parsedId = parsedId;
    next();
}

const loggingMiddleWare = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
}

export { resolveIndexByUserId, loggingMiddleWare };
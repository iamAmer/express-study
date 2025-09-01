import { Router } from 'express'
const router = Router();

router.get('/api/products', (request, response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies)

    // How authentication and authorization work
    if(request.cookies.hello && request.cookies.hello == "world")
        return response.send([ {id: 345, name: "phone"} ]);

    return response.send({msg: "Sorry, you need the correct cookie!"})
})

export default router;
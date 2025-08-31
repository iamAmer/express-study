import { Router } from 'express'
const router = Router();

router.get('/api/products', (request, response) => {
    response.send([
        {id: 345, name: "phone"},
        {id: 346, name: "ipad"},
    ]);
})

export default router;
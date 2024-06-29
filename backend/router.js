import { Router } from "express";
import * as request from './requestHandler.js'
import Auth from "./middleware/userathu.js";
const router=Router()

router.route('/add').post(request.addmovie)
router.route('/get').get(request.getmovie)

router.route('/getforedit/:id').get(request.getforedit)
router.route('/getdataforedit/:id').get(request.getdataforedit)

router.route('/update/:id').patch(request.updatemovie)
router.route('/delete/:id').delete(request.deletemovie);


router.route('/user').post(request.userRegister)
router.route('/login').post(request.userLogin)
router.route('/home').post(Auth,request.Home)



export default router;
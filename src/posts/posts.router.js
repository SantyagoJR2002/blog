const router = require('express').Router()
const passport = require('passport')
require('../middleware/post.middleware')(passport)

const userServices = require('./posts.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)
    .post(userServices.register)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}) ,userServices.editMyPosts)
    .get(passport.authenticate('jwt',{session: false}), userServices.getMyPosts)
    .delete(passport.authenticate('jwt',{session: false}), userServices.removeMyPost)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), userServices.remove)
    .put(passport.authenticate('jwt', {session: false}) ,userServices.edit)


exports.router = router
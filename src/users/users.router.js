const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)
require('../middleware/post.middleware')
const postsServices = require('../posts/posts.http')
const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)

router.route('/me')
    .put(passport.authenticate('jwt',{session: false}) ,userServices.editMyUser)
    .get(passport.authenticate('jwt',{session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt',{session: false}), userServices.removeMyUser)

    router.route('/me/posts')
    .get(passport.authenticate('jwt',{session: false}), postsServices.getMyPosts)
    
    router.route('/me/posts/:id')
    .put(passport.authenticate('jwt',{session: false}) ,postsServices.editMyPosts)
    .get(passport.authenticate('jwt',{session: false}),postsServices.getMyPosts)
    .delete(passport.authenticate('jwt',{session: false}), postsServices.removeMyPost)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}),userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,userServices.edit)


exports.router = router
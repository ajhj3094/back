import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'

import {
  register,
  login,
  logout,
  extend,
  getUserInfo,
  addCart,
  getCart,
  updateCart
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.post('/extend', auth, extend)
router.delete('/logout', auth, logout) // 注意登出用 delete 較合理
router.get('/me', auth, getUserInfo)
router.post('/me/cart', auth, addCart)
router.get('/me/cart', auth, getCart)
router.patch('/me/cart', auth, updateCart)

export default router

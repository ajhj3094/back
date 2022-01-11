import jwt from 'jsonwebtoken'
import users from '../models/users.js'

export default async (req, res, next) => {
  try { // 短路求值+可選串聯 :如果前面是 undefined 就取後面
    // const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : ''
    const token = req.headers.authorization?.replace('Bearer ', '') || ''
    if (token.length > 0) {
      const decoded = jwt.decode(token)
      req.user = await users.findOne({ _id: decoded._id, tokens: token })
      req.token = token // 有找到就先放進來等下在 controller 可以用
      if (req.user) {
        // jwt 套件可以做到錯誤的話會自動跳到 catch 不用解譯
        jwt.verify(token, process.env.SECRET)
        next()
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError' && req.baseUrl === '/users' && req.path === '/extend') {
      next()
    } else {
      res.status(401).send({ success: false, message: '驗證錯誤' })
    }
  }
}

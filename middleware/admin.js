// 讓管理員通過，就不用再 controller 寫了
export default (req, res, next) => {
  if (req.user.role !== 1) {
    res.status(403).send({ success: false, message: '沒有權限' })
  } else {
    next()
  }
}

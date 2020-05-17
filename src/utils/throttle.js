function throttle (fn, gapTime) {
  if (gapTime === null || gapTime === undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function (e) {
    console.log(this)
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn(this, e)
      _lastTime = _nowTime
    }
  }
}
module.exports = {
  throttle: throttle
}

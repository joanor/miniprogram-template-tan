const Libs=require('../xtlib/index')
export const basic = Behavior({
  methods: {
    /* 封装triggerEvent */
    $emit (...args) {
      this.triggerEvent(...args)
    },

    /* 封装setDataa */
    $set (data = {}, callback = () => { }) {
      this.setData(data, callback);
      return new Promise((resolve) => wx.nextTick(resolve))
    },

    /* 封装boundingClientRect */
    $getRect (selector = '', all = false) {
      return new Promise((resolve) => {
        wx.createSelectorQuery()
          .in(this)
        [all ? 'selectAll' : 'select'](selector)
          .boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec()
      })
    },

    /* 封装存储对象 */
    $setItem (key, value, expiration) {
      Libs.Storage.setStorageSync(key, value, expiration)
    },

    /* 封装获取存储对象 */
    $getItem (key) {
      Libs.Storage.getStorageSync(key)
    },

    /* 封装删除指定存储对象 */
    $deleteItem (key) {
      Libs.Storage.removeStorageSync(key)
    },

    /* 封装清空存储对象 */
    $clearItem () {
      Libs.Storage.clearStorageSync()
    },

    /* 添加事件监听 */
    $addEventListener (type, callback, scope) {
      Libs.Event.addEventListener(type, callback, scope)
    },

    /* 移除事件监听 */
    $removeEventListener (type) {
      Libs.Event.removeEventListener(type)
    },

    /* 发布事件 */
    $dispatch (type, target) {
      Libs.Event.dispatch(type, target)
    },

  },
});

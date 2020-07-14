/*
 * @Author: joanoor
 * @Mail: joanoor@outlook.com
 * @Github: https://github.com/joanoor
 */

const Storage=require('../storage/index')
const Event=require('../event/index')

export const basic = Behavior({
  methods: {
    /* 封装triggerEvent */
    $emit(...args) {
      this.triggerEvent(...args)
    },

    /* 封装setDataa */
    $set(data = {}, callback = () => {}) {
      this.setData(data, callback);
      return new Promise((resolve) => wx.nextTick(resolve))
    },

    /* 封装boundingClientRect */
    $getRect(selector = '', all = false) {
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
    $setItem(key, value, expiration){
      Storage.setStorageSync(key, value, expiration)
    },

    /* 封装获取存储对象 */
    $getItem(key){
      Storage.getStorageSync(key)
    },

    /* 封装删除指定存储对象 */
    $deleteItem(key){
      Storage.removeStorageSync(key)
    },

    /* 封装清空存储对象 */
    $clearItem(){
      Storage.clearStorageSync()
    },

    /* 添加事件监听 */
    $addEventListener(type, callback, scope){
      Event.addEventListener(type, callback, scope)
    },

    /* 移除事件监听 */
    $removeEventListener(type) {
      Event.removeEventListener(type) 
    },

    /* 发布事件 */
    $dispatch(type, target){
      Event.dispatch(type, target)
    },

  },
});

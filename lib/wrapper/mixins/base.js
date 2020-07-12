/*
 * @Author: joanoor
 * @Mail: joanoor@outlook.com
 * @Github: https://github.com/joanoor
 * @Date: 2020-07-11 11:43:30
 * @Description: 
 */

const Storage=require('../storage/index')

export const basic = Behavior({
  methods: {
    $emit(...args) {
      this.triggerEvent(...args);
    },

    $set(data = {}, callback = () => { }) {
      this.setData(data, callback);
      return new Promise((resolve) => wx.nextTick(resolve));
    },

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
          .exec();
      });
    },

    $setItem(key, value, expiration){
      Storage.setStorageSync(key, value, expiration)
    },

    $getItem(key){
      Storage.getStorageSync(key)
    },

    $deleteItem(key){
      Storage.removeStorageSync(key)
    },

    $clearItem(){
      Storage.clearStorageSync()
    }
  },
});

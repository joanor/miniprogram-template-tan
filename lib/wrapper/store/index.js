import { observable, action } from 'mobx-miniprogram'
const app=getApp()

export const store = observable({
  username:app.globalData.username,
  update:action(function(val){
    this.username=val
  })
})
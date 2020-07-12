import { xComponent } from '../../lib/wrapper/index'
const Event=require('../../lib/wrapper/event/index')
import { store } from '../../lib/wrapper/store/index'

xComponent({
  props: {
   
  },
  data: {
    result:0
  },
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum'
    },
    actions: {
      buttonTap: 'update'
    },
  },
  created(){
  },
  mounted(){
    
    this.$getRect('.texts').then(res=>{
      console.log(res.height)
    })
    
    Event.addEventListener('HHHHH',()=>
      this.aaa()
    )
    
  },
  methods:{
    buttonTap(){},
    // myMethod() {
    //   this.data.sum // 来自于 MobX store 的字段
    // },
    aaa(){
      console.log('监听了，哈哈哈')
    },

    handle(){
      console.log('点击了')
      // debugger
      Event.dispatch('HHHHH')
      this.$set({
        result:'这是结果啦'
      }).then(res=>{
        this.$setItem('ok','成功了')
        console.log('渲染成功！')
      })
    }
  }
  
});

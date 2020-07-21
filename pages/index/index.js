import { xComponent } from '../../lib/wrapper/index'
const time=require('../../lib/wrapper/dayjs/index')

xComponent({
  props: {
   
  },
  data: {
    result:0
  },

  created(){
  },
  mounted(){
    console.log('time',new time().$d)
    this.$getRect('.texts').then(res=>{
      console.log(res.height)
    })
    
    this.$addEventListener('HHHHH',()=>
      this.aaa()
    )
    console.log('username',this.data.username)
    
    // var myAnimation = anime({
    //   targets: '.circle',
    //   translateX: '13rem',
    //   rotate: 180,
    //   borderRadius: '50%',
    //   duration: 6000,
    //   backgroundColor: '#fbc531',
    //   loop: true
    // })
  },
  watch:{
    'username':function(username){
      console.log('转变后的username',username)
    }
  },
  methods:{
    buttonTap(){
      this.update('张萍')
    },
   
    aaa(){
      console.log('监听了，哈哈哈')
    },

    handle(){
      console.log('点击了')
      // debugger
      this.$dispatch('HHHHH')
      this.$set({
        result:'这是结果啦'
      }).then(res=>{
        this.$setItem('ok','成功了')
        console.log('渲染成功！')
      })
    }
  }
  
});

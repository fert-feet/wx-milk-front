var that
Page({
    data:{
        todayOrderList: [],
        orderlist:[],
        titelList: [ {
            title: "全部订单",
            type: 0
        }, {
            title: "进行订单",
            type: 1
        } ],
        current: 0,
    },

    onLoad:function(){
        that=this
        if(wx.getStorageSync('userId')==''){
            wx.showToast({
              title: '请先登录后操作',
              icon:'none'
            })
            setTimeout(()=>{
                wx.reLaunch({
                  url: '/pages/extendIndex/extendIndex',
                })
            },750)
            return;
        }
        this.getAllOrderInfo()
    },

    //获取订单信息
    getAllOrderInfo:function(){
        wx.request({
            url: 'http://localhost:8085/order/info',
            method:'POST',
            data:{
                "userId":wx.getStorageSync('userId')
            },
            success(res){
                var todayList=[]
                for(var i=0;i<res.data.data.length;i++){
                    const status=res.data.data[i].status
                    status==2?todayList.push(res.data.data[i]):null
                }
                that.setData({
                    orderlist:res.data.data,
                    todayOrderList:todayList
                })
                console.log(that.data.todayOrderList)
            }
          })
    },

    //点击切换标题
    titleClick:function(e){
        var type=e.currentTarget.dataset.type
        this.setData({
            current:!this.data.current
        })
    },

    //跳转详情页面
    toOrderDetail:function(e){
        const index=e.currentTarget.dataset.index
        const orderId=this.data.orderlist[index].id
        console.log(orderId)
        wx.navigateTo({
          url: '/subpackages/orderDetails/orderDetails?orderId='+orderId,
        })
    }

    
})
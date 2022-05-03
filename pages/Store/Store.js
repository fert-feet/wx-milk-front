

var that
Page({
    data: {
        storeCurrent: 1,
        storeList: [{
            id:1,
            address: '四川省高新区环球中心乐天百货',
            isShowToYou: true,
            isCollection: 1,
            storeName: '茶百道高新区店',
            status: 1,
            distance: 0.80,
            hotLine: '18428327839',
            beginTime: '10:30',
            endTime: '21:00'
        },
    ],
    },

    onLoad:function(){
       that=this
       this.getStoreInfo()
    },

    //加载店铺
    getStoreInfo:function(){
        wx.request({
            url: 'http://localhost:8085/store/info',
            success(res){
                const data =res.data.data
                that.setData({
                    storeList:data
                })
            }
          })
    },


    //跳转点单
    toMenu:function(e){
        var index=e.currentTarget.dataset.index
        var storeList=this.data.storeList
        var storeInfo={
            id:storeList[index].id,
            storeName:storeList[index].storeName,
            address:storeList[index].address
        }
        wx.setStorageSync('storeInfo', storeInfo)
        wx.navigateTo({
          url: '/pages/menu/menu',
        })
    }


})
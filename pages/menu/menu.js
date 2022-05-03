var that
Page({
    data: {
        cartList: [],
        cartNum: 0,
        orderTotal: 0,
        storeInfo: {
            id: 1,
            storeName: '茶百道高新区店',
            address: ''
        },
        productListDatas: [{
                id: 1,
                number: 0,
                price: 16,
                productName: '乌龙桃子',
                detailRemarks: '非常好喝的奶茶',
                imgUrl: 'http://res.hualala.com/basicdoc/e7b6cb17-ae51-484a-8970-3e414054955d.jpg'
            },
            {
                id: 2,
                number: 0,
                price: 18,
                productName: '葡萄布丁',
                detailRemarks: '非常好喝的奶茶',
                imgUrl: 'http://res.hualala.com/basicdoc/e7b6cb17-ae51-484a-8970-3e414054955d.jpg'
            },
        ],
        confirmButtonText: '去结算'
    },

    onLoad: function () {
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
        that=this
        this.setData({
            storeInfo: wx.getStorageSync('storeInfo'),
        })
        this.getCommodityInfo()
    },

    //加载商品
    getCommodityInfo:function(){
        wx.request({
          url: 'http://localhost:8085/commodity/info',
          success(res){
              const data=res.data.data
              that.setData({
                  productListDatas:data
              })
          }
        })
    },

    //添加商品
    add: function (e) {
        const index = e.currentTarget.dataset.index
        var productList = this.data.productListDatas
        var cartList = this.data.cartList
        var flag = "productListDatas[" + index + "].number"
        var number = productList[index].number
        number++
        var cartNum = this.data.cartNum
        cartNum++
        if (number == 1) {
            cartList.push(this.data.productListDatas[index])
        }
        this.setData({
            [flag]: number,
            cartNum: cartNum,
            cartList: cartList
        })
        this.countCart()
    },

    //减少商品
    sub: function (e) {
        var productList = this.data.productListDatas
        var cartList = this.data.cartList
        const index = e.currentTarget.dataset.index
        var flag = "productListDatas[" + index + "].number"
        var number = productList[index].number
        number--
        var cartNum = this.data.cartNum
        cartNum--
        if (number == 0) {
            var i = cartList.indexOf(productList[index])
            console.log(i)
            i != -1 ? cartList.splice(i, 1) : null
        }
        this.setData({
            [flag]: number,
            cartNum: cartNum,
            cartList: cartList
        })
        this.countCart()
    },

    //计算商品总价
    countCart: function () {
        var sum = 0
        var cartList = this.data.cartList
        console.log(cartList)
        for (var i = 0; i < cartList.length; i++) {
            sum = sum + cartList[i].price * cartList[i].number
        }
        this.setData({
            orderTotal: sum
        })
    },

    //跳转确认订单
    goConfirmOrder: function () {
        if (this.data.cartList.length <= 0) {
            wx.showToast({
                title: '请选择商品下单~',
                icon: 'none'
            })
            return;
        }
        wx.showLoading({
            title: '正在结算',
        })
        wx.setStorageSync('storeInfo', this.data.storeInfo)
        wx.setStorageSync('shoppingCar', this.data.cartList)
        wx.setStorageSync('sumNum', this.data.cartNum)
        wx.setStorageSync('orderTotal', this.data.orderTotal)
        setTimeout(() => {
            wx.hideLoading()
            wx.navigateTo({
                url: '/pages/confirmOrder/confirmOrder',
            })
        }, 750)
    }
})
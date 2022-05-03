Page({
    data: {
        phoneNumber: '',
        remarks: "不要辣椒",
        sumNum: 2,
        orderTotal: 18,
        shoppingCar: [{
            id: 1,
            number: 2,
            productName: '乌龙桃子',
            price: 20,
            imgUrl: 'http://res.hualala.com/basicdoc/e7b6cb17-ae51-484a-8970-3e414054955d.jpg'
        }],
        storeInfo: {
            id: 1,
            storeName: '茶百道高新区店',
            address: '在高新区'
        },
        isShowConfirmStoreAdress: 0,
        channelType: 1,
    },

    onLoad: function () {
        this.setData({
            storeInfo: wx.getStorageSync('storeInfo'),
            shoppingCar: wx.getStorageSync('shoppingCar'),
            sumNum: wx.getStorageSync('sumNum'),
            orderTotal: wx.getStorageSync('orderTotal'),
        })
    },

    //从备注页面跳转回来
    onShow: function () {
        const remarks = wx.getStorageSync('remarks')
        this.setData({
            remarks: remarks
        })
    },

    //确认门店弹窗  
    confirmOrder: function () {
        const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(this.data.phoneNumber==''||!regMobile.test(this.data.phoneNumber)){
            wx.showToast({
              title: '请正确输入手机号',
              icon:'none'
            })
            return;
        }
        this.setData({
            isShowConfirmStoreAdress: 1,
        })
    },

    //确认支付
    confirmtoSubmit: function () {
        wx.showLoading({
            title: '正在支付',
        })
        var data = {
            userId: wx.getStorageSync('userId'),
            phoneNumber: this.data.phoneNumber,
            remarks: this.data.remarks,
            orderTotal: this.data.orderTotal,
            sumNum: this.data.sumNum,
            commodities: this.data.shoppingCar,
            storeInfo: this.data.storeInfo
        }
        wx.request({
            url: 'http://localhost:8085/order/create',
            method: 'POST',
            data: data,
            success(res) {
                if (res.data.code == 200) {
                    setTimeout(() => {
                        wx.showToast({
                            title: '支付成功',
                            icon: 'success'
                        })
                    }, 450)
                    setTimeout(() => {
                        wx.reLaunch({
                            url: '/subpackages/orderDetails/orderDetails?orderId='+res.data.data,
                        })
                    }, 750)
                }else{
                    wx.showToast({
                      title: '下单失败',
                      icon:'error'
                    })
                }
            }
        })
    },

    //关闭确认弹窗
    closeConfirm: function () {
        this.setData({
            isShowConfirmStoreAdress: 0
        })
    },

    //跳转备注
    goRemarks: function () {
        wx.setStorageSync('remarks', this.data.remarks)
        wx.navigateTo({
            url: '/subpackages/remarks/remarks',
        })
    },

    //电话号码输入
    phoneInput: function (e) {
        var phoneNum = e.detail.value
        this.setData({
            phoneNumber: phoneNum
        })
    }
})
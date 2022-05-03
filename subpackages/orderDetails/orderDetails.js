var that
Page({
    data: {
        order: {
            id: 1,
            stateName: '已完成',
            status: 18,
            takeNumber: 202,
            storeName: '高新区店',
            address: '在高新区',
            orderTotal: 40,
            orderCode: '54545455454544',
            orderTime: '2022 06-14 22:30',
            remarks: '不要辣椒',
            productDetail: [{
                imgUrl: 'http://res.hualala.com/basicdoc/e7b6cb17-ae51-484a-8970-3e414054955d.jpg',
                productName: '乌龙桃子',
                price: 20,
                number: 2,
            }]
        },
        isShowTakeNumber: 1,
        isShowCompleteUi: 0,
        orderStatusList: [{
            statusCode: 2,
            statusName: "已下单",
            imgUrl: "https://image.streffy.com/splus/images/p_10_1647878005520.png",
            unImgUrl: "https://image.streffy.com/splus/images/p_10_1647877268336.png",
            isThis: 0
        }, {
            statusCode: 21,
            statusName: "制作中",
            imgUrl: "https://image.streffy.com/splus/images/p_10_1647878013338.png",
            unImgUrl: "https://image.streffy.com/splus/images/p_10_1647877260339.png",
            isThis: 0
        }, {
            statusCode: 26,
            statusName: "待取餐",
            imgUrl: "https://image.streffy.com/splus/images/p_10_1647878021030.png",
            unImgUrl: "https://image.streffy.com/splus/images/p_10_1647877254632.png",
            isThis: 0
        }, {
            statusCode: 101,
            statusName: "已完成",
            imgUrl: "https://image.streffy.com/splus/images/p_10_1647878024818.png",
            unImgUrl: "https://image.streffy.com/splus/images/p_10_1647877249884.png",
            isThis: 0
        }],
    },

    onLoad: function (option) {
        that=this
        this.setData({
            "order.id": option.orderId,
        })
        this.getOrderDetail()
    },

    // 获取订单详情
    getOrderDetail: function () {
        wx.request({
            url: 'http://localhost:8085/order/detail',
            method: 'POST',
            data: {
                userId: wx.getStorageSync('userId'),
                orderId: this.data.order.id
            },
            success(res) {
                if(res.data.code!=200){
                    wx.showToast({
                      title: '获取数据失败',
                      icon:'error'
                    })
                    setTimeout(()=>{
                        wx.reLaunch({
                            url: '/pages/order/order',
                          })
                    },450)
                }
                that.setData({
                    order: res.data.data
                })
                console.log("+++++"+res.data.code)
                var orderStatusList = that.data.orderStatusList
                var order = res.data.data
                for (var i = 0; i < orderStatusList.length; i++) {
                    var statusCode = orderStatusList[i].statusCode
                    var flag = "orderStatusList[" + i + "].isThis"
                    if (order.status == statusCode) {
                        that.setData({
                            [flag]: 1,
                        })
                    }
                }
            }
        })
    }
})
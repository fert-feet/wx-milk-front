var that
Page({
    data: {
        userInfo:null,
        levelName:"初级茶粉",
        topBannerList: null,
        channelType: 1,
        memberScore: 0,
        authViewBuy: !1,
        storeSize: 0,
        memberPoint: 0,
        isShowNewWxAuth: !0,
        isSetBirthday: !1,
    },

    onLoad:function(){
        if(wx.getStorageSync('userId')==''){
            wx.showToast({
              title: '请点击登录按钮登录',
              icon:'none'
            })
        }
    },

    //跳转选择店铺
    goStore: function () {
        wx.reLaunch({
            url: '/pages/Store/Store',
        })
    },

    //登录
    doLogin:function(){
        that=this
        wx.getUserProfile({
            desc: '用于登录',
            success(resd){
                const rawData= JSON.parse(resd.rawData)
                console.log(rawData)
                wx.login({
                    success(res){
                        console.log(res.code)
                        wx.request({
                          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx31cca75be7002e23&secret=c5895d3abb8f09878e08ff7088887752&js_code='+res.code+'&grant_type=authorization_code',
                          success(res){
                              wx.request({
                                url: 'http://localhost:8085/user/login',
                                method:'POST',
                                data:{
                                    openId:res.data.openid,
                                    nickName:rawData.nickName,
                                    avatarUrl:rawData.avatarUrl,
                                },
                                success(res){
                                    wx.setStorageSync('userId', res.data.data.id)
                                    that.setData({
                                        userInfo:rawData,
                                         "userInfo.memberScore":res.data.data.memberScore
                                    })
                                }
                              })
                          }
                        })
                    }
                })
            }
          })
        
        
    }
})
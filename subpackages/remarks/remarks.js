Page({
    data:{
        remarks: "",
    },

    onLoad:function(option){
        const remarks=wx.getStorageSync('remarks')
        this.setData({
            remarks:remarks
        })
    },

    //提交备注
    confirm:function(){
        wx.setStorageSync('remarks', this.data.remarks)
        wx.navigateBack({
            delta:1
        })
    },

    //输入备注
    inputRemarks:function(e){
        var remarks=e.detail.value
        this.setData({
            remarks:remarks,
            remarkLength:remarks.length
        })
    }
})
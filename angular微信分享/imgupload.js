'use strict';

/**
 * @ngdoc service
 * @name doctorApp.imgUpload
 * @description
 * # imgUpload
 * Service in the doctorApp.
 */
angular.module('appApp')
  .service('imgUpload', function ($http, cfg, $location, $q, $rootScope) {
  
    return {
      initWxSdk : function(){
        $http({
          method: 'get',
          url: cfg.baseUrl+'api/wechat/getSignPackage'+'?url='+encodeURIComponent($location.absUrl().split('#')[0])
        }).then(function successCallback(data){
          wx.error(function(res){
            alert(JSON.stringify(res));
          });
          wx.config({
            debug: false,
            appId: data.data.appId,
            timestamp: parseInt(data.data.timestamp),
            nonceStr: data.data.nonceStr,
            signature: data.data.signature,
            jsApiList: ['chooseImage',
                        'uploadImage',
                        'downloadImage',
                        'previewImage',
                        'updateAppMessageShareData', //分享给好友
                        'updateTimelineShareData', //分享到朋友圈
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'getLocation',
                        'openLocation',
                        'scanQRCode',
                        'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        },function errorCallback(data){
          // alert(JSON.stringify(res));
        });
      },

      newshare : function(title,descption,shareWxLink,img,friend_title,friend_desc,friend_link,friend_img){
        title = title?title:'泌尿肿瘤多中心精准医疗';
        descption = descption?descption:'泌尿肿瘤多中心精准医疗';
        if(shareWxLink){
          shareWxLink=shareWxLink.replace(cfg.baseUrl,"")
        }
        shareWxLink = shareWxLink?shareWxLink:'/index.php?s=/Home/Index/medicinelogin';
        img = img?img:'/Public/yaochang/app/images/mobile_logos2.png';
        friend_img = friend_img?friend_img:'/Public/yaochang/app/images/mobile_logos.png';
        friend_title = friend_title?friend_title:title;
          //新分享给朋友圈
          wx.updateTimelineShareData({
  
            title: friend_title, // 分享标题
  
            link: cfg.baseUrl+shareWxLink, // 分享链接
  
            imgUrl: cfg.baseImgUrl +img // 分享图标
  
          });
          //新分享给朋友
          wx.updateAppMessageShareData({
  
            title: title, // 分享标题
  
            desc: descption, //分享描述
  
            link: cfg.baseUrl+shareWxLink, // 分享链接
  
            imgUrl: cfg.baseImgUrl +friend_img // 分享图标
  
          });
      }

    }
  });

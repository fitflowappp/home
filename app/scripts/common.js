/**
 * Created by qwr on 2016/7/19.
 */
var common = (function () {
  //获取地址栏参数
  function getUrlParam(name, url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }

  // 设置cookies函数
  function setCookie(name, value, day) {
    var path = ';path=/;';
    if (day) {
      var Days = day;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toGMTString() + path;
    } else {
      document.cookie = name + '=' + encodeURIComponent(value) + path;
    }
  }

  // 取cookies函数
  function getCookie(name) {
    var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr != null) return decodeURIComponent(arr[2]);
    return null;
  }

  // 删除cookie函数
  function delCookie(name) {
    var path = ';path=/;';
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + path;
  }

  // 定时关闭modal
  function autoCloseModal(time) {
    var time = time ? time : 1000;
    setTimeout(function () {
      $('div.modal').modal('hide');
    }, time);
  }

  // 滚动到 scrollTo obj > css select || number
  function scrollTo(obj, time, auto) {
    var time = time ? time : 100,
      top = obj ? (/^\d+(\d|px)$/gi.test(obj) ? obj : $(obj).offset().top) : 0;
    if (auto) {
      top = top + parseInt(auto);
    }
    $('html, body').animate({
      scrollTop: top
    }, time);
  }

  // 客户端/智能机 && 浏览器信息
  function agentBrowser() {
    var ua = navigator.userAgent, app = navigator.appVersion;
    // 客户端 浏览器版本信息
    return {
      trident: ua.indexOf('Trident') > -1, // IE内核
      presto: ua.indexOf('Presto') > -1, // opera内核
      webKit: ua.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1,// 火狐内核
      mobile: !!ua.match(/AppleWebKit.*Mobile.*/) || !!ua.match(/Android|iPhone|iPad|iPod|BlackBerry/i), // 是否为移动终端
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: ua.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: ua.indexOf('iPad') > -1, // 是否iPad
      webApp: ua.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
      weixin: ua.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: ua.indexOf('QQ') > -1, // 是否QQ
      weibo: ua.indexOf('Weibo') > -1
    };
  }


  return {
    getUrlParam: getUrlParam,
    setCookie: setCookie,
    getCookie: getCookie,
    delCookie: delCookie,
    autoCloseModal: autoCloseModal,
    scrollTo: scrollTo,
    agentBrowser: agentBrowser,
  }
})();

/*启动时加载*/
(function () {
  var ios=common.getUrlParam('ios');
  if(!ios){
    $(".wrap.privacy-policy header").show();
    $(".wrap.privacy-policy nav").show();
    $(".wrap.privacy-policy footer").show();
  }
})();

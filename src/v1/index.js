//js不可逆混肴
// https://www.sojson.com/jsobfuscator.html

//获取点击下一课件按钮
var btn_next = window.top.w_main.w_code.document.querySelector("#btnNext");

var time_next = 1 * 60 * 1000,//下一课件定时器时长
    time_page = 0.5 * 60 * 1000;//翻页定时器时长

if (btn_next) {
    console.log("----------------------------------------------------------------");
    console.log(time_next / 1000 + " 秒后开始自动播放课件了...");
    console.log("----------------------------------------------------------------");

    var t_next, t_page;

    t_next = setInterval(function () {

        t_page && clearTimeout(t_page);

        console.log("----------------------------------------------------------------");
        console.log("播放下一个课件...");
        btn_next.click();

        console.log(time_page / 1000 + " 秒后获取课件页数...");
        t_page = setTimeout(() => {
            //此处应延时，等课件内容加载完毕，否则获取到的是上个课件的页数
            var btns = getBtnPages();
            if (btns.length > 1) {
                for (let i = 1; i <= btns.length; i++) {
                    //闭包解决定时器内i值错乱问题
                    (function (num) {
                        setTimeout(() => {
                            console.log("第 " + num + " 页");
                            btns[num - 1].click();
                            if (num == btns.length) {
                                console.log("翻页完成，等待切换下一个课件...");
                            }
                        }, num * 1000)
                    })(i);
                }
            }
        }, time_page);

    }, time_next);
} else {
    console.warn("找不到 <下一个> 按钮，请检查！");
}

/**获取当前课件的翻页按钮DOM集合 */
function getBtnPages() {
    let btns = window.top.w_main.w_lms_content.w_sco.w_content.w_sco.frameElement.contentDocument.querySelectorAll(".chapter span");

    if (btns.length > 1) {
        console.log("本课件有 " + btns.length + " 页，将进行翻页");
    } else {
        console.log("本课件仅 " + btns.length + " 页，无需翻页");
    }

    return btns;
}

//20190110641613
//获取登录用户id
var id = window.top.w_top.document.querySelector(".fnt_title").innerText
console.log(id)
id = id.substring(0, id.indexOf('('));
console.log(id)

function input() {
    //输入学号验证
    var id_input = prompt("请输入你的学号!", "");

    if (id_input) {
        if (id != id_input) {
            alert('学号输入错误，请再次输入！');
            input();
        }
        console.log("输入的值为:", id_input);
    } else {
        console.log("您取消输入了");
    }
}
input();

//chrome控制台引入jquery
//;(function(d,s){d.body.appendChild(s=d.createElement('script')).src='http://code.jquery.com/jquery-1.9.1.min.js'})(document);
function ajax() {
    let result = $.ajax({ url: "https://files.cnblogs.com/files/iSuwei/customers.js", async: false });
    console.log(result.responseText)
}
ajax();

//获取页面标记是否已完成
//" 您正在学习课件...，本内容10分，你已累计获取0.00分，学习了00:06:35。最少要求学习60秒。"
//"已经学习完毕！获取了10分/总分10分。总计学习时间为：00:02:03。"
function isComplete() {
    let foot_remark = window.top.w_main.w_lms_content.document.querySelector("#tdRemark").innerText;

    if (foot_remark.indexOf('您正在学习课件') > -1) {
        console.log("正在学习");
        return false;
    }
    else if (foot_remark.indexOf('已经学习完毕') > -1) {
        console.log("已经学习完毕");
        return true;
    }
}
isComplete();

//清除控制台信息
console.clear();


/**
 * **********************************************
 * 待解决问题
 * **********************************************
 * 1、找一个在线文件服务平台，存放已授权的学号信息
 * https://www.baidu.com/s?wd=%E5%85%8D%E8%B4%B9%E6%96%87%E4%BB%B6%E7%9B%B4%E9%93%BE&rsf=1000002&rsp=0&f=1&oq=%E6%96%87%E4%BB%B6%E5%AD%98%E5%82%A8&ie=utf-8&rsv_idx=1&rsv_pq=8056c9b5003bd304&rsv_t=ee534f6T3nDq2jFdeDCuVWhp9BLxRdBvXcoyrNueb5Z0Yeg4RuA7wDjWe3Q&rqlang=cn&rs_src=0
 *
 * 2、学号验证、有效期验证
 *
 * 3、当前课件学习进度检测，完成后自动下一个
 * 
 * 4、脚本加载完成之后，提示输入start()并回车，开始自动刷课件
 */
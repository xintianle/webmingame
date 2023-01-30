$(function () {
    //编写jQuery相关代码
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    //点击关闭规则界面
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    //开始按钮的点击监听
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用灰太狼动画的方法
        startWolfAnimation();
    });
    //监听重新开始按钮的事件
    $(".restart").click(function () {
       $(".mask").stop().fadeOut(100);
        //调用处理进度条的方法
        progressHandler();
        //调用灰太狼动画的方法
        startWolfAnimation();
    });
    //定义一个专门处理进度条的方法
    function progressHandler() {
        //得分重置
        $(".score").text(0);
        //设置规则不可点击，避免误触
        $(".rules").prop("disabled",true);
        //重新设置进度条宽度
        $(".progress").width(180);
        //开启定时器处理进度条
        var timer = setInterval(function () {
            //拿到进度条的进度
            var progressWidth = $(".progress").width();
            progressWidth -= 1;
            //重新给进度条赋值
            // $(".progress").css({
            //     width: progressWidth +"px"
            // });
            $(".progress").width(progressWidth);
            if (progressWidth<=0) {
                //关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                //停止灰太狼的动画
                stopWolfAnimation();
            }
            }, 200);
    }
    //狼的计时器
    var wolfTimer;
    //定义一个灰太狼动画结束的方法
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
    //定义一个灰太狼动画开启的方法
    function startWolfAnimation() {
        //定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png', './images/h3.png','./images/h4.png',
            './images/h5.png','./images/h5.png','./images/h7.png','./images/h8.png','./images/h9.png',]
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png', './images/x3.png','./images/x4.png',
            './images/x5.png','./images/x5.png','./images/x7.png','./images/x8.png','./images/x9.png',]
        //定义一个数组用来保存图片出现的位置
        var arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
            ];
        //创建一个图片显示狼
        var $wolfImage = $("<img src='' class='wolfImage'>");
        //随机获取图片显示位置
        var posIndex = Math.round(Math.random() * 8);
        //设置图片显示位置
        $wolfImage.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        });
        //随机获取狼
        var wolfType = Math.round(Math.random())?wolf_1:wolf_2;
        //设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5
        wolfTimer = setInterval(function () {
            // if (wolfIndex>wolfIndexEnd) {
            //     $wolfImage.remove();
            //     clearInterval(wolfTimer);
            //     startWolfAnimation();
            //     // _wolfIndex = wolf_1.length - wolfIndex;
            // }
            var _wolfIndex = wolfIndex>wolfIndexEnd?wolfType.length - wolfIndex:wolfIndex;
            if (wolfIndex === wolfType.length) {
                stopWolfAnimation();
                startWolfAnimation();
            }
            // console.log(_wolfIndex);
            $wolfImage.attr("src", wolfType[_wolfIndex]);
            // $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 300);
        //将图片添加到界面上
        $(".container").append($wolfImage);
        //调用处理游戏规则的方法
        gameRules($wolfImage);
    }
    function gameRules($wolfImage) {
        $wolfImage.one("click", function () {
            window.wolfIndex = 6
            window.wolfIndexEnd = 9
            var $src = $wolfImage.attr("src");
            var flag = $src.indexOf("h") >= 0;
            if (flag) {
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }


});
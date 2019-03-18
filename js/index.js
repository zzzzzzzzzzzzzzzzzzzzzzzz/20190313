// window.onload = function () {
window.addEventListener('DOMContentLoaded', function () {
    //获取dom对象
    var headerListNodes = document.querySelectorAll('.nav li');
    var arrowNodes = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content_main');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var nowIndex = 0;
    var wheelTime = null;


    headerHandle();

    //处理头部的函数
    function headerHandle() {
        //初始化小箭头到第一个li下边
        arrowNodes.style.left = headerListNodes[0].getBoundingClientRect().left + headerListNodes[0].offsetWidth / 2
            - arrowNodes.offsetWidth / 2 + 'px';
        headerDownNodes[0].style.width = '100%';

        for (var i = 0; i < headerListNodes.length; i++) {
            headerListNodes[i].index = i;
            headerListNodes[i].onclick = function () {
                nowIndex = this.index;
                move(nowIndex);
            }
        }
    }


    //移动函数  公共部分
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '';
        }
        headerDownNodes[nowIndex].style.width = '100%';
        arrowNodes.style.left = headerListNodes[nowIndex].getBoundingClientRect().left + headerListNodes[nowIndex].offsetWidth / 2
            - arrowNodes.offsetWidth / 2 + 'px';
        contentUlNode.style.top = -nowIndex * contentHeight + 'px';
    }
    move(2);

    //内容部分
    contentHandle()

    function contentHandle() {
        var lastTime = 0;
        document.onmousewheel = wheel;
        document.addEventListener('DomMouseScroll', wheel);

        function wheel(event) {
            var nowTime = Date.now();
            if (nowTime - lastTime <= 1500) return;
            lastTime = nowTime;
            event = event || window.event;

            var flag = '';
            if (event.wheelDelta) {
                //ie/chrome
                if (event.wheelDelta > 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            } else if (event.detail) {
                //firefox
                if (event.detail < 0) {
                    flag = 'up';
                } else {
                    flag = 'down'
                }
            }

            switch (flag) {
                case 'up' :
                    if (nowIndex > 0) {
                        nowIndex--;
                        move(nowIndex);
                    }
                    // console.log('up')
                    // console.log(contentUlNode.style.top);
                    break;
                case 'down' :
                    if (nowIndex < 4) {
                        nowIndex++;
                        move(nowIndex);
                    }
                    console.log('down');
                    break;
            }


            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }

    //页面大小变化的优化
    window.onresize = function () {
        arrowNodes.style.left = headerListNodes[nowIndex].getBoundingClientRect().left + headerListNodes[nowIndex].offsetWidth / 2
            - arrowNodes.offsetWidth / 2 + 'px';
        contentUlNode.style.top = -nowIndex * contentHeight + 'px';
    }
    //第一屏
    firstScreenHandle()

    function firstScreenHandle() {
        // console.log('111');
        var homeCarouselNodes = document.querySelectorAll('.home_carousel li');
        var homePointNodes = document.querySelectorAll('.home_point li');
        var homeNode=document.querySelector('.home');
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        var timer=null;
        // console.log(lastIndex);
        // console.log(nowIndex);
        // console.log(homePointNodes);
        //给每一小圆点添加事件
        for (var i = 0; i < homePointNodes.length; i++) {
            homePointNodes[i].index = i;
            // console.log('111');
            homePointNodes[i].onclick = function () {
                // console.log(Date.now());
                var nowTime = Date.now();
                if (nowTime - lastTime <= 2000) return;
                lastTime = nowTime;
                nowIndex = this.index;
                console.log(nowIndex);
                if (nowIndex === lastIndex) return;
                if (nowIndex > lastIndex) {
                    console.log('111')
                    //点击是右边 右边加上rightshow 左边加上lefthidden
                    homeCarouselNodes[nowIndex].className = 'common-title right-Show';
                    homeCarouselNodes[lastIndex].className = 'common-title left-Hidden';
                } else {
                    //点击是左边
                    console.log('222')
                    homeCarouselNodes[nowIndex].className = 'common-title left-Show';
                    homeCarouselNodes[lastIndex].className = 'common-title right-Hidden';
                }
                homePointNodes[lastIndex].className = '';
                this.className = 'active';
                lastIndex = nowIndex;
            }
        }

        homeNode.onmouseenter=function(){
            clearInterval(timer);
        }
        homeNode.onmouseleave=function(){
            autoPlay();
        }

        // 第一屏定时器
        autoPlay();
        function autoPlay(){
            timer= setInterval(function () {
                nowIndex++;
                if (nowIndex >= 4) nowIndex=0;
                homeCarouselNodes[nowIndex].className = 'common-title right-Show';
                homeCarouselNodes[lastIndex].className = 'common-title left-Hidden';

                homePointNodes[lastIndex].className = '';
                homePointNodes[nowIndex].className = 'active';
                lastIndex = nowIndex;
            }, 2500);
        }


    }
})




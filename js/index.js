// window.onload = function () {
window.addEventListener('DOMContentLoaded',function () {
    //获取dom对象
    var headerListNodes = document.querySelectorAll('.nav li');
    var arrowNodes = document.querySelector('.arrow');
    var headerDownNodes = document.querySelectorAll('.down');
    var contentUlNode = document.querySelector('.content_main');
    var contentNode = document.querySelector('.content');
    var contentHeight = contentNode.offsetHeight;
    var nowIndex = 0;


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
                nowIndex=this.index;
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

    //内容部分
    contentHandle()
    function contentHandle(){
        document.onmousewheel = wheel;
        document.addEventListener('DomMouseScroll', wheel);
        function wheel(event) {
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


})

// }


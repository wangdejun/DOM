
#DOM

## 事件(EVENT)

* 注册事件兼容
```js
//如果有addEventListener,则使用，否则式样compatible way方式：
var addEvent = document.addEventListener ? 
    function(elem, type, listener, useCapture){
        elem.addEventListener(type, listener, useCapture);
    }:
    function(elem, type, listener, useCapture){
        //事件类型与W3C不一致，多了一个on;
        //注册事件的函数名也不一样：attachEvent('onmouseover',function(){//});
        //IE低版本，没有capture phase,所以useCaptue也没有意义。
        elem.attachEvent('on'+ type, listener);
    }

//如果有delEventListener,则使用，否则式样compatible way方式：
var delEvent = document.removeEventListener ?
    function(elem, type, listener, useCapture){
        elem.removeEventListener(type, listener, useCapture);
    }:function(elem, type, listener, useCapture){
        //事件类型与W3C不一致，多了一个on;
        //注册事件的函数名也不一样：detachEvent('onmouseover',function(){//});
        //IE低版本，没有capture phase,所以useCaptue也没有意义。
        elem.detachEvent('on'+ type, listener);
    }
```

```js
// event object
var elem = document.getElementById('div1')
var clickHanler = function(event){
    //IE下，event object 放在window下：
    event = event || window.event;
    //Things that you want to do;
}

addEvent(elem, 'click', clickHanler, false);
```
* 事件属性
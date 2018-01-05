
# DOM知识纵览

## 事件(EVENT)
<a href='https://www.w3.org/TR/uievents/#event-type-load'>W3C标准</a>****

* 注册事件(兼容)
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

* 获取事件对象(兼容)
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

* 属性
    * type
    * target(srcElement)
    * currentTarge
* 方法
    * 阻止时间传播
        * event.stopPropagation()(W3C)
        * event.cancelBubble = true(IE)
        * event.stopImmediatePropagation(W3C)
    * 默认行为
        * Event.preventDefault(W3C)
        * Event.returnValue = false(IE低版本)
        * stopImmediatePropagation()

* 拖拽例子：
```js
var elem = document.getElementById('div1');
var clientX, clientY, moving;

var mouseDownHandler = function(event){
    event = event||window.event;
    clientX = event.clientX;
    clientY = event.clientY;
    moving = !0;
}
var mouseMoveHandler function(event){
    if(!moving) return;
    event = event||window.event;
    var newClientX = event.clientX,
        newClientY = event.clientY;
    var left = parseInt(elem.style.left)||0,
        top = parseInt(elem.style.top)||0;
    elem.style.left = left + (newClientX - clientX) + 'px';
    elem.style.top = top + (newClientY - clientY) + 'px';
    clientX = newClientX;
    clientY = newClientY;
}
var mouseUpHandler = function(event){
    moving = !1;
}

addEvent(elem, 'mousedown', mouseDownHandler);
addEvent(elem, 'mousemove', mouseMovingHandler);
addEvent(elem, 'mouseup'， mouseUpHandler);
```

* WheelEvent
    * 属性
        * deltaMode
        * deltaX
        * deltaY
        * deltaZ
* FocusEvent
    * blur 
    * focus
    * focusin 即将或得焦点时
    * focusout 元素将要失去焦点时
    * 扩展属性：
        * -relatedTarget:
* InputEvent:
    * beforeInput: 先触发这个事件，输入框还没有内容
    * input:不断输入内容时，不断触发input
    * onporopertychange(兼容IE)

* keyboardEvent:
    * keydown
    * keyup
    * 属性
        * key
        * code
        * ctrlKey, shiftKey, altKey, metaKey
        * repeat：一个键重复按下，持续按
        * keyCode:Ascii码
        * charCode：Ascii码
        * which

### Event类型：
* load : window, image, iframe元素
* unload：关闭页面，window元素
* error:加载错误， window,image
* select: Element, input ,textarea
* abort: window image:触发图片的abort事件。

* window:
    * load
    * unload:关闭了当前页面
    * error:浏览器出现异常
* Image: 依赖网络加载
    * load: load事件，可知图片长宽
    * error:
    * abort:
常见例子
    ```html
    <img onerror = 'this.src = "host/default.jpg"'/>
    ````

### UIEvent
* resize | window/iframe
* scroll | document/div


### 事件代理
    * 优势：内存分配少，管理少
    * 全部放在顶层，比如window,所有事件都会冒泡到顶部，会处理各种类型各种元素的事件。


## 数据通信


方法      |   描述           |  是否包含主体
---------|------------------|-------------
GET    |从服务器获取一份文档 |     否
POST   |向服务器发送需要处理的数据| 是
PUT    |将请求的主体部分存储在服务器上 | 是
DELETE |从服务器上删除一个文档    |否
HEAD   |只从服务器上获取文档头部   | 否
TRACE  |对可能经过代理服务器传送到服务器上的去的报文进行追踪|否
OPTIONS|决定可以在服务器上执行哪些方法 |否

### 常见HTTP状态码
状态码    |  描述        |原因短语
---------|-------------|---------
200|请求成功|OK
301|资源移动|Moved Permanently
304|未修改，所请求资源未修改，浏览器读取缓存数据|Not Modified
400|请求语法错误,服务器无法理解|Bad Request
404|未找到资源，可以设置个性'404页面'|Not Found
500|服务器内部错误|Internal Server Error

### Ajax
* Jesse JamesGarretet
* Asynchronous Javascript and XML
* Ajax call example
```js
//step1: 创建对象
var xhr = new XMLHttpRequest();
//step2: 处理返回的数据，定义如何处理返回数据的方法:
xhr.onreadystatechange = function(callback){
    if(xhr.readyState == 4){
        检测状态码，进行数据处理，传入callback
        if((xhr.status>=200 && xhr.status<300>)||xhr.status == 304){
            callback(xhr.responseText);
        }else{
            alert('Request was unsuccessful'+ xhr.status);
        }
    }
}
// step3:发送请求
xhr.open('get', 'example.com/example.json', true);
xhr.setRequestHeader('myHeader', 'myValue');//send the request
xhr.send(null);
```

* open方法
    ```
    xhr.open(method, url[, async = true])
    ```
* setReuest方法
    ```js
    xhr.setRequestHeader(header,value);
    header: Content-Type
    value: application/x-www-form-urlencoded
            multipart/form-data
    ```
* send方法
    ```js
    //表示FormData
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send([data=null]);
    ```

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
* Asynchronous Javascript and XML
* 
* Ajax call example
```js
//step1: 调用构造函数创建对象
var xhr = new XMLHttpRequest();
//step2: 处理返回的数据，定义如何处理返回数据的方法:
//onreadystatechange属性是一个函数方法
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

* open方法：初始化一个请求. 该方法用于JavaScript代码中;如果是本地代码, 使用 openRequest()方法代替
```js
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

* serialize data function example

```js
function serialize(data){
    if(!data)
        return;
    var pairs = [];
    for(var name in data){
        if(!data.hasOwnProperty(name))
            continue;
        if(typeof data[name]==='function')
            continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name+'='+ value);
    }
    return pairs.join('&');
}
//GET示例
var url = 'example.json?'+ serialize(formdata);
xhr.open('get', url, true)//true表示异步操作
xhr.send(null);//get request
//POST示例
xhr.open('post','example.json', true)
xhr.send(serialize(formdata));
```

### 同源策略

### JSONP
* JSON with Padding:
    * 是JSON的一种使用模式，可用于解决浏览器跨域数据访问的问题。
    * 由于同源策略，一般来说，server.example.com的网页无法访问server1.example.com的服务器沟通，而HTML的script标签是例外。
    * JSONP抓到的不是JSON，而是JavaScript,使用JavaScript直译器而不是用JSON解析器解析。
    * 【劣势】 : 只能用于GET请求.
    * 【优势】 : 不需要单独配置服务器，可向不支持CORS的网站请求数据，可兼容低版本浏览器.

```js
//define a handle function to handle the response sent back;
function handleResponse(response){
    alert('My name is' + response.name);
}
var script = document.createElement('script');
script.src = 'http:127.0.0.0:3000/json?callback=handleResponse';
document.body.insertBefore(script, document.body.firstChild);
//return json.js
handleResponse({
    name:'NetEase'
})
```
* 封装一个POST方法
```js
//
function post(url, options, callback){
    //初始化xhr
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr =  new XMLHttpRequest();
    }else if(window.ActiveXObject){
        //兼容IE
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        alert("Request are not supportted");
    }
    //onreadystatechange事件触发一个处理函数，callback是如何处理数据
    xhr.onreadystatechange = function(callback){
        //readyState为4，数据拉取完毕
        if(xhr.readyState == 4){
            if((xhr.status>=200 && xhr.status<300)||(xhr.status==304)){
                callback(xhr.responseText);
            }else{
                alert('Request was unsuccessful' + xhr.status);
            }
        }
    }
    function serailize(data){
        //如果没有data,那么直接返回；
        if(!data)
            return;
        //遍历数据对象
        for(var name in data){
            // 遍历顶层属性，如果不存在key,直接跳过；
            if(!data.hasOwnProperty(name))
                continue;
            // 对象类型为function的直接跳过。
            if(!typeof data[name]==='function')
                continue;
            //value直接转为字符串，call the toString()方法；
            var value = data[name].toString();
            name = encodeURIComponent(name);
            value= encodeURIComponent(value);
            pairs.push(name + '=' +value);
        }
        return pairs.join('&');
    }
}
//
```
## 数据存储
* cookie
* 一小段文本文件
* 流量代价
* 安全性问题，明文
* 大小限制。****
* 

属性名       |      默认值       |      作用
------------|------------------|--------------
Name| | 名
Value| | 值
Domain|当前文档域|作用域
Path|当前文档路径|作用路径
Expires/Max-Age|浏览器会话时间| 失效时间
Secure| false| https协议时生效

```js
// trans a chunk of cookie text to a normal Object;
// example
function getcookie(){
    var cookie = {};
    var all = document.cookie;
    if(all==='')
        return cookie;//直接返回一个空对象{}
    var list = all.split('; ');
    for(var i=0;i<list.length;i++){
        var item= list[i]
        var p = item.indexOf("=");
        var name = item.substring(0, p);//substring取前不取后；
        name = decodeURIComponent(name);
        var value = item.substring(p+1);
        //serialized data => Object via decodeURIComponent
        //Object => serialized data via encodeURIComponent
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
```
Cookie Update/Change
```js
document.cookie = 'name = value'
```
```js
function setCookie(name, value, expires, path, domain, secure){
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if(expires)
        cookie += '; expires=' + expires.toGMTString();
    if(path)
        cookie += '; path=' + path;
    if(domain)
        cookie += '; domain=' + domain;
    if(secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
}
```
```js
function removeCookie(name, path, domain){
    //直接把max-age设置为0,j即可删除cookie
    document.cookie = name + '='
    +'; path='+path
    +'; domain='+domain
    +'; max-age=0';
}
```

### LocalStorage/session storage

### Animation
* a process bar example
```js
var process = function(processWrap, drtn, interval, callback){
    var width =processWrap.clientWidth;
    var process = process.getElementsByClassName('prcss')[0];
    var count = drtn/intrvl;
    var tmpCurrent = CURRENT;
    var step = function(){
        if(tmpCurrent != CURRENT){
            process.style.width = '0px';
            return;
        }
        var des = getNum(process.style.width) + offset;
        if(des < width){
            process.style.width = getNum(process.style.width)+offset+'px';
            setTimeout(step, interval);
        }else if(des = width){
            clearInterval(intervalId);
            process.style.width = '0px';
            PREV = NEXT;
            CURRENT = NEXT;
            NEXT++;
            NEXT = NEXT % NUMBER;
            if(callback)
                callback();
        }else{
            process.style.width = width + 'px';
        }
    }
    var timeoutId = setTimeout(step, interval);
}
//position trans example
var animation = function(ele, from, to, callback){
    var distance = Math.abs(to - from);
    var cover = 0;
    var symbol = (to-from)/distance;
    var stepLength = Math.floor((distance*step)/SPEED);
    var step = function(){
        var des = cover + stepLength;
        if(des < distance){
            cover += stepLength;
            ele.style.left = getNum(ele.style.left) + stepLength * symbol + 'px';
        }else{
            clearInterval(intervalId);
            ele.style.left = to + 'px';
            if(callback)
                callback();
        }
    }
    var intervalId = setInterval(step, STEP);
}
```


### BOM
* location:浏览定位和导航
    * location.href:浏览器跳转
        * location.assign(url)
        * location.replace(url)
        * location.reload();
* history:浏览历史
    * history.length;
    * location.back(int)
    * location.forward(int)
    * location.go(int)
* screen:属性
    * availHeight
    * Height
    * availWidth
    * width
* 方法

method name | description
------------|-------------
alert();confirm();prompt() | 三种对话框,会阻塞当前浏览器thread;
setTimeout(),setInterval()  | 计时器
open(), close() | 开关窗口，关闭窗口

* window事件
    属性名 | 描述
    ------|-----
    load | 文档和所有图片加载完毕时
    unload | 离开当前文档时
    beforeunload | 和unload类似，但是它提供询问用户是否确定离开的机会。
    resize | 拖动改变浏览器窗口大小时
    scroll | 拖动滚动浏览器时


### form表单
* elements
    * 包含该表单子孙表单控件(图片按钮除外)
    * 归属该表单的表单控件(图片按钮除外)
    * <b>是动态节点集合</b>

```html
<!--abd都属于form的elements集合-->
<form id='f'>
    <p><label><input name='a'></label></p>
    <p><label><input name='b'></label></p>
</form>
<p><label><input name='c'></label></p>
<p><label><input name='d' form='f'></label></p>
```

* testForm.elements[0]
* testForm.elements['a']
* testForm[0]
* testForm['a']

* form[name]
    * 返回id或name为指定名称的表单控件(除图片外)
    * 如果结果为空，则返回id为指定名称的img元素。
* form方法
    * reset() input, keygen, output, select, textarea;
    * submit()
    * checkValidity()

* label
    * htmlFor
        * 关联表单控件激活行为
        * 可关联因素：button, input， keygen, meter, output, progress, select, textarea

    * form 
        * 关联归属表单
        * 可关联元素：button fieldse input keygen
        * 制度属性，不可以在程序中修改
            * label.setAttribute('form', 'newFormId');

*input
    * type
        * 元素外观
        * 数据类型
        * 默认为text
        * input type可以的类型：hidden, text, search, tel, url, email, password, date, time, number, color, range, checkbox, radio, file, submit, image, reset, button

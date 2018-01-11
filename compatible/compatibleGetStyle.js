
实现兼容的getStyle函数

getStyle函数用于获取元素的实际样式，语法如下：
var cssPropertyValue = getStyle (element, cssPropertyName)；
使用示例如下：
    getStyle(element, "color") 返回element元素的显示颜色，如："rgb(0, 0, 0)" 
    getStyle(element, "line-height") 返回element元素的实际行高，如："30px" 
请实现getStyle函数，要求浏览器兼容。

//w3c: getComputedStyle
//IE:currentStyle
// window.getComputedStyle(element, null)[cssPropertyName]
// element.currentStyle[cssPropertyName]

function getStyle(element, cssPropertyName){
    var cssPropertyName = cssPropertyName;
    if(!cssPropertyName){
        console.log('via here');
        cssPropertyName = String(cssPropertyName);
    }
    if(window.getComputedStyle){
        return window.getComputedStyle(element, null)[cssPropertyName];
    }else{
        return element.currentStyle[cssPropertyName];
    }
}
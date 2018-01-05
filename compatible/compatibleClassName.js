//IE6 IE7 IE8 不兼容getElementsByClassName('classname')方法;
//如何做兼容？

function getElementsByClassName(root,className){
    if(root.getElementsByClassName){
        return root.getElementsByClassName(className);
    }else{
        var elements = root.getElementsByClassName('*');
        var result;
        for(var i=0, elements;elements=elements[i];i++){
            if(hasClassName(element, className)){
                result.push(element);
            }
        }
        return result;
    }
}
//用element.getAttribute 来查看元素是否具有某种属性。
function hasClassName(element, className){
    if(element.getAttribute(className)){
        return true;
    }else{
        return false;
    }
}

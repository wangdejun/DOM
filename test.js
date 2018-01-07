var sUrl = 'http://www.nowcoder.com?key=1&key=2&key=3&test=4&jian=wang&hello=world&hello=niniubi#hehe';


function getUrlParam(sUrl, sKey) {
	var urlString = sUrl.match(/\?([^\?*^#]*)/);
	var arr = urlString[1].split('&');
    var obj = {};
    for(var i=0;i<arr.length;i++){
        arr[i] = arr[i].split('=');
        if(!obj.hasOwnProperty(arr[i][0])){
            obj[arr[i][0]]= arr[i][1];
        }else if(obj[arr[i][0]] instanceof Array){
            obj[arr[i][0]].push(arr[i][1]);
        }else{
            var tempValue = obj[arr[i][0]];
            obj[arr[i][0]] = [];
            obj[arr[i][0]].push(tempValue);
            obj[arr[i][0]].push(arr[i][1]);
        }
    }
    
    if(sKey){
        if(obj.hasOwnProperty(sKey)){
            return obj[sKey];
        }else{
            return '';
        }
    }else{
        return obj;
    }
}
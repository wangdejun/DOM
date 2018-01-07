x = 0;
var intervalId = setInterval(function(){
    console.log("Hello");
    x++;
    }, 100);

if(x>5){
    clearTimeout(intervalId);
}


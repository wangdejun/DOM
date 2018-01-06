function square(arr){   
    // var newarr = arr.slice(0);
    return arr.map(function(x){
        return x*x;
    });
}

var goodarr = [1, 2, 4, 4, 3, 3, 1, 5, 3];
console.log(square(goodarr));
console.log(goodarr);
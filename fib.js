function recursive_fibonacci(n){
    if(n <= 2){
        return 1;
    }
    else{
        return recursive_fibonacci(n-1) + recursive_fibonacci(n-2);
    }
}

function iterative_fibonacci(n){
    if(n <= 2)
        return 1;
    
    let a = 1;
    let b = 1;
    let c = 2;
    for(let i = 3; i < n; i++){
        a = b;
        b = c;
        c = a + b;
    }

    return c;
}

for (let i = 0; i < 10; i++){
    console.log(recursive_fibonacci(i) === iterative_fibonacci(i))
}
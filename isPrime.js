function is_prime(n){
    for(let i = 2; i < Math.sqrt(n) +1; i++){
        if (n % i == 0)
            return "not prime"
    }
    return "prime"
}

let numbers = [2,3,5,8,12,13,21,23]
for (let i = 0; i < numbers.length; i++){
    let number = numbers[i]
    console.log(`${number} is ${is_prime(number)}`)
}
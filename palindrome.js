function reverse_str(str){
    return str.split("").reverse().join("")
}

function is_palindrome(word){
    for(let i = 0; i < word.length/2; i++){
        if(word[i] != word[word.length - 1 - i]){
            return "not a palindrome"
        }
    }
    return "a palindrome"
}

let word_list = ["hello", "anna", "and", "anina", "how", "are", "you"]
for(let i = 0; i < word_list.length; i++){
    let word = word_list[i]
    //console.log(`${word} is ${is_palindrome(word)}`)
}

prefix = "_:"
sufix = reverse_str(prefix)
const arrow = (element) => prefix + element + sufix
word_list = word_list.map(arrow)
for(let i = 0; i < word_list.length; i++){
    console.log(`${word_list[i]} is: ${is_palindrome(word_list[i])}`)
}
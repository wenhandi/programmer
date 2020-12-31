
let timer;
let i = 0;

function debounce(func, wait = 300){
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        func()
    }, wait)
}

debounce()
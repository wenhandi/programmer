// 重写alert
window.alert = console
var timer = null
closeVote()
function vote() {
    var list = document.getElementsByClassName("wedding_name")
    var key = list[1]
    timer = setInterval(() => {
        if (key.innerText.includes("刘明哲")) {
            console.log(key.innerHTML)
            var childs = key.parentElement.childNodes
            for (var c of childs) {
                if (c.className === "wedding_vote") {
                    c.click()
                    console.log("投票")
                }
            }

        }
    }, 65000)
}

// 停止投票
function closeVote() {
    clearInterval(timer)
}

vote()

// closeVote()
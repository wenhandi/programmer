var statusBeforeHide = true; //初始化页面的状态
var music = document.getElementById("xxx");
// 更改音乐播放状态
function setChangeMusic() {
    if (document[hiddenProperty]) {
        // 页面隐藏
        if (statusBeforeHide) {
            music.pause(); // 暂停
        }
    } else {
        // 页面显示
        if (statusBeforeHide) {
            music.play() //如果statusBeforeHide是true, 继续播放
        }
    }
}

let hiddenProperty = ('hidden' in document) ? 'hidden'
        : ('webkitHidden' in document) ? 'webkitHidden'
            : ('mozHidden' in document) ? 'mozHidden' : null;
if (hiddenProperty) {
    let visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    let onVisibilityChange = () => {
        //console.log('visibilityChange');
        setChangeMusic();
    };
    document.addEventListener(visibilityChangeEvent, onVisibilityChange);
} else {
    console.log("不支持这个api");
}
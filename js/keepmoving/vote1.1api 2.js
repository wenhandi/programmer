function randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function weddingVote(num, _this) {
    var token = randomString(20)
    $.ajax({
        url: "https://html5.bjsidao.com/wf20/web/giveZan",
        type: 'post',
        data: {
            token,
            "sid": 3012,
            "number": 1
        },
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res.status == 1) {

                console('投票成功')

            } else {
                console.log(res.msg)
            }

        }
    })
}
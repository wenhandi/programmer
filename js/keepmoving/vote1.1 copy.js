/*
* @Author: wfsd
* @Date:   2019-05-31 11:13:27
* @Last Modified by:   admin
* @Last Modified time: 2020-12-23 22:44:34
*/

$(function() {
    //判断手机横竖屏状态：  
    //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。
    var video = document.getElementById('video_share');
    var audio = document.getElementById('bg');
    var music = document.getElementById('music');
    document.addEventListener("WeixinJSBridgeReady", function() {
        video.play();
        video.pause();
    }, false);
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
    const url = "https://html5.bjsidao.com/wf20/web/";
    // 初始化用户信息
    let user = {};
    let[barrage_index,barrage_aisle,barrage_send,user_header,user_id,sid] = ["", 0, true, 0, 0, 0];

    let video_barrage = 0;
    //视频弹幕列表索引
    let index_barrage = 0;
    //弹幕通道索引
    let barrage = ['', '360十五周年，生日快乐！', '让世界更安全更美好', '祝公司蒸蒸日上，带上我', '认真加班，没空回复', '要火+1', '你是360的希望']

    console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user')) {
        user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
    } else {
        user.user_header = Math.ceil(Math.random() * 6);
        user.user_id = randomString(20)

        userInfo = JSON.stringify(user)
        localStorage.setItem('user', userInfo)

    }
    let share_play = false;
    $('#video_share,.share_video_btn').on('click', function() {

        video_play('8001')
        $('.video').get(0).pause();
        if (!share_play) {

            $('#video_share').get(0).play();
            share_play = !share_play;
            $('.share_video_btn').hide();

        } else {

            $('#video_share').get(0).pause();
            share_play = !share_play;
            $('.share_video_btn').show();
        }
    })
    $('.user_header').attr('src', './img/header' + user.user_header + '.png')
    function isIPhone(fn) {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        //ios终端
        if (isIOS) {
            // _hmt.push(['_trackEvent','苹果用户','click',','])
            $('input,select,textarea').on('blur', function() {
                $(window).scrollTop(0);
            });
        } else {}
    }
    isIPhone();

    var swiper1 = new Swiper('.swiper-container1',{
        slidesPerView: 2,
        spaceBetween: 20,
        freeMode: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    var getVideoShare = ()=>{
        $.ajax({
            url: url + 'getDetailByVid',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.status == 1) {
                    var t = setInterval(function() {
                        let html = ''
                        let top = Math.ceil(Math.random() * 12);
                        if (res.data[video_barrage].token == user.user_id) {
                            //弹幕id与用户id相同时 添加黄色背景
                            html = `<div class="left index_${video_barrage}" style="top:${top}px">
                      <img src="./img/header${user.user_header}.png" class="barrage_content_list_header">
                      <p style="background:yellow">${barrage[res.data[video_barrage].tid]}</p>
                    </div>`
                        } else {
                            html = `<div class="left index_${video_barrage}" style="top:${top}px">
                      <img src="./img/header${res.data[video_barrage].hid}.png" class="barrage_content_list_header">
                      <p>${barrage[res.data[video_barrage].tid]}</p>
                    </div>`;
                        }
                        // 随机生成弹幕通道
                        barrage_aisle = Math.floor(Math.random() * 4)
                        if (barrage_aisle == index_barrage) {
                            //随机生成的弹幕通道与上次的相同
                            barrage_aisle += 1;
                            if (barrage_aisle >= 4) {
                                barrage_aisle = 0;
                            }
                            ;
                        }
                        ;$('.barrage_content_list').eq(barrage_aisle).append(html)

                        let index_class = "index_" + video_barrage;
                        $("body").on('webkitAnimationEnd', '.' + index_class, function() {
                            $('.' + index_class).remove();
                        })
                        html = ''
                        video_barrage += 1;
                        //视频列表循环+1
                        index_barrage = barrage_aisle;

                        if (video_barrage >= res.data.length) {
                            //video_barrage大于视频列表时 清除定时器
                            video_barrage = 0;
                            // clearInterval(t)
                        }
                        ;
                    }, 800)
                } else {
                    alert(res.msg)
                }

            }
        })
    }
    // 评论
    var comment = ()=>{
        $.ajax({
            url: url + 'comment',
            type: 'post',
            data: {
                token: user.user_id,
                tid: barrage_index,
                hid: user.user_header
            },
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.status == 1) {
                    barrage_index = '';
                    sid = res.data.sid;
                    let text = $('.barrage_text').text();
                    let top = Math.ceil(Math.random() * 5);
                    let html = `<div class="left" style="top:${top}px">
                      <img src="./img/header${user.user_header}.png" class="barrage_content_list_header">
                      <p style="background:yellow">${text}</p>
                    </div>`;
                    barrage_aisle = Math.floor(Math.random() * 4)
                    if (barrage_aisle == index_barrage) {
                        barrage_aisle += 1;
                        if (barrage_aisle >= 4) {
                            barrage_aisle = 0;
                        }
                        ;
                    }
                    ;$('.barrage_content_list').eq(barrage_aisle).append(html)
                    $('.barrage_text').text('');

                    index_barrage = barrage_aisle;

                    // $('.alert,.alert_lottery').fadeIn();
                    barrage_send = !barrage_send;
                    setTimeout(function() {
                        barrage_send = !barrage_send;
                    }, 5000)
                } else {
                    alert(res.msg)
                }

            }
        })
    }
    $('.activity_text4,.activity_text6').on('click', function() {
        $('.activity_alert').fadeIn();
    })
    $('.activity_text5').on('click', function() {
        $('.alert_anzai,.alert').show();
    })
    $('.activity_text1').on('click', function() {
        window.open('https://m.bbs.360.cn/anniversary-15th/avatar.html')
    })
    $('.activity_text2').on('click', function() {
        window.open('https://mp.weixin.qq.com/s/VXE2lJOTrYuCfXX_o9Acrg')
    })
    $('.activity_alert_close').on('click', function() {
        $('.activity_alert').hide();
    })
    $(".statement_btn").on('click', function() {
        $('.footer_banner_wrap_text').show();
    })
    $('.footer_banner_close').on('click', function() {
        $('.footer_banner_wrap_text').hide();
    })
    $('.barrage_btn').on('click', function() {
        if (barrage_index !== '') {
            if (barrage_send) {

                comment();

            } else {
                alert('5秒后可再次发送弹幕！');
            }
        } else {
        }

    })
    // 关闭弹窗
    $('.alert_close').on('click', function() {
        $('.alert,.alert_rule,.alert_lottery,.alert_prize,.alert_wedding,.alert_anzai').hide();
    })
    // 菜单栏
    $('.header_menu_btn').on('click', function() {
        if ($('.header_menu').css('display') == "none") {
            $('.header_menu').show();
        } else {
            $('.header_menu').hide();
        }
    })

    $('.nav').eq(0).addClass('activea');
    // $('.nav').on('click',function(){
    //     $(this).addClass('activea').siblings('.nav').removeClass('activea');
    // })
    $(window).scroll(function() {
        let Stop = $(document).scrollTop();
        let Stop1 = $('.video_content_share').offset().top;
        let Stop2 = $('.footer_banner').offset().top;
        // console.log(Stop)
        if (Stop <= Stop1) {
            $('.nav').eq(0).addClass('activea').siblings('.nav').removeClass('activea');
        } else if (Stop + 300 > Stop1 && Stop + 300 <= Stop2) {
            $('.nav').eq(1).addClass('activea').siblings('.nav').removeClass('activea');
        } else if (Stop + 300 > Stop2) {
            $('.nav').eq(2).addClass('activea').siblings('.nav').removeClass('activea');
        }
    });
    // 弹幕规则
    $('.lottery_title').on('click', function() {// $('.alert_rule,.alert').show();
    })
    $('.alert_barrage p').on('click', function() {
        let text = $(this).text();
        barrage_index = $(this).index() + 1;
        //选择弹窗的下标
        $('.barrage_text').text(text);
        $('.alert_barrage').hide();
    })
    $('.barrage_text').on('click', function() {
        event.stopPropagation();
        if ($('.alert_barrage').css('display') == 'none') {
            $('.alert_barrage').show();
        } else {
            $('.alert_barrage').fadeOut();
        }
    })
    $(document).on('click', function() {
        $('.alert_barrage').fadeOut();
    })
    //关于我们
    $('.footer_banner_wrap_title').on('click', function() {
        let index = $('.footer_banner_wrap_title').index(this);
        if ($('.footer_banner_wrap_text').eq(index).css('display') == 'none') {
            $(this).find('.footer_banner_icon').css({
                transform: 'rotate(90deg)'
            }).parent('.footer_banner_wrap_title').siblings('.footer_banner_wrap_title').find('.footer_banner_icon').css({
                transform: 'rotate(0deg)'
            })
            $('.footer_banner_wrap_text').eq(index).fadeIn().siblings('.footer_banner_wrap_text').hide();
        } else {
            $('.footer_banner_wrap_text').eq(index).hide()
            $(this).find('.footer_banner_icon').css({
                transform: 'rotate(0deg)'
            }).parent('.footer_banner_wrap_title').siblings('.footer_banner_wrap_title').find('.footer_banner_icon').css({
                transform: 'rotate(0deg)'
            })

        }

    })
    getVideoShare();

    //   function decrypt(str, key, iv) {
    //      //密钥16位
    //      var key = CryptoJS.enc.Utf8.parse(key);
    //      //加密向量16位
    //      var iv = CryptoJS.enc.Utf8.parse(iv);
    //      var decrypted = CryptoJS.AES.decrypt(str, key, {
    //          iv: iv,
    //          mode: CryptoJS.mode.CBC,
    //          padding: CryptoJS.pad.ZeroPadding
    //      });
    //      return decrypted.toString(CryptoJS.enc.Utf8);
    //  }

    // function checkpassWord(password){
    //    $.ajax({
    //        url:url + 'checkPasswrod',
    //        type:'post',
    //        data:{
    //          passwd:password
    //        },
    //        dataType:'json',
    //        success:function(res){
    //          console.log(res)
    //          if (res.status == 1) {
    //            var iv = res.data.randStr;
    //            var decrypt_string = res.data.sign;
    //            var decrypted_string = decrypt(decrypt_string, decrypt_key, iv);
    //            let pass = JSON.parse(decrypted_string.match(/\{(\S*)\}/)[0])
    //           if (pass.result == 200) {
    //            $('.password_wrap').hide();
    //            $('body').removeClass('overH')
    //            getVideoShare();
    //           }else{
    //            alert('密码输入错误！')
    //           }
    //          }else{
    //            alert(res.msg)
    //          }

    //        }
    //      })
    //  }
    //  var decrypt_key = 'HSfw&8fS2_41YJwg';
    //  $('.confirm').on('click',function(){
    //    let password = $('.password').val();
    //    if (password == '') {
    //      alert('请输入密码')
    //    }else if(password.indexOf(" ") != -1){
    //      alert('密码输入错误')
    //    }else{
    //      checkpassWord(password)
    //    }

    //  })

    // 播放弹窗视频
    $('.video_user_btn').on('click', function() {
        let video_url = $(this).attr('data-url');
        $('#alert_video').attr('src', 'https://15th360.oss-cn-beijing.aliyuncs.com/' + video_url + '.mp4?v=1.0')
        $('#video_share').get(0).pause();
        $('#alert_video').get(0).play();
        $('.alert,.alert_video').show();
    })
    $('.alert_video_close').on('click', function() {
        $('#alert_video').get(0).pause();
        $('.alert,.alert_video').hide();
    })

    //  婚礼投票

    $('.activity_text3').on('click', function() {
        $('.alert,.alert_wedding').show();
        var swiper3 = new Swiper('.swiper-container3',{
            slidesPerView: 1,
            spaceBetween: 0,
            freeMode: false,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })
    getweddingList();
    function getweddingList() {
        let man_name = ['王兴达', '王正晖', '李智杰', '刘贺', '戴中国', '张日斌', '闵真', '杨宇', '王春雷', '李青峰', '吉忠浩', '刘明哲']
        let woman_name = ['杨立月', '杨惠贞', '陈剑芳', '王亥园', '陆文慧', '陈翠杰', '王卫红', '张明欣', '谭赛', '孙苏琪', '孙东雪', '牛丹丹']
        let desc = ['浮世万千，吾爱有三，日、月、君，日为朝，月为暮，君为朝朝暮暮。', '你是年少的欢喜，也是余生的甜蜜，执子之手，与子偕老。', '爱你从不是说说而已，北京到深圳的距离，我跨越山河，用一生去珍惜。', '一往情深深似海，<br>不负流年不负君。', '披星“戴”月，一“陆”有你；<br>执子之手，与子偕老。', '惟愿这一生，执子之手，与子偕老；你敢天长，我就敢地久。', '浮世三千，吾爱有三，日、月与卿。日为朝，月为暮，卿为朝朝暮暮。', '不管未来是诗与远方，是酸甜苦辣，我只希望和你一同优雅的老去。', 'print(0x140ed9)#爱往往就是这么朴实无华且低调。', '我向你许下诺言，我将陪你同舟共济，永远爱你，直到永远。', '你说的是蜂蜜鸡翅、红烧排骨真好吧~<br>他们因你更好，抱紧~', '爱，在珍惜里，温暖；<br>情，在守候里，长久。']
        let html = '';
        var num = 3001;
        for (var i = 0; i < 12; i + 2) {
            console.log(i)

            html += `<div class="swiper-slide">
                  <div class="swiper-slide_box">
                  <img src="../../img/vote/wedding${i + 1}.jpg" class="wedding_img">
                  <p class="wedding_name">${i < 10 ? i = '0' + (i + 1) : i = (i + 1)}：${man_name[i]}&nbsp;&&nbsp;${woman_name[i]}</p>
                  <hr></hr>
                  <p class="wedding_desc">${desc[i]}</p>
                  <div class="wedding_vote" data-num="${num}">
                    <p class="vote_btn">投票<br><span>1</span>票</p>
                  </div>

                  </div>
                  <div class="swiper-slide_box">
                  <img src="../../img/vote/wedding${i + 2}.jpg" class="wedding_img">
                  <p class="wedding_name">${i < 10 ? i = '0' + (i + 2) : i = (i + 2)}：${man_name[i + 1]}&nbsp;&&nbsp;${woman_name[i + 1]}</p>
                  <hr></hr>
                  <p class="wedding_desc">${desc[i + 1]}</p>
                  <div class="wedding_vote" data-num="${num + 1}">
                    <p class="vote_btn">投票<br><span>1</span>票</p>
                  </div>

                  </div>
                </div>`
            num += 2;
        }
        // $('.swiper-container3 .swiper-wrapper').append(html)

        getweddingListNum();
    }
    function getweddingListNum(num, _this) {
        $.ajax({
            url: url + 'getZanList',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.status == 1) {
                    for (var i = 0; i < res.data.gid1.length; i++) {
                        $('.swiper-container3 .swiper-wrapper').find('span').eq(i).text(res.data.gid1[i].total)
                    }
                } else {
                    alert(res.msg)
                }

            }
        })
    }

    var wedding_btn = true;
    function weddingVote(num, _this) {
        $.ajax({
            url: url + 'giveZan',
            type: 'post',
            data: {
                token: user.user_id,
                sid: num,
                number: 1
            },
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.status == 1) {
                    wedding_btn = !wedding_btn;
                    let num = parseInt($(_this).find('span').text())

                    $(_this).find('span').text(num + 1)
                    alert('投票成功')
                    setTimeout(function() {
                        wedding_btn = !wedding_btn;
                    }, 60000)
                } else {
                    alert(res.msg)
                }

            }
        })
    }
    // 投票
    $('.swiper-wrapper').on('click', '.wedding_vote', function() {

        let num = $(this).attr('data-num');
        if (wedding_btn) {
            weddingVote(num, this)

        } else {
            alert('60秒内只能投一票！')
        }

    })

})

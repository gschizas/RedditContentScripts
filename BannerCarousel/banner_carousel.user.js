// ==UserScript==
// @name         Banner Carousel
// @namespace    http://terrasoft.gr/userscripts/
// @version      0.3.0
// @description  Banner Carousel
// @author       George Schizas
// @match        https://www.reddit.com/r/greece/comments/2zg5ou/*
// @downloadUrl  https://openuserjs.org/install/gschizas/Banner_Carousel.user.js
// @grant        unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var bannerImages = []
/*
    'https://i.imgur.com/ptC8pyl.jpg',
    'https://i.imgur.com/Ece3hYj.jpg',
    'https://i.imgur.com/T22nJc6.png',
    'https://i.imgur.com/EzEYiEC.png',
    'https://i.imgur.com/RVV7fVL.png',
    'https://i.imgur.com/oM4QXGP.png',
    'https://dl.dropboxusercontent.com/u/6166376/banner.png',
    'https://i.imgur.com/z6oul4p.jpg',
    'https://i.imgur.com/JzMaSvM.jpg',
    'https://i.imgur.com/DpLvIm8.jpg',
    'https://i.imgur.com/GwVgxvD.jpg',
    'https://i.imgur.com/oV3xsfC.jpg',
    'https://i.imgur.com/V2kYfgv.jpg',
    'https://i.imgur.com/7gRJxLy.png',
    'https://i.imgur.com/eFlc02U.jpg'
*/

var bannerControl = $("<select id='bannerSelect'><option value='0'>--Default Banner--</option></select><button id='bannerPrev'>« Prev</button><button id='bannerNext'>Next »</button>");

$('#siteTable').prepend(bannerControl);


$('#bannerSelect').change(function() {
    selectedImage = parseInt($(this).val());
    if (selectedImage===0) {
        imageUrl = '//c.thumbs.redditmedia.com/-oIzLQ0UPDfe1Swn.png';
        imageHeight = 117;
    } else {
        var imageData = bannerImages[selectedImage-1]
        imageUrl = imageData.url;
        imageHeight = imageData.height;
    }
    $('#header').css('background-image', 'url(' + imageUrl + ')')
    $('#header-img').css('height', imageHeight + 'px')
})

$('#bannerPrev').click(function() {
    console.log("« Prev");
    var currentBanner = $('#bannerSelect').val();
    currentBanner--;
    if (currentBanner < 0) currentBanner = bannerImages.length;
    $('#bannerSelect').val(currentBanner);
    $('#bannerSelect').change();
})
$('#bannerNext').click(function() {
    console.log("Next »");
    var currentBanner = $('#bannerSelect').val();
    currentBanner++;
    if (currentBanner>bannerImages.length) currentBanner = 0;
    $('#bannerSelect').val(currentBanner);
    $('#bannerSelect').change();
})

var jsonUrl = window.location.toString() + '.json'
var things;
$.getJSON(jsonUrl, function(data) { 
    things=data;
    console.log(things);

    things[1]['data']['children'].forEach(function(e,i,a) {
        body = e['data']['body'];
        var re = /\[([^\]]+)\]\(([^\)]+)\)/;
        var re2 = /https?:\/\/(i\.)?imgur.com\/(\w+)(\.jpg|\.png|\/)/;
        var match = re.exec(body);
        if (match) {
            var imgName = match[1];
            var imgUrl = match[2];
            // console.log(imgName);
            // console.log(imgUrl);
            var urlMatch = re2.exec(imgUrl);
            if (urlMatch) {
                // console.log(urlMatch);
                var imgId = urlMatch[2];
                $.ajax({
                    beforeSend: function(request) {
                        request.setRequestHeader('Authorization', 'Client-ID 2f0d90280e84f75');
                    },
                    dataType: "json",
                    url: "https://api.imgur.com/3/image/" + imgId,
                    success: function(imageData) {
                        bannerImages.push({'url': imageData.data.link, 'height': imageData.data.height});
                        var i = bannerImages.length;
                        $('#bannerSelect').append("<option value='" + (i+1) + "'>" + imgId + "</option>");
                    }
                });
            };
        }
    })
})

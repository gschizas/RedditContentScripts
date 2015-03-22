// ==UserScript==
// @name         Banner Carousel
// @namespace    http://terrasoft.gr/userscripts/
// @version      0.2
// @description  Banner Carousel
// @author       George Schizas
// @match        https://www.reddit.com/r/greece/comments/2zg5ou/*
// @grant        unsafeWindow
// ==/UserScript==

var bannerImages = [
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
];

var $ = unsafeWindow.jQuery;

var bannerControl = $("<select id='bannerSelect'><option value='0'>--Default Banner--</option></select><button id='bannerPrev'>« Prev</button><button id='bannerNext'>Next »</button>");

$('#siteTable').prepend(bannerControl);

console.log(bannerControl);

bannerImages.forEach(function (el, i) {
    // console.log(el, i);
    $('#bannerSelect').append("<option value='" + (i+1) + "'>" + el + "</option>");
});

// console.log(combo);
// console.log($('.commentarea'));

$('#bannerSelect').change(function() {
    selectedImage = parseInt($(this).val());
    if (selectedImage==0) {
        imageUrl = '//c.thumbs.redditmedia.com/-oIzLQ0UPDfe1Swn.png'
    } else {
        imageUrl = bannerImages[selectedImage-1];
    }
    $('#header').css('background-image', 'url(' + imageUrl + ')')
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

/*
 * @Code:   Fun slider
 * @author:   Saif
 *   
 */

//Data value for transform
function setDataValue() {
    $('.slider-panel .slider-image').each(function(i, j) {
        $(this).attr('data-no', i)
    })
}

//stlye for transform
function setStyleAttr(totalWidth, EachImageWidth) {
    $('.slider-panel').addClass('slider-ready');
    $('.slider-panel').outerWidth(totalWidth);
    $('.slider-panel .slider-image').outerWidth(totalWidth / EachImageWidth);
}

/* Controls */
function CommonControls(clickCount, slideMoveGap, EachImageWidth) {
    $('.slider-ctrl').click(function(e) {
        e.preventDefault();
        if ($(this).data('move') == "left" && clickCount > 0) {
            var NextVal = 0;
            clickCount--;
            NextVal = clickCount * -1;
            $('.slider-panel').css({
                "transform": "translateX(" + (NextVal * slideMoveGap) + "px" + ")"
            })
        }
        if ($(this).data('move') == "right" && clickCount < EachImageWidth - 1) {
            var reverseVal = 0;
            clickCount++;
            reverseVal = (clickCount * -1);
            $('.slider-panel').css({
                "transform": "translateX(" + (reverseVal * slideMoveGap) + "px" + ")"
            })
        }
    })
}

$(document).ready(function() {
    /* Global vars */
    var totalWidth = $('.slider-panel .slider-image').width() * $('.slider-panel .slider-image').length,
        EachImageWidth = $('.slider-panel .slider-image').length,
        slideMoveGap = totalWidth / EachImageWidth,
        clickCount = 0;


    /* Global Functions */
    setStyleAttr(totalWidth, EachImageWidth);
    setDataValue();

    /* Controls */
    CommonControls(clickCount, slideMoveGap, EachImageWidth);


})
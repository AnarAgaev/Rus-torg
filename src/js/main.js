$( document ).ready(function() {

    // Show material card when user clickd button Read more on the page
    $('.material__button button').on('click', function(){
        // ID of the displayed card
        let cardId = $(this).attr('data-card-id')

        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
    })

    // Hide material card when user clickd button close
    $('.material-slider__close').on('click', function(){
        hideMaterialCard()
    })

    // Moove cards inside material card slider when user clickd button left or button right
    $('.material-slider__control').on('click', function(){
        // Varible for save where we well scroll
        let  tooSide = $(this).attr('data-to-side')
        slideMaterialCard(tooSide)
    })
})

// FUNCTION FOR HIDE MATERIAL CARD
function hideMaterialCard() {
    $('.material-slider').removeClass('visible')
    $('.material-slider__container').removeClass('active')
}


// FUNCTION FOR SLIDEING MATERIAL CARDS INSIDE CARD SLIDER
function slideMaterialCard(tooSide) {
    let activeCard = $('.material-slider__container.active').index()
    let cards = $('.material-slider__container')
    let numCards = $('.material-slider__container').length

    // Changed number of active card
    switch (tooSide) {
        case 'left':
            if (activeCard == 0) activeCard = numCards - 1
            else activeCard--
            break
        case 'right':
            if (activeCard == numCards - 1) activeCard = 0
            else activeCard++
            break
    }


    console.log(activeCard);


    $('.material-slider__container.active').hide(0).removeClass('active')
    cards.eq(activeCard).addClass('active')
}

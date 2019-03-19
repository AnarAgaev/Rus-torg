$( document ).ready(function() {

    // Show material card when user clickd button Read more on the page
    $('.material__button button').on('click', function(){
        // ID of the displayed card
        let cardId = $(this).attr('data-card-id')

        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
        $('body').addClass('modal-open')
    })

    // Show material card About Company when user clickd About company link in main navigation
    $('a[data-card-id="about-company"]').on('click', function(event){
        event.preventDefault()
        let cardId = $(this).data('card-id')

        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
        $('body').addClass('modal-open')
    })

    // Smooth scroll to the target on page when user click anchor in the main navegation
    $('.nav__item [data-anchor-target]').on('click', function functionName(event) {
        event.preventDefault()
        let anchorTargetId = $(this).data('anchor-target')

        if ( $(anchorTargetId).length != 0 ) {
    	    $('html, body').animate({ scrollTop: $(anchorTargetId).offset().top }, 500);
        }
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

    // HIDE MATERIAL CARD WHEN USER CLICKD OUTSIDE BLOCK
	$(document).on('mouseup', function(event) {
		let targetBlock = $('.material-slider__container')

        if (!targetBlock.is(event.target)
            && targetBlock.has(event.target).length === 0) {
                hideMaterialCard()
        }
	})
})

// FUNCTION FOR HIDE MATERIAL CARD
function hideMaterialCard() {
    $('.material-slider').removeClass('visible')
    $('.material-slider__container').css('marginTop','0').removeClass('active')
    $('body').removeClass('modal-open')
}

// FUNCTION FOR SLIDEING MATERIAL CARDS INSIDE CARD SLIDER
function slideMaterialCard(tooSide) {
    let activeCard = $('.material-slider__container.active').index()
    let cards = $('.material-slider__container:not(.single-card)')
    let numCards = $('.material-slider__container:not(.single-card)').length

    // Changed number of active card
    switch (tooSide) {
        case 'left':
            if (activeCard == 0) activeCard = --numCards
            else activeCard--
            break
        case 'right':
            if (activeCard == --numCards) activeCard = 0
            else activeCard++
            break
    }

    // Moove active card to the front and hide not active cards
    $('.material-slider__container.active').css('marginTop','-100%').removeClass('active')
    cards.eq(activeCard).css('marginTop','0').addClass('active')
}

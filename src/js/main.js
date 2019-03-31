// Varible for controll multiple clicks
var eventTimer = true

$( document ).ready(function() {
    // VALIDATION AND SEND FORM FEEDBACK
    $('#feedback-form').on("submit", function(event){
        event.preventDefault()

        let formValid  = true
        let nameInput  = $('#name')
        let phoneInput = $('#phone')
        let mailInput  = $('#mail')
        let validMail, validPhone
        let regularMail = /.+@.+\..+/i // check only the presence of @ and points
        let regularPhone = /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/

        // Clean error messages
        $('.feedback-form__form-group').removeClass('has-error')
        $('.feedback-form__form-control').on('keyup', function() {
            $(this).parent('.feedback-form__form-group').removeClass('has-error')
        })

        // Validation email
        validMail = regularMail.test( $.trim(mailInput.val()) )
        if(mailInput.val() == '' || !validMail) {
            mailInput
                .focus()
                .parent('.feedback-form__form-group').addClass('has-error')
            formValid = false
        }

        // Validation phone
        validPhone = regularPhone.test( $.trim(phoneInput.val()) )
        if(phoneInput.val() == '' || !validPhone) {
            phoneInput
                .focus()
                .parent('.feedback-form__form-group').addClass('has-error')
            formValid = false
        }

        // Validation name
        if(nameInput.val() == '') {
            nameInput
                .focus()
                .parent('.feedback-form__form-group').addClass('has-error')
            formValid = false
        }

        if(formValid){
            $.post(
                "/send-feedback.php",
                {   
                    name   :nameInput.val(),
                    phone  :phoneInput.val(),
                    email  :mailInput.val()
                },
                function(data){
                    if(data){
                        alert('Сообщение отправлено. Менеджер свяжется с Вами в ближайшее время.')
                    }
                    else alert('Сообщение не отправлено. Повторите попытку немного позже.')
                }
            )
        }
    })


    // SCROLLIN ON TIRES AND WHELLS SECTION WHEN USER CLICK ON ANY CARD
    $(document).on('click', '.tires-and-wheels__item:not([data-position-card="1"])', function(event){
        let clickedCardNumber = $(this).attr('data-position-card')
        let activeCard = $('.tires-and-wheels__item[data-position-card="1"]')
        $(this).attr('data-position-card', '1')
        activeCard.attr('data-position-card', clickedCardNumber)
    })

    // MOUSE ARRIVE OR LIEAVE ON ANCKHOR IN MAIN NAVIGATION
    $('.nav__item a').on('mouseenter', function() {
       let parentBlock = $(this).parent()
       let parentBlockNumber = parentBlock.index()
       let parentBlockBefore

       if (parentBlockNumber != 0) {
            parentBlockBefore = parentBlockNumber - 1
       }

       if (parentBlockBefore >= 0) {
         $('.nav__item').eq(parentBlockBefore).find('.line').addClass('compress')
       }
    })
    $('.nav__item a').on('mouseleave', function() {
       let parentBlock = $(this).parent()
       let parentBlockNumber = parentBlock.index()
       let parentBlockBefore

       if (parentBlockNumber != 0) {
            parentBlockBefore = parentBlockNumber - 1
       }

       if (parentBlockBefore >= 0) {
         $('.nav__item').eq(parentBlockBefore).find('.line').removeClass('compress')
       }
    })

    // OPEN FEEDBACK MODAL
    $('.open-feedback-modal').on('click', function(event) {
        event.preventDefault()
        $('.material-slider').removeClass('visible')
        $('.material-slider__container').removeClass('active')
        $('.feedback-form').addClass('visible')
        $('.feedback-form__container').addClass('active')
        $('body').addClass('modal-open')
    })
    // CLOSE FEEDBACK MODAL
    function closeFeedbackModal() {
        $('.feedback-form').removeClass('visible').addClass('hide')
        $('.feedback-form__container').removeClass('active').addClass('fade')
        $('body').removeClass('modal-open')
        setTimeout(function(){
            $('.feedback-form').removeClass('hide')
            $('.feedback-form__container').removeClass('fade').css('marginTop','0')
        }, 300)
    }
    $('.feedback-form__close').on('click', function(event) {
        event.preventDefault()
        closeFeedbackModal()
    })

    // Show material card when user clickd button Read more on the page
    $(document).on( 'click', '[data-card-id]', function (event) {
        event.preventDefault()
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

        $('.nav__item a').not($(this)).removeClass('active')
        //$(this).addClass('active')
        $('.material-slider').addClass('visible')
        $('#' + cardId).addClass('active')
        $('body').addClass('modal-open')
    })

    // Smooth scroll to the target on page when user click anchor in the main navegation
    $('[data-anchor-target]').on('click', function functionName(event) {
        event.preventDefault()
        let anchorTargetId = $(this).data('anchor-target')

        // $('.nav__item a').not($(this)).removeClass('active')
        // $(this).addClass('active')
        if ( $(anchorTargetId).length != 0 ) {
    	    $('html, body').animate({ scrollTop: $(anchorTargetId).offset().top }, 500);
        }
    })

    // Hide material card when user clickd button close
    $('.material-slider__close').on('click', function(){
        $('a[data-card-id="about-company"]').removeClass('active')
        hideMaterialCard()
    })

    // Moove cards inside material card slider when user clickd button left or button right
    let materialSlideCardStoper = true
    $('.material-slider__control').on('click', function(){
        // Varible for save where we well scroll
        let  tooSide = $(this).attr('data-to-side')

        if( materialSlideCardStoper ) {
            materialSlideCardStoper = false
            setTimeout(function() {
                materialSlideCardStoper = true
            }, 810)
            slideMaterialCard(tooSide)
        }
    })

    // HIDE POPUP CARD WHEN USER CLICKD OUTSIDE BLOCK
	//$(document).on('mouseup', function(event) {
		//let targetBlockMaterial = $('.material-slider__container')
        //let targetBlockFeedack = $('.feedback-form__container')

        //if (!targetBlockMaterial.is(event.target) && targetBlockMaterial.has(event.target).length === 0
         //&& !targetBlockFeedack.is(event.target) && targetBlockFeedack.has(event.target).length === 0) {
             //hideMaterialCard()
             //closeFeedbackModal()
        //}
	//})

    // SHOW GOOGLE MAP
    $('.btn__map-load').on('click', function(event) {
        event.preventDefault()
        $('.location__map-container').addClass('show')
    })
})

// FUNCTION FOR HIDE MATERIAL CARD
function hideMaterialCard() {
    $('.material-slider').removeClass('visible').addClass('hide')
    $('.material-slider__container').removeClass('active hide').addClass('fade')
    $('body').removeClass('modal-open')
    setTimeout(function(){
        $('.material-slider').removeClass('hide')
        $('.material-slider__container').removeClass('fade').css('marginTop','0')
    }, 300)
}

// FUNCTION FOR SLIDEING MATERIAL CARDS INSIDE CARD SLIDER
function slideMaterialCard(tooSide) {
    let activeCard = $('.material-slider__container.active').index()
    let cards = $('.material-slider__container:not(.single-card)')
    let numCards = 3

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
    $('.material-slider__container.active').addClass('hide').removeClass('active')
    cards.eq(activeCard).css('marginTop','0').addClass('active')
    setTimeout(function() {
        cards.removeClass('hide') 
        $('.material-slider__container:not(.active)').css('marginTop','-100%')
    }, 805)
}


// WIDTH ONE SLIDE PLUS RIGHT INDENT
const STEP_WIDTH = 410

// FUNCTION FOR INITIALIZATION MATERIAL SLIDER
function materialSliderInit() {
    let sliderContainer = $('.material__items')
    let firstElement = $('.material__item:first')
    let lastElement = $('.material__item:last')
    let positionLeft = sliderContainer.position().left

    // Cloning first and last element
    firstElement.clone().appendTo(sliderContainer)
    lastElement.clone().prependTo(sliderContainer)

    // Moove to the left slider container on the step width
    positionLeft -= STEP_WIDTH
    sliderContainer.css('left', positionLeft + 'px')
}
// INITIALIZATION MATERIAL SLIDER
materialSliderInit()

// FUNCTION FOR SLIDING MATERIAL SLIDER
function materialSliding(slideTo) {
    let sliderContainer = $('.material__items')
    let positionLeft = sliderContainer.position().left
    let firstElement = $('.material__item:first')
    let lastElement = $('.material__item:last')
    
    switch (slideTo) {
        case 'left':
            $('.material__item_active').addClass('material__item_passive').removeClass('material__item_active')
            $('.material__item:eq(1)').removeClass('material__item_passive').addClass('material__item_active')
            positionLeft += STEP_WIDTH
            sliderContainer.animate({left: positionLeft + 'px'}, 950, 'easeOutQuart', function(){
                lastElement.remove()
                $('.material__item:eq(2)').clone().prependTo(sliderContainer)
                positionLeft -= STEP_WIDTH
                sliderContainer.css('left', positionLeft + 'px')
            })
            break
        case 'right':
            $('.material__item_active').addClass('material__item_passive').removeClass('material__item_active')
            $('.material__item:eq(3)').removeClass('material__item_passive').addClass('material__item_active')
            positionLeft -= STEP_WIDTH
            sliderContainer.animate({left: positionLeft + 'px'}, 950, 'easeOutQuart', function() {
                firstElement.remove()
                $('.material__item:eq(1)').clone().appendTo(sliderContainer)
                positionLeft += STEP_WIDTH
                sliderContainer.css('left', positionLeft + 'px')
            })
            break
    }
}

// HANDLE CLICK ON TO THE LEFT OR TO THE RIGHT IN MATERIAL SLIDER
$('.material__arr_left').on('click', function(){
    if(eventTimer) {
        eventTimer = false
        setTimeout(function() {
            eventTimer = true
        }, 1000)
        materialSliding('left')
    }
})
$('.material__arr_right').on('click', function(){
    if(eventTimer) {
        eventTimer = false
        setTimeout(function() {
            eventTimer = true
        }, 1000)
        materialSliding('right')
    }
})

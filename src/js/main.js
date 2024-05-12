AOS.init()

var swiper = new Swiper('.mySwiper', {
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
	},
	// effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	spaceBetween: 16,
	initialSlide: 1,
	breakpoints: {
		// when window width is >= 320px
		768: {
			spaceBetween: 30,
		},
	},
	// loop: true,
	// coverflowEffect: {
	// 	rotate: 0,
	// 	stretch: 0,
	// 	depth: 100,
	// 	modifier: 1,
	// 	scale: 0.7,
	// 	slideShadows: true,
	// },
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	// on: {
	// 	click() {
	// 		console.log('index', this.clickedIndex)
	// 		swiper2.slideTo(this.clickedIndex)
	// 	},
	// },
})

function toggleMenu() {
	const menu = document.querySelector('.menu-links')
	const icons = document.querySelectorAll('.hamburger-icon')
	menu.classList.toggle('open')
	icons.forEach((el) => {
		el.classList.toggle('open')
	})
}

AOS.init()

var swiper = new Swiper('.swiper', {
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
	},
	grabCursor: true,
	centeredSlides: true,
	// loop: true,
	initialSlide: 1,
	spaceBetween: 0,
	breakpoints: {
		768: {
			spaceBetween: 20,
		},
	},
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		scale: 0.7,
		// stretch: 0,
		// depth: 50,
		// modifier: 1,
		// slideShadows: true,
	},
	// navigation: {
	// 	nextEl: '.swiper-button-next',
	// 	prevEl: '.swiper-button-prev',
	// },
	on: {
		click(e) {
			e.slideTo(this.clickedIndex)
		},
	},
})

function toggleMenu() {
	const menu = document.querySelector('.menu-links')
	const icons = document.querySelectorAll('.hamburger-icon')
	menu.classList.toggle('open')
	icons.forEach((el) => {
		el.classList.toggle('open')
	})
}

const DARK_CLASS = 'dark'
function setTheme(isDark) {
	if (isDark) {
		document.body.classList.add(DARK_CLASS)
	} else {
		document.body.classList.remove(DARK_CLASS)
	}
}

function toggleTheme() {
	const isDark = document.body.classList.contains(DARK_CLASS)

	setTheme(!isDark)
}

function toggleThemeHandler() {
	const isDark = document.body.classList.contains(DARK_CLASS)
	toggleTheme()

	// STORAGE
	localStorage.setItem('theme', isDark ? 'light' : 'dark')
}

//
const isDark = localStorage.getItem('theme') === 'dark'
if (isDark) setTheme(true)

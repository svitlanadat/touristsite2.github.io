const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__item')
const navBtnBars = document.querySelector('.burger-btn__bars')
const allSection = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')

const handleNav = () => {
	nav.classList.toggle('nav--active');

	navBtnBars.classList.remove('black-bars-color');

	if (!nav.classList.contains('nav--active')) {
		handleObserver();
	}

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav--active');
		})
	})

	handleNavItemAnimation()
	deleteAnimation()
}

const handleNavItemAnimation = () => {
	let delayTime = 0

	allNavItems.forEach(item => {
		item.classList.toggle('nav-item-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

const deleteAnimation = () => {
	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			allNavItems.forEach(el => {
				el.classList.remove('nav-item-animation')
			})
		})
	})
}

const handleObserver = () => {
	const currentSection = window.scrollY

	allSection.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
		}
	})
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
navBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', handleObserver)


function openPopup() {
    const popup = document.getElementById('popup');
    document.body.style.overflow = 'hidden';
    popup.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('popup');
    const user_message = document.getElementById('msg');
    const user_email = document.getElementById('email');
    document.body.style.overflow = 'auto';
    user_message.value = '';
    user_email.value = '';
    user_email.style.borderColor = 'cadetblue';
    popup.classList.remove('show');
}

function removeTimer(timer) {
    clearTimeout(timer);
}

function validateEmail(mail) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailPattern.test(mail.value)) {
        return true;
    }
    mail.style.borderColor = 'red';
    const timer = setTimeout(() => {
        mail.style.borderColor = 'cadetblue';
    }, 2000);
    return false;
}

function validateText(text) {
    if (text.value.length > 20) {
        return true;
    }
    text.style.borderColor = 'red';
    const timer = setTimeout(() => {
        text.style.borderColor = 'cadetblue';
    }, 2000);
    return false;
}

function sendMessage() {
    const user_message = document.getElementById('msg');
    const user_email = document.getElementById('email');
    const status = document.getElementById('send_status');
    const button = document.getElementById('btn');

    if (validateText(user_message) && validateEmail(user_email)) {
        button.disabled = true;
        
        // Відправка email через SecureToken
        Email.send({
            SecureToken : "7d969d90-4ae1-47a2-ad6d-85088d830993",
            To : 'svdatsko2004@gmail.com',   // Заміни на реальний email одержувача
            From : user_email.value,
            Subject : "Нове повідомлення з форми контакту",
            Body : user_message.value
        }).then(
            message => {
                status.textContent = 'Повідомлення успішно надіслано';
                status.style.color = 'green';
                const timer = setTimeout(() => {
                    closePopup();
                    user_message.value = '';
                    user_email.value = '';
                    status.textContent = '';
                    button.disabled = false;
                }, 2000);
                console.log(message);
            }
        ).catch(
            error => {
                status.textContent = 'Повідомлення не надіслано';
                status.style.color = 'red';
                button.disabled = false;
                console.log(error);
            }
        );
    }
}




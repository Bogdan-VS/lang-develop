import Display from '../utils/baseEnums';

class Burger {
    burgerButton: HTMLTemplateElement;

    headerNav: HTMLTemplateElement;

    isOpen: boolean;

    constructor() {
        this.isOpen = false
    }

    openCloseBurger () {
        this.burgerButton = document.querySelector('.header__burger-button') as HTMLTemplateElement;
        this.headerNav = document.querySelector('.header__nav') as HTMLTemplateElement;
        if (this.isOpen) {
            this.burgerButton.style.background = 'url("../assets/img/icon-burger.png") no-repeat center/cover';
            this.headerNav.style.display = Display.none;
            this.isOpen = false;
        } else {
            this.burgerButton.style.background = 'url("../assets/img/cross-burger.png") no-repeat center/cover';
            this.headerNav.style.display = Display.block;
            this.isOpen = true
        }
    }
}

export default Burger


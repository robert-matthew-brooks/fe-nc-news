export function showMenu (isMenuVisible, setIsMenuVisible) {
    const body = document.getElementsByTagName('body')[0];

    if (isMenuVisible) {
        setIsMenuVisible(true);
        body.classList.add('no-scroll');
    }
    else {
        setIsMenuVisible(false);
        body.classList.remove('no-scroll');
    }
}
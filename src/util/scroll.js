export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function preventScroll(isPrevented) {
    const body = document.getElementsByTagName('body')[0];

    if (isPrevented) {
        body.classList.add('no-scroll');
    }
    else {
        body.classList.remove('no-scroll');
    }
}
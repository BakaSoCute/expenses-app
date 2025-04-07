const POPUP_OPENED_CLASSNAME = 'popup_open';
const BODY_FIXED_CLASSNAME = "body_fixed";
const HTML_FIXED_CLASSNAME = "html_fixed"

const bodyNode = document.querySelector("body");
const htmlNode = document.querySelector("html")
const popupNode = document.getElementById('popup');
const btnOpenNode = document.getElementById("changeLimit");
const popupContentNode = document.getElementById("popup__content");
const btnCloseNode = document.getElementById("popup__button");

btnOpenNode.addEventListener('click', togglePopup);
btnCloseNode.addEventListener('click', togglePopup);
popupNode.addEventListener("click" , (event) =>{
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)

    if (isClickOutsideContent) {
        togglePopup();
    }
})


function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
    htmlNode.classList.toggle(HTML_FIXED_CLASSNAME)
}

const box = document.querySelector('.box');
const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');

const windowScreen = document.querySelector('.window_screen');
const windowWindow = document.querySelector('.window_window');
const windowViewport = document.querySelector('.window_viewport');
const windowDocument = document.querySelector('.window_document');
const windowContent = document.querySelector('.window_content');

const elementOffset = document.querySelector('.element_offset');
const elementClient = document.querySelector('.element_client');
const elementScroll = document.querySelector('.element_scroll');
const elementRendered = document.querySelector('.element_rendered');

const mouseClient = document.querySelector('.mouse_client');
const mousePage = document.querySelector('.mouse_page');
const mouseScreen = document.querySelector('.mouse_screen');
const mouseOffset = document.querySelector('.mouse_offset');

const setVerticalLineHeight = () => {
  vertical.style.height = `${document.documentElement.scrollHeight}px`;
};

const setTarget = () => {
  const startX =
    box.getBoundingClientRect().left + box.getBoundingClientRect().width / 2;
  const startY =
    box.getBoundingClientRect().top + box.getBoundingClientRect().height / 2;
  vertical.style.transform = `translateX(${startX}px)`;
  horizontal.style.transform = `translateY(${startY}px)`;
  const imgX = startX - target.getBoundingClientRect().width / 2;
  const imgY = startY - target.getBoundingClientRect().height / 2;
  target.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

const setWindowSize = () => {
  windowScreen.textContent = `Screen : ${window.screen.width}px, ${window.screen.height}px`;
  windowWindow.textContent = `Window : ${window.outerWidth}px, ${window.outerHeight}px`;
  windowViewport.textContent = `Viewport : ${window.innerWidth}px, ${window.innerHeight}px`;
  windowDocument.textContent = `Document : ${document.documentElement.clientWidth}px, ${document.documentElement.clientHeight}px`;
  windowContent.textContent = `Content : ${document.documentElement.scrollWidth}px, ${document.documentElement.scrollHeight}px`;
};

const setElementSize = () => {
  elementOffset.textContent = `Offset : ${box.offsetWidth}px, ${box.offsetHeight}px`;
  elementClient.textContent = `Client : ${box.clientWidth}px, ${box.clientHeight}px`;
  elementScroll.textContent = `Scroll : ${box.scrollWidth}px, ${box.scrollHeight}px`;
  elementRendered.textContent = `Rendered : ${box
    .getBoundingClientRect()
    .width.toFixed(2)}px, ${box.getBoundingClientRect().height.toFixed(2)}px`;
};

const handleLoad = () => {
  setVerticalLineHeight();
  setTarget();
  setWindowSize();
  setElementSize();
};

const handleResize = () => {
  setVerticalLineHeight();
  setTarget();
  setWindowSize();
  setElementSize();
};

const handleMouseMove = (event) => {
  mouseClient.textContent = `Client : ${event.clientX}px, ${event.clientY}px`;
  mousePage.textContent = `Page : ${event.pageX}px, ${event.pageY}px`;
  mouseScreen.textContent = `Screen : ${event.screenX}px, ${event.screenY}px`;
  mouseOffset.textContent = `Offset : ${event.offsetX}px, ${event.offsetY}px`;

  const mouseX = event.clientX;
  const mouseY = event.clientY;
  vertical.style.transform = `translateX(${mouseX}px)`;
  horizontal.style.transform = `translateY(${mouseY}px)`;

  const imgX = mouseX - target.getBoundingClientRect().width / 2;
  const imgY = mouseY - target.getBoundingClientRect().height / 2;
  target.style.transform = `translate(${imgX}px, ${imgY}px)`;
};

window.addEventListener('load', handleLoad);
window.addEventListener('resize', handleResize);
box.addEventListener('mousemove', handleMouseMove);

M.AutoInit();
document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  elems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(elems);
  elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
  let carousel = document.querySelectorAll(".carousel");
  let element = M.Carousel.init(carousel, {
    fullWidth: true,
    indicators: true,
  });

  let i = 0;
  setInterval(() => {
    i == 5 ? (i = 0) : (i = i);
    setTimeout(() => {
      element[i].next();
      i++;
    }, 500);
  }, 2000);
});

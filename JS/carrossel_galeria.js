// const Wrapper = document.querySelector(".galeria");
// const Carousel = document.querySelector(".carousel_gl");
// const firstCard_Width = Carousel.querySelector(".cards").offsetWidth;
// const arrow_Btns = document.querySelectorAll(".galeria i");
// const CarouselChildrens = [...Carousel.children];

// let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// // Obtém o número de cartões que podem caber no carrossel de uma vez
// let cardPerView = Math.round(Carousel.offsetWidth / firstCard_Width);

// // Insere cópias dos últimos cartões no início do carrossel para rolagem infinita
// CarouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//     Carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
// });

// // Insere cópias dos primeiros cartões no final do carrossel para rolagem infinita
// CarouselChildrens.slice(0, cardPerView).forEach(card => {
//     Carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });

// // Rola o carrossel na posição apropriada para ocultar os primeiros cartões duplicados no Firefox
// Carousel.classList.add("no-transition");
// Carousel.scrollLeft = Carousel.offsetWidth;
// Carousel.classList.remove("no-transition");

// // Adiciona ouvintes de eventos para os botões de seta para rolar o carrossel para a esquerda e para a direita
// arrow_Btns.forEach(btn => {
//     btn.addEventListener("click", () => {
//         Carousel.scrollLeft += btn.id == "left" ? -firstCard_Width : firstCard_Width;
//     });
// });

// const dragStart = (e) => {
//     isDragging = true;
//     Carousel.classList.add("dragging");
//     // Registra a posição inicial do cursor e de rolagem do carrossel
//     startX = e.pageX;
//     startScrollLeft = Carousel.scrollLeft;
// }

// const dragging = (e) => {
//     if(!isDragging) return; // Retorna se isDragging for falso
//     // Atualiza a posição de rolagem do carrossel com base no movimento do cursor
//     Carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
// }

// const dragStop = () => {
//     isDragging = false;
//     Carousel.classList.remove("dragging");
// }

// const infiniteScroll = () => {
//     // Se o carrossel estiver no início, rola para o final
//     if(Carousel.scrollLeft === 0) {
//         Carousel.classList.add("no-transition");
//         Carousel.scrollLeft = Carousel.scrollWidth - (2 * Carousel.offsetWidth);
//         Carousel.classList.remove("no-transition");
//     }
//     // Se o carrossel estiver no final, rola para o início
//     else if(Math.ceil(Carousel.scrollLeft) === Carousel.scrollWidth - Carousel.offsetWidth) {
//         Carousel.classList.add("no-transition");
//         Carousel.scrollLeft = Carousel.offsetWidth;
//         Carousel.classList.remove("no-transition");
//     }

//     // Limpa o timeout existente e inicia o autoplay se o mouse não estiver sobre o carrossel
//     clearTimeout(timeoutId);
//     if(!Wrapper.matches(":hover")) autoPlay();
// }

// const autoPlay = () => {
//     if(!isAutoPlay) return;
//     // Reproduz automaticamente o carrossel a cada 2500 ms
//     timeoutId = setTimeout(() => Carousel.scrollLeft += firstCard_Width, 2500);
// }
// autoPlay();

// Carousel.addEventListener("mousedown", dragStart);
// Carousel.addEventListener("mousemove", dragging);
// document.addEventListener("mouseup", dragStop);
// Carousel.addEventListener("scroll", infiniteScroll);
// Wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// Wrapper.addEventListener("mouseleave", autoPlay);




(function () {
    const Wrapper = document.querySelector(".galeria");
    const Carousel = document.querySelector(".carousel_gl");
    const firstCard_Width = Carousel.querySelector(".cards").offsetWidth;
    const arrow_Btns = document.querySelectorAll(".galeria i");
    const CarouselChildrens = [...Carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(Carousel.offsetWidth / firstCard_Width);

    CarouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        Carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    CarouselChildrens.slice(0, cardPerView).forEach(card => {
        Carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    Carousel.classList.add("no-transition");
    Carousel.scrollLeft = Carousel.offsetWidth;
    Carousel.classList.remove("no-transition");

    arrow_Btns.forEach(btn => {
        btn.addEventListener("click", () => {
            Carousel.scrollLeft += btn.id == "left" ? -firstCard_Width : firstCard_Width;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        Carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = Carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        Carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        Carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        if (Carousel.scrollLeft === 0) {
            Carousel.classList.add("no-transition");
            Carousel.scrollLeft = Carousel.scrollWidth - (2 * Carousel.offsetWidth);
            Carousel.classList.remove("no-transition");
        } else if (Math.ceil(Carousel.scrollLeft) === Carousel.scrollWidth - Carousel.offsetWidth) {
            Carousel.classList.add("no-transition");
            Carousel.scrollLeft = Carousel.offsetWidth;
            Carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if (!Wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (!isAutoPlay) return;
        timeoutId = setTimeout(() => Carousel.scrollLeft += firstCard_Width, 2500);
    }
    autoPlay();

    Carousel.addEventListener("mousedown", dragStart);
    Carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    Carousel.addEventListener("scroll", infiniteScroll);
    Wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    Wrapper.addEventListener("mouseleave", autoPlay);
})();

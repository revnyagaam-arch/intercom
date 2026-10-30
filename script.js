// ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ

const animatedElements = document.querySelectorAll(
    ".service-card, .about, .request"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});


// ДИНАМИЧЕСКИЙ ГОД

const footerText = document.querySelector(".footer p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} ИНТЕРКОМ. Все права защищены.`;
}


// ПЛАВЫЙ ПЕРЕХОД ПО ССЫЛКАМ

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* АНИМАЦИЯ ПОЯВЛЕНИЯ */

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ПОДСВЕТКА ПРИ НАВЕДЕНИИ */

.service-card {
    cursor: default;
    transition:
        transform 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.service-card:hover {
    transform: translateY(-8px);
    border-color: #438bff;
    box-shadow: 0 12px 35px rgba(38, 119, 255, 0.15);
}

/* ВЫДЕЛЕНИЕ ТЕКСТА */

::selection {
    background: #2677ff;
    color: #ffffff;
}

/* УВАЖЕНИЕ К НАСТРОЙКЕ УМЕНЬШЕНИЯ АНИМАЦИИ */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
    }
}

/* =====================================
   INTERCOM — JAVASCRIPT
===================================== */


// ТЕКУЩИЙ ГОД В ПОДВАЛЕ

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// АНИМАЦИЯ ПОЯВЛЕНИЯ

const animatedElements = document.querySelectorAll(
    ".service-card, .about, .request, .contacts"
);

if ("IntersectionObserver" in window) {

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
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });

} else {

    animatedElements.forEach((element) => {
        element.classList.add("visible");
    });

}


// ПЛАВНАЯ ПРОКРУТКА

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// ФОРМА ЗАЯВКИ

const requestForm = document.getElementById("request-form");

if (requestForm) {

    requestForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const formData = new FormData(requestForm);

        const name = formData.get("name").trim();
        const phone = formData.get("phone").trim();
        const service = formData.get("service");
        const message = formData.get("message").trim();

        const status = document.getElementById("form-status");

        if (!name || !phone || !service || !message) {

            status.textContent = "Пожалуйста, заполните все поля.";
            return;

        }

        status.textContent =
            "Форма готова к отправке. Подключение Telegram будет следующим этапом.";

    });

}

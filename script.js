/* =====================================
   INTERCOM — JAVASCRIPT
===================================== */

// НАСТРОЙКИ SUPABASE
const SUPABASE_URL = "https://anheqefmyqzwjzasucfe.supabase.co";
const SUPABASE_KEY = "ВСТАВЬ_СЮДА_ПУБЛИЧНЫЙ_SB_PUBLISHABLE_КЛЮЧ";


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
        { threshold: 0.12 }
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
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ФОРМА ЗАЯВКИ

const requestForm = document.getElementById("request-form");

if (requestForm) {
    requestForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const status = document.getElementById("form-status");
        const submitButton = requestForm.querySelector('button[type="submit"]');

        const formData = new FormData(requestForm);

        const name = String(formData.get("name") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !phone || !service || !message) {
            status.textContent = "Пожалуйста, заполните все поля.";
            return;
        }

        if (SUPABASE_KEY.startsWith("ВСТАВЬ_")) {
            status.textContent = "Не указан публичный ключ Supabase.";
            return;
        }

        status.textContent = "Отправляем заявку...";
        if (submitButton) submitButton.disabled = true;

        try {
            const response = await fetch(
                `${SUPABASE_URL}/functions/v1/bright-responder`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        service,
                        message
                    })
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Ошибка отправки");
            }

            status.textContent = "Заявка успешно отправлена! Мы свяжемся с вами.";
            requestForm.reset();

        } catch (error) {
            console.error("Ошибка отправки заявки:", error);
            status.textContent =
                "Не удалось отправить заявку. Попробуйте позже.";
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}

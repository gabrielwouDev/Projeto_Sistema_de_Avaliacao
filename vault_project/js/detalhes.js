document.addEventListener("DOMContentLoaded", () => {
    // interação visual das estrelinhas
    const ratingPills = document.querySelectorAll(".rating-pill");
    const ratingText = document.getElementById("selected-rating-text");
    const starsContainer = document.getElementById("interactive-stars");

    function renderStars(score) {
        starsContainer.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.classList.add("star");
            star.textContent = "★";

            if (score >= i) {
                star.classList.add("filled");
            } else if (score >= i - 0.5) {
                star.classList.add("half");
            }
            starsContainer.appendChild(star);
        }
    }

    ratingPills.forEach(pill => {
        pill.addEventListener("click", () => {
            ratingPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");

            const val = parseFloat(pill.getAttribute("data-value"));
            ratingText.textContent = `${val.toFixed(1).replace(".", ",")} / 5`;
            renderStars(val);
        });
    });

    // caracteres dos comentários limite
    const commentInput = document.getElementById("review-comment");
    const charCounter = document.getElementById("char-counter");

    if (commentInput && charCounter) {
        const updateCounter = () => {
            const len = commentInput.value.length;
            charCounter.textContent = `${len} / 1.000`;
        };
        updateCounter();
        commentInput.addEventListener("input", updateCounter);
    }

    // botão minha lista
    const btnAddList = document.getElementById("btn-add-list");
    if (btnAddList) {
        btnAddList.addEventListener("click", () => {
            const isAdded = btnAddList.classList.toggle("added");
            btnAddList.textContent = isAdded ? "Na minha lista ✓" : "Adicionar à lista +";
        });
    }
});
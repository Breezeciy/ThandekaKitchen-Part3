document.addEventListener("DOMContentLoaded", function() {
    // --- 1. ACCORDION (Index Page) ---
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }

    // --- 2. MENU SEARCH FILTER (Menu Page) ---
    const searchInput = document.getElementById('menuSearch');
    if(searchInput) {
        searchInput.addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            let items = document.querySelectorAll('main section li');
            items.forEach(item => {
                let text = item.textContent.toLowerCase();
                if(text.includes(filter)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    }

    // --- 3. GALLERY LIGHTBOX (Gallery Page) ---
    const galleryImages = document.querySelectorAll('main:has(img + img) img');
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-lightbox');
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = "flex";
                lightboxImg.src = this.src;
            });
        });
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = "none";
        });
        lightbox.addEventListener('click', function(e) {
            if(e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

    // --- 4. FORM VALIDATION & AJAX SUBMISSION (Contact & Enquiry) ---
    const forms = document.querySelectorAll('.ajax-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                if(!input.value.trim()) {
                    isValid = false;
                    if(input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                        input.nextElementSibling.style.display = 'block';
                    }
                }
            });

            const email = form.querySelector('input[type="email"]');
            if(email && email.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailRegex.test(email.value)) {
                    isValid = false;
                    email.nextElementSibling.style.display = 'block';
                    email.nextElementSibling.textContent = "Please enter a valid email address.";
                }
            }

            if(isValid) {
                const btn = form.querySelector('.btn-submit');
                const originalText = btn.textContent;
                btn.textContent = "Sending...";
                btn.disabled = true;

                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    const successMsg = form.querySelector('.success-message');
                    if(successMsg) {
                        successMsg.style.display = 'block';
                        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
                    }
                }, 1500);
            }
        });
    });
});
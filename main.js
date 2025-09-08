// Highlight active link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar a");

    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
          link.classList.add("active");
        }
      });
    });

    // Handle modal images with carousel
    const imageModal = document.getElementById('imageModal');
    const modalCarouselInner = document.getElementById('modalCarouselInner');

    imageModal.addEventListener('show.bs.modal', event => {
      const trigger = event.relatedTarget;
      const images = JSON.parse(trigger.getAttribute('data-images'));
      modalCarouselInner.innerHTML = images.map((src, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${src}" alt="Gallery image">
        </div>
      `).join('');
    });

    // Contact form with Google Forms
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      // Google Form action URL
      const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSdEidMW7Tgj8Y53pDoQ6sqD_-PciTHABdtsqCxo4N_uPGiDXg/formResponse";

      const data = new URLSearchParams();
      // Map your form fields to Google Form entry IDs
      data.append("entry.1264725144", formData.get("name"));
      data.append("entry.1205019245", formData.get("email"));
      data.append("entry.1110060342", formData.get("message"));

      try {
        await fetch(googleFormURL, {
          method: "POST",
          mode: "no-cors",
          body: data
        });
        formStatus.textContent = "Message sent successfully!";
        formStatus.classList.add("text-success");
        contactForm.reset();
      } catch (error) {
        formStatus.textContent = "Error sending message.";
        formStatus.classList.add("text-danger");
      }
    });
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Menú Hamburguesa Responsivo
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Cerrar menú al hacer click en cualquier link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  // 2. Resaltar Link Activo en Navegación durante Scroll
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Filtrado de Proyectos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase activa de todos los botones
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal de Detalle de Proyectos
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeModalBtns = [document.getElementById('close-modal'), document.getElementById('close-modal-btn')];
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalTitle.textContent = btn.getAttribute('data-title');
      modalDesc.textContent = btn.getAttribute('data-desc');
      modal.style.display = 'flex';
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 5. Animación de Barras de Habilidades al hacer Scroll
  const skillSection = document.getElementById('habilidades');
  const progressBars = document.querySelectorAll('.skill-progress');
  let animated = false;

  window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      progressBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-progress');
      });
      animated = true;
    }
  });

  // 6. Validaciones y Envío del Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');
  const formMessage = document.getElementById('form-message');

  // Funciones de validación
  const validateNombre = () => {
    const value = nombreInput.value.trim();
    const error = document.getElementById('error-nombre');
    if (value.length < 3) {
      nombreInput.classList.add('invalid');
      error.style.display = 'block';
      return false;
    } else {
      nombreInput.classList.remove('invalid');
      error.style.display = 'none';
      return true;
    }
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const error = document.getElementById('error-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailInput.classList.add('invalid');
      error.style.display = 'block';
      return false;
    } else {
      emailInput.classList.remove('invalid');
      error.style.display = 'none';
      return true;
    }
  };

  const validateMensaje = () => {
    const value = mensajeInput.value.trim();
    const error = document.getElementById('error-mensaje');
    if (value.length < 10) {
      mensajeInput.classList.add('invalid');
      error.style.display = 'block';
      return false;
    } else {
      mensajeInput.classList.remove('invalid');
      error.style.display = 'none';
      return true;
    }
  };

  // Listener para validación en tiempo real al escribir
  nombreInput.addEventListener('input', validateNombre);
  emailInput.addEventListener('input', validateEmail);
  mensajeInput.addEventListener('input', validateMensaje);

  // Submit del Formulario
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isMensajeValid = validateMensaje();

    if (isNombreValid && isEmailValid && isMensajeValid) {
      // Simulación de envío exitoso
      formMessage.className = 'form-message success';
      formMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado exitosamente.';
      formMessage.style.display = 'block';

      contactForm.reset();

      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  });

  // 7. Botón "Volver Arriba" (Back to Top)
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
(function () {
  'use strict';

  // Menu mobile
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Scroll doux pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      e.preventDefault();
      var el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Formulaire de contact (demo : message local)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      if (!name || !email || !message) return;
      alert('Merci ' + name + ' ! Votre message a bien été envoyé.\n(En production, connectez ce formulaire à votre backend ou service d\'email.)');
      form.reset();
    });
  }

  // CTA "Accéder à la formation" -> scroll vers tarifs
  var navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('click', function (e) {
      e.preventDefault();
      var tarifs = document.getElementById('tarifs');
      if (tarifs) tarifs.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

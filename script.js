"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const botaoAbrir = document.querySelector("#botaoAbrir");
  const confirmarPresenca = document.querySelector("#confirmarPresenca");
  const listaPresentes = document.querySelector("#listaPresentes");
  const elementosRevelar = document.querySelectorAll(".revelar");

  // Preencha depois somente com números: 55 + DDD + telefone.
  const telefoneWhatsApp = "";

  // Cole aqui o link da lista de presentes quando estiver definido.
  const linkListaPresentes = "";

  const parametros = new URLSearchParams(window.location.search);
  const nomeConvidado = parametros.get("convidado")?.trim();

  if (telefoneWhatsApp) {
    const mensagem = nomeConvidado
      ? `Olá, eu, ${nomeConvidado}, confirmo presença para uma noite de sonhos e encantos.`
      : "Olá, presença confirmada para uma noite de sonhos e encantos.";

    confirmarPresenca.href =
      `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    confirmarPresenca.classList.remove("desativado");
    confirmarPresenca.removeAttribute("aria-disabled");

    const aviso = document.querySelector("#avisoWhatsapp");
    if (aviso) aviso.hidden = true;
  }

  if (linkListaPresentes) {
    listaPresentes.href = linkListaPresentes;
    listaPresentes.target = "_blank";
    listaPresentes.rel = "noopener noreferrer";
    listaPresentes.classList.remove("desativado");
    listaPresentes.removeAttribute("aria-disabled");
  }

  document.querySelectorAll(".desativado").forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
      evento.preventDefault();
    });
  });

  botaoAbrir?.addEventListener("click", () => {
    document.querySelector("#mensagem")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elementosRevelar.forEach((elemento) => observador.observe(elemento));
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const botaoAbrir = document.querySelector("#botaoAbrir");
  const confirmarPresenca = document.querySelector("#confirmarPresenca");
  const listaPresentes = document.querySelector("#listaPresentes");
  const elementosRevelar = document.querySelectorAll(".revelar");

  const abrirPresentes = document.querySelector("#abrirPresentes");
  const fecharPresentes = document.querySelector("#fecharPresentes");
  const modalPresentes = document.querySelector("#modalPresentes");

  abrirPresentes?.addEventListener("click", () => {
    modalPresentes?.classList.add("aberto");
    modalPresentes?.setAttribute("aria-hidden", "false");
    fecharPresentes?.focus();
  });

  const fecharModalPresentes = () => {
    modalPresentes?.classList.remove("aberto");
    modalPresentes?.setAttribute("aria-hidden", "true");
    abrirPresentes?.focus();
  };

  fecharPresentes?.addEventListener("click", fecharModalPresentes);

  modalPresentes?.addEventListener("click", (evento) => {
    if (evento.target === modalPresentes) {
      fecharModalPresentes();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalPresentes?.classList.contains("aberto")) {
      fecharModalPresentes();
    }
  });


  // Preencha depois somente com números: 55 + DDD + telefone.
  const telefoneWhatsApp = "5511953902311";

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

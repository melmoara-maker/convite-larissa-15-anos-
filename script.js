"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const botaoAbrir = document.querySelector("#botaoAbrir");
  const botaoMusicaCapa = document.querySelector("#botaoMusicaCapa");
  const musica = document.querySelector("#musica");
  const capa = document.querySelector(".capa-imagem");
  const confirmarPresenca = document.querySelector("#confirmarPresenca");
  const elementosRevelar = document.querySelectorAll(".revelar");

  const telefoneWhatsApp = "5511953902311";
  let musicaTocando = false;

  const parametros = new URLSearchParams(window.location.search);
  const nomeConvidado = parametros.get("convidado")?.trim();

  const mensagem = nomeConvidado
    ? `Olá, eu, ${nomeConvidado}, confirmo presença para uma noite de sonhos e encantos.`
    : "Olá, presença confirmada para uma noite de sonhos e encantos.";

  confirmarPresenca.href =
    `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  confirmarPresenca.classList.remove("desativado");
  confirmarPresenca.removeAttribute("aria-disabled");

  const avisoWhatsapp = document.querySelector("#avisoWhatsapp");
  if (avisoWhatsapp) avisoWhatsapp.hidden = true;

  async function iniciarMusica() {
    try {
      await musica.play();
      musicaTocando = true;
      botaoMusicaCapa?.classList.add("tocando");
      if (botaoMusicaCapa) botaoMusicaCapa.textContent = "❚❚ Instrumental";
    } catch (erro) {
      console.warn("O navegador bloqueou a reprodução da música.", erro);
    }
  }

  function pausarMusica() {
    musica.pause();
    musicaTocando = false;
    botaoMusicaCapa?.classList.remove("tocando");
    if (botaoMusicaCapa) botaoMusicaCapa.textContent = "♪ Instrumental";
  }

  botaoAbrir?.addEventListener("click", async () => {
    if (capa?.classList.contains("abrindo-portas")) return;

    if (!musicaTocando) {
      await iniciarMusica();
    }

    capa?.classList.add("abrindo-portas");

    window.setTimeout(() => {
      capa?.classList.add("portas-abertas");

      document.querySelector("#mensagem")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 1650);
  });

  botaoMusicaCapa?.addEventListener("click", async () => {
    if (musicaTocando) {
      pausarMusica();
    } else {
      await iniciarMusica();
    }
  });

  const abrirPresentes = document.querySelector("#abrirPresentes");
  const fecharPresentes = document.querySelector("#fecharPresentes");
  const modalPresentes = document.querySelector("#modalPresentes");

  const abrirModalPresentes = () => {
    modalPresentes?.classList.add("aberto");
    modalPresentes?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    fecharPresentes?.focus();
  };

  const fecharModalPresentes = () => {
    modalPresentes?.classList.remove("aberto");
    modalPresentes?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
    abrirPresentes?.focus();
  };

  abrirPresentes?.addEventListener("click", abrirModalPresentes);
  fecharPresentes?.addEventListener("click", fecharModalPresentes);

  modalPresentes?.addEventListener("click", (evento) => {
    if (evento.target === modalPresentes) fecharModalPresentes();
  });

  document.addEventListener("keydown", (evento) => {
    if (
      evento.key === "Escape" &&
      modalPresentes?.classList.contains("aberto")
    ) {
      fecharModalPresentes();
    }
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

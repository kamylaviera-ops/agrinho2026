let agricultor;
let plantas = [];
let lixos = [];

let pontos = 0;
let poluicao = 20;
let estado = "jogando";

function setup() {
  createCanvas(900, 600);

  agricultor = {
    x: width / 2,
    y: height - 80,
    tamanho: 40
  };

  for (let i = 0; i < 8; i++) {
    plantas.push(criarPlanta());
  }

  for (let i = 0; i < 4; i++) {
    lixos.push(criarLixo());
  }
}

function draw() {
  desenharCenario();

  if (estado === "jogando") {
    moverJogador();

    for (let planta of plantas) {
      mostrarPlanta(planta);

      if (
        dist(agricultor.x, agricultor.y, planta.x, planta.y) < 30
      ) {
        pontos += 10;
        poluicao -= 3;
        planta.x = random(50, width - 50);
        planta.y = random(120, height - 50);
      }
    }

    for (let lixo of lixos) {
      mostrarLixo(lixo);
      lixo.y += lixo.vel;

      if (lixo.y > height + 20) {
        lixo.y = -20;
        lixo.x = random(width);
      }

      if (
        dist(agricultor.x, agricultor.y, lixo.x, lixo.y) < 30
      ) {
        poluicao += 10;
        lixo.y = -20;
        lixo.x = random(width);
      }
    }

    poluicao += 0.02;
    poluicao = constrain(poluicao, 0, 100);

    desenharJogador();

    fill(0);
    textSize(24);
    text("Pontos: " + pontos, 20, 35);
    text("Poluição: " + floor(poluicao) + "%", 20, 70);

    if (pontos >= 200) {
      estado = "vitoria";
    }

    if (poluicao >= 100) {
      estado = "derrota";
    }
  }

  if (estado === "vitoria") {
    telaFinal(
      "AGRO FORTE!",
      "Você produziu alimentos preservando a natureza!"
    );
  }

  if (estado === "derrota") {
    telaFinal(
      "MEIO AMBIENTE EM RISCO!",
      "A poluição ficou muito alta."
    );
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) agricultor.x -= 6;
  if (keyIsDown(RIGHT_ARROW)) agricultor.x += 6;
  if (keyIsDown(UP_ARROW)) agricultor.y -= 6;
  if (keyIsDown(DOWN_ARROW)) agricultor.y += 6;

  agricultor.x = constrain(agricultor.x, 20, width - 20);
  agricultor.y = constrain(agricultor.y, 100, height - 20);
}

function desenharJogador() {
  fill(40, 90, 220);
  ellipse(agricultor.x, agricultor.y - 15, 25);

  fill(50, 150, 50);
  rect(agricultor.x - 12, agricultor.y, 24, 35);
}

function criarPlanta() {
  return {
    x: random(50, width - 50),
    y: random(120, height - 50)
  };
}

function mostrarPlanta(planta) {
  fill(120, 80, 40);
  rect(planta.x - 3, planta.y, 6, 15);

  fill(0, 180, 0);
  ellipse(planta.x - 5, planta.y, 12);
  ellipse(planta.x + 5, planta.y, 12);
  ellipse(planta.x, planta.y - 8, 12);
}

function criarLixo() {
  return {
    x: random(width),
    y: random(-500, -20),
    vel: random(2, 4)
  };
}

function mostrarLixo(lixo) {
  fill(90);
  rect(lixo.x - 10, lixo.y - 10, 20, 20);

  fill(255, 200, 0);
  triangle(
    lixo.x - 8,
    lixo.y - 15,
    lixo.x + 8,
    lixo.y - 15,
    lixo.x,
    lixo.y - 25
  );
}

function desenharCenario() {
  background(135, 206, 235);

  fill(70, 180, 70);
  rect(0, 100, width, height - 100);

  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("AGRO FORTE, FUTURO SUSTENTÁVEL", width / 2, 50);

  textSize(16);
  text(
    "Colete mudas 🌱 e evite resíduos poluentes",
    width / 2,
    80
  );
}

function telaFinal(titulo, mensagem) {
  background(20, 40, 70);

  fill(255);
  textAlign(CENTER);
  textSize(42);
  text(titulo, width / 2, height / 2 - 40);

  textSize(24);
  text(mensagem, width / 2, height / 2 + 20);

  textSize(20);
  text("Pontuação: " + pontos, width / 2, height / 2 + 70);
}

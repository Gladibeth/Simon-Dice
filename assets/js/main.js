
// variables 
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
var name = prompt('¿Cual su tú nombre?')

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.secuencia()
    setTimeout(this.siguienteNivel(), 500)

  }

  inicializar() {
    this.toogleBtnEmpezar()
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toogleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')

    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  // seuencia de ls 10 niveles
  secuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    // console.log(this.secuencia)
  }

  // para que en cada nivel se ilumine de un color
  siguienteNivel() {
    this.subnivel = 0
    this.iluminar()
    this.agregarSecuencia()
  }


  // se agarran los colores de array y se pasan las clases de cada uno de los botones
  transformar(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColor(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3


    }
  }


  // se recorre el transformando los nuemeros encolores dependiendo de la secuencia en la  que este
  iluminar() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformar(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  // activamos los colores al ver que estan encendidos

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }


  // apagamos los botones quitandole la clase en un cierto tiempo
  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }


  agregarSecuencia() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarElemntosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }


  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColor(nombreColor)
    this.iluminarColor(nombreColor)

    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++

      if (this.subnivel === this.nivel) {
        this.nivel++

        this.eliminarElemntosClick()


        if (this.nivel == (ULTIMO_NIVEL + 1)) {
          // Ganó

          this.ganoElJuego()

        } else {
          setTimeout(this.siguienteNivel, 1500)
        }

      }
    } else {
      // perdió

      this.perdioElJuego()
    }
  }
  ganoElJuego() {
    swal(`${name}`, 'Felicidades Ganaste el juego', 'success')
      .then(this.inicializar)
  }
  perdioElJuego() {
    swal(`${name}`, 'Lo lamento perdiste :(', 'error')
      .then(() => {
        this.eliminarElemntosClick()
        this.inicializar()
      })
  }

}


// funcion que llama a la case que tienes en su constructor cada una dela funciones que hacenfuncioanr al juego
function empezarJuego() {
  window.juego = new Juego()
}


import { useState, useRef } from 'react'
import './App.css'


import miFoto from './assets/isai.jpg'
import conAltura from './assets/con-altura.mp3'
import magia from './assets/magia.mp3'
import florecienta from './assets/florecienta.mp3'

function App() {
  const [pantalla, setPantalla] = useState("inicio")
  const [faseFlores, setFaseFlores] = useState("azules")
  const [magiaActiva, setMagiaActiva] = useState(false)
  const [intentos, setIntentos] = useState(0)
  const [posicionNo, setPosicionNo] = useState({
    x: 0,
    y: 0
  })

  const audioConAltura = useRef(null)
  const escapar = () => {
  setIntentos((actual) => actual + 1)

  const x = Math.random() * 300 - 150
  const y = Math.random() * 200 - 100

  setPosicionNo({
    x: x,
    y: y
  })
}
  const hacerMagia = () => {
    if (audioConAltura.current) {
    audioConAltura.current.pause()
    audioConAltura.current.currentTime = 0
  }
  setMagiaActiva(true)

  const sonidoMagia = new Audio(magia)
  sonidoMagia.volume = 0.8
  sonidoMagia.play()

  setTimeout(() => {
    setFaseFlores("amarillas")

    const sonidoFinal = new Audio(florecienta)
    sonidoFinal.volume = 0.8
    sonidoFinal.play()
  }, 1800)
}

  return (
    <main>

      {/* INICIO */}
      {pantalla === "inicio" && (
        <>
          <h1>🌻 Sistema de verificación</h1>

          <p>
            Antes de continuar, necesitamos comprobar algunos datos.
          </p>

          <button
            className="boton"
            onClick={() => setPantalla("pregunta1")}
          >
            Comenzar
          </button>
        </>
      )}


      {/* PREGUNTA 1 */}
      {pantalla === "pregunta1" && (
        <>
          <h1>Primera pregunta 👀</h1>

          <p>¿Sabes qué fecha es hoy?</p>

          <div className="botones">
            <button
              className="boton"
              onClick={() => setPantalla("pregunta2")}
            >
              Sí
            </button>

            <button
              className="boton"
              onClick={() => setPantalla("pregunta2")}
            >
              Definitivamente no
            </button>
          </div>
        </>
      )}


      {/* PREGUNTA 2 */}
      {pantalla === "pregunta2" && (
        <>
          <h1>Segunda pregunta 🌮</h1>

          <p>¿Rechazarías una caldosa?</p>

          <div className="botones">
            <button
              className="boton"
              onClick={() => setPantalla("pregunta3")}
            >
              Obvio que sí
            </button>

            <button
              className="boton"
              onClick={() => setPantalla("pregunta3")}
            >
              Qué hp más necio mae
            </button>
          </div>
        </>
      )}


      {/* PREGUNTA 3 */}
      {pantalla === "pregunta3" && (
        <>
          <h1>Tercera pregunta 🤧</h1>

          <p>
            Me dio gripe, estoy muriendo, ¿me ayudas?
          </p>

          <div className="botones">
            <button
              className="boton"
              onClick={() => setPantalla("pregunta4")}
            >
              No
            </button>

            <button
              className="boton"
              onClick={() => setPantalla("pregunta4")}
            >
              Obvio que sí corazón
            </button>
          </div>
        </>
      )}


      {/* PREGUNTA 4 */}
      {pantalla === "pregunta4" && (
        <>
          <h1>Cuarta pregunta 🤔</h1>

          <p>
            ¿Este tipo se te hace atractivo?
          </p>

          <img
            src={miFoto}
            alt="El sujeto de la investigación"
            className="foto"
          />

          <div className="pregunta4">

            <button
              className="boton boton-huye"
              onMouseEnter={escapar}
              style={{
                transform: `translate(${posicionNo.x}px, ${posicionNo.y}px)`
              }}
            >
              No
            </button>

            <div className="verdad-container">

              {intentos >= 7 && (
                <div className="mensaje-verdad">
                  <span>Seguirá escapando hasta que digas la verdad.</span>
                  <div className="flecha">↓</div>
                </div>
              )}

              <button
                className="boton"
                onClick={() => {
                  audioConAltura.current = new Audio (conAltura) 
                  audioConAltura.current.volume = 0.8

                  audioConAltura.current.play().catch((error) => { console.log("No se pudo reproducir Con Altura:", error)

                   })
                  setPantalla("floresAzules")
                }}
              >
                Sí, demasiado
              </button>

            </div>

          </div>
        </>
      )}


            {/* FLORES AZULES */}
      {pantalla === "floresAzules" && (
        <div
          className={`pantalla-flores ${faseFlores} ${
            magiaActiva ? "haciendo-magia" : ""
          }`}
        >

          {faseFlores === "azules" && (
            <>
              <div className="flores-borde">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="flor-azul"
                    style={{
                      animationDelay: `${i * 0.25}s`,
                      left: `${(i * 37) % 100}%`,
                      top: `${(i * 61) % 100}%`,
                    }}
                  >
                    🌸
                  </div>
                ))}
              </div>

              <div className="contenido-azul">

                <h1>¿Qué es esto...? 🤨</h1>

                <div className="flores-apareciendo">
                  <span>🌸</span>
                  <span>🌸</span>
                  <span>🌸</span>
                </div>

                <div className="alerta-azul">
                  <h2 style={{color: "black"}}>⚠️ ADVERTENCIA</h2>

                  <p>
                    Se han detectado flores azules.
                  </p>

                  <p>
                    Esto no es aceptable.
                  </p>
                </div>

                <button
                  className="boton magia-boton"
                  onClick={hacerMagia}
                >
                  Hacer magia ✨
                </button>

              </div>
            </>
          )}

          {faseFlores === "amarillas" && (
            <div className="final-flores">

              <div className="flores-finales">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="flor-amarilla"
                    style={{
                      left: `${(i * 43) % 100}%`,
                      top: `${(i * 67) % 100}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  >
                    🌻
                  </div>
                ))}
              </div>

              <div className="mensaje-final">

                <h1 style={{color:"#543d00"}}>🌻 Problema solucionado 🌻</h1>

                <p>
                  Para que luego diga que no le sé a la programación.
                </p>

                <p className="frase-final">
                  Ten, tus flores amarillas. 🌻
                </p>

                <p>
                  Recuerda: nada supera una buena caldosa,
                  guapis chulis.
                </p>

                <p className="firma">
                  — Un sapo 🐸
                </p>

              </div>

            </div>
          )}

        </div>
      )}
    </main>
  )
}

export default App
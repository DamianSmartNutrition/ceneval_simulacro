import React, { useState, useMemo, useEffect } from "react";
import logo from "./Smart_logo.svg";
import fruitBg from "./fruit-bg.svg";

interface Pregunta { 
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

const preguntas: Pregunta[] = [
  {
    pregunta: "¿Cuál es la principal función de la lipasa pancreática?",
    opciones: [
      "Digestión de proteínas",
      "Digestión de lípidos",
      "Digestión de carbohidratos",
      "Síntesis de ácidos grasos",
    ],
    correcta: 1,
    explicacion:
      "La lipasa pancreática hidroliza los triglicéridos en ácidos grasos y glicerol.",
  },
  {
    pregunta: "¿Qué vitamina es esencial para la coagulación sanguínea?",
    opciones: ["Vitamina A", "Vitamina C", "Vitamina K", "Vitamina D"],
    correcta: 2,
    explicacion:
      "La vitamina K es necesaria para la síntesis de factores de coagulación.",
  },
  {
    pregunta:
      "¿Cuál es el principal monosacárido que circula en sangre y es fuente primaria de energía?",
    opciones: ["Fructosa", "Galactosa", "Glucosa", "Sacarosa"],
    correcta: 2,
    explicacion:
      "La glucosa es el principal monosacárido en sangre y la fuente primaria de energía para las células.",
  },
  {
    pregunta:
      "¿Qué parámetro antropométrico es más útil para evaluar desnutrición aguda en niños?",
    opciones: [
      "Peso para la talla",
      "Talla para la edad",
      "Peso para la edad",
      "Índice de masa corporal",
    ],
    correcta: 0,
    explicacion:
      "El peso para la talla es el mejor indicador de desnutrición aguda en niños.",
  },
  {
    pregunta: "¿Cuál de los siguientes lípidos es esencial en la dieta humana?",
    opciones: [
      "Ácido linoleico",
      "Ácido palmítico",
      "Ácido esteárico",
      "Colesterol",
    ],
    correcta: 0,
    explicacion:
      "El ácido linoleico es un ácido graso esencial que debe obtenerse de la dieta.",
  },
  {
    pregunta:
      "En términos de precio por calorías, ¿cuál de los siguientes alimentos es el más barato y más nutritivo?",
    opciones: [
      "Una manzana",
      "Rebanada de pan",
      "hamburguesa con queso",
      "Brócoli",
    ],
    correcta: 1,
    explicacion:
      "En el equilibrio de ser barato y proporcionar calorías de forma eficiente, la rebanada de pan es la opción más adecuada.",
  },
  {
    pregunta:
      "¿Qué vitamina es fundamental para la absorción de calcio en el intestino?",
    opciones: ["Vitamina A", "Vitamina D", "Vitamina E", "Vitamina K"],
    correcta: 1,
    explicacion: "La vitamina D favorece la absorción intestinal de calcio.",
  },
  {
    pregunta:
      "¿Cuál es la principal complicación de la nutrición parenteral prolongada?",
    opciones: [
      "Hipoglucemia",
      "Deficiencia de hierro",
      "Colestasis hepática",
      "Deshidratación",
    ],
    correcta: 2,
    explicacion:
      "La colestasis hepática es una complicación frecuente de la nutrición parenteral prolongada.",
  },
  {
    pregunta:
      "¿Cuál de las siguientes vitaminas proporciona el cofactor para las reacciones de hidroxilación en la síntesis de colágeno?",
    opciones: ["Biotina", "Niacina", "Riboflavina", "Tiamina", "Vitamina C"],
    correcta: 4,
    explicacion:
      "La Vitamina C (ácido ascórbico) es un cofactor esencial para las enzimas prolil hidroxilasa y lisil hidroxilasa. Estas enzimas son cruciales para la síntesis de colágeno porque catalizan las reacciones de hidroxilación de los residuos de prolina y lisina en las cadenas de procolágeno.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const preguntasAleatorias = useMemo(() => shuffleArray(preguntas), []);

  // Estados para login
  const [clave, setClave] = useState("");
  const [autenticado, setAutenticado] = useState(false);
  const [errorClave, setErrorClave] = useState(false);

  // Para que el mensaje de error desaparezca solo
  useEffect(() => {
    if (errorClave) {
      const timeout = setTimeout(() => setErrorClave(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [errorClave]);

  // Estados del cuestionario
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [aciertos, setAciertos] = useState(0);

  // Manejar ingreso de clave
  const handleLogin = () => {
    if (clave === "Damthedevil25") {
      setAutenticado(true);
      setErrorClave(false);
    } else {
      setErrorClave(true);
      setClave("");
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 via-yellow-200 to-green-100 px-4">
        <img
          src={logo}
          alt="Smart Nutrition Logo"
          className="w-40 h-40 mb-6 drop-shadow-lg"
        />
        <h1 className="text-3xl font-extrabold mb-6 text-emerald-700 select-none">
          Acceso al Simulacro CENEVAL Nutrición
        </h1>
        <input
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-3 mb-4 w-72 text-center text-lg focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-400 shadow-md"
          placeholder="Ingrese la clave de acceso"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          autoFocus
        />
        <button
          onClick={handleLogin}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md shadow-md font-semibold transition-colors duration-300"
        >
          Entrar
        </button>
        {errorClave && (
          <p className="mt-3 text-red-600 font-semibold animate-fade-in">
            Clave incorrecta, intenta de nuevo.
          </p>
        )}
      </div>
    );
  }

  // Cuestionario
  const preguntaActual = preguntasAleatorias[indice];
  const finalizar = indice + 1 === preguntasAleatorias.length;

  const verificarRespuesta = (index: number) => {
    setSeleccion(index);
    setMostrarResultado(true);
    if (index === preguntaActual.correcta && seleccion === null) {
      setAciertos((prev) => prev + 1);
    }
  };

  const siguientePregunta = () => {
    setSeleccion(null);
    setMostrarResultado(false);
    setIndice((prev) => prev + 1);
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fef6e4 0%, #fde68a 50%, #a7f3d0 100%)",
      }}
    >
      {/* Fondo decorativo de frutas */}
      <img
        src={fruitBg}
        alt="fruta"
        className="absolute left-0 top-0 w-40 opacity-30 blur-sm select-none pointer-events-none"
      />
      <img
        src={fruitBg}
        alt="fruta"
        className="absolute right-0 bottom-0 w-40 opacity-30 blur-sm select-none pointer-events-none rotate-180"
      />
      {/* Palabras alusivas */}
      <div className="absolute left-1/2 top-10 -translate-x-1/2 text-5xl font-extrabold text-emerald-400 opacity-20 select-none pointer-events-none tracking-widest">
        Salud
      </div>
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 text-5xl font-extrabold text-pink-400 opacity-20 select-none pointer-events-none tracking-widest">
        Nutrición
      </div>
      <div className="p-4 max-w-xl w-full mx-auto relative z-10">
        <div className="flex flex-col items-center mb-4 gap-3">
          <img
            src={logo}
            alt="Smart-Nutrition Logo"
            className="w-40 h-40 mb-2"
          />
          <h1 className="text-4xl font-extrabold font-sans tracking-tight text-black drop-shadow-lg text-center">
            Simulacro <span className="text-black">CENEVAL</span>{" "}
            <span className="text-black">Nutrición</span>
          </h1>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          {finalizar ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-5">¡Simulacro finalizado!</h2>
              <p className="text-lg font-semibold mb-2">
                Tu puntaje: {aciertos} de {preguntasAleatorias.length}
              </p>
              <p className="text-md text-gray-600">
                {((aciertos / preguntasAleatorias.length) * 100).toFixed(1)}% de
                respuestas correctas
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">
                {preguntaActual.pregunta}
              </h2>
              <ul className="space-y-2">
                {preguntaActual.opciones.map((opcion, idx) => (
                  <li
                    key={idx}
                    onClick={() => !mostrarResultado && verificarRespuesta(idx)}
                    className={
                      `cursor-pointer p-2 rounded-md border ` +
                      (mostrarResultado && idx === preguntaActual.correcta
                        ? "bg-green-100 border-green-500"
                        : mostrarResultado && idx === seleccion
                        ? "bg-red-100 border-red-500"
                        : "hover:bg-gray-100")
                    }
                  >
                    {opcion}
                  </li>
                ))}
              </ul>
              {mostrarResultado && (
                <div className="mt-4">
                  <p className="font-semibold">
                    {seleccion === preguntaActual.correcta
                      ? "✅ Correcto"
                      : "❌ Incorrecto"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {preguntaActual.explicacion}
                  </p>
                  {indice + 1 < preguntas.length && (
                    <button
                      onClick={siguientePregunta}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Siguiente
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

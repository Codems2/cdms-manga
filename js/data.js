// Datos del recetario: métodos de extracción y recetas.
// Las recetas están basadas en técnicas ampliamente difundidas; se acredita
// la fuente/autor en cada una. Las cantidades son orientativas: ajusta a tu
// gusto y a tu molino.

export const METHODS = [
  {
    id: 'v60',
    name: 'V60',
    emoji: '🌀',
    tagline: 'Filtrado, taza limpia y aromática',
    description:
      'Goteo manual en cono de cerámica o plástico con filtro de papel. ' +
      'Resalta la acidez y los aromas; ideal para cafés de origen.',
    type: 'Filtrado',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    emoji: '💉',
    tagline: 'Versátil, rápida y a prueba de errores',
    description:
      'Inmersión + presión con un émbolo. Muy tolerante, portátil y fácil de ' +
      'limpiar. Admite recetas estilo espresso suave o tipo filtrado.',
    type: 'Inmersión / Presión',
  },
  {
    id: 'prensa',
    name: 'Prensa francesa',
    emoji: '🫖',
    tagline: 'Cuerpo y textura, sin papel',
    description:
      'Inmersión total con filtro metálico. Cuerpo redondo y boca densa; ' +
      'deja pasar los aceites del café.',
    type: 'Inmersión',
  },
  {
    id: 'chemex',
    name: 'Chemex',
    emoji: '⏳',
    tagline: 'Filtrado extra limpio y delicado',
    description:
      'Jarra de vidrio con filtros gruesos. Produce una taza muy limpia, ' +
      'brillante y ligera. Excelente para preparar varias tazas.',
    type: 'Filtrado',
  },
  {
    id: 'moka',
    name: 'Cafetera italiana',
    emoji: '🇮🇹',
    tagline: 'Café intenso de fogón (moka)',
    description:
      'La clásica moka a presión de vapor. Taza concentrada e intensa, ' +
      'a medio camino entre el espresso y el filtrado.',
    type: 'Presión (vapor)',
  },
  {
    id: 'espresso',
    name: 'Espresso',
    emoji: '☕',
    tagline: 'Concentrado, con crema',
    description:
      'Extracción a presión (≈9 bar) en máquina. Base de cortados, lattes y ' +
      'cappuccinos. Requiere molino fino y constante.',
    type: 'Presión',
  },
  {
    id: 'coldbrew',
    name: 'Cold brew',
    emoji: '🧊',
    tagline: 'Frío, dulce y bajo en acidez',
    description:
      'Extracción en frío por inmersión larga (12–18 h). Suave, dulce y poco ' +
      'ácido; se conserva varios días en nevera.',
    type: 'Inmersión en frío',
  },
];

// Escala de molienda (1 = más fino, 6 = más grueso) con una referencia
// cotidiana y un rango orientativo en micras para hacerse una idea del grosor.
export const GRIND_LEVELS = [
  { level: 1, name: 'Extra fino', ref: 'Harina / azúcar glas', microns: '< 300 µm' },
  { level: 2, name: 'Fino', ref: 'Sal fina / azúcar', microns: '300–400 µm' },
  { level: 3, name: 'Medio-fino', ref: 'Entre sal de mesa y arena', microns: '400–600 µm' },
  { level: 4, name: 'Medio', ref: 'Sal de mesa / arena', microns: '600–800 µm' },
  { level: 5, name: 'Medio-grueso', ref: 'Sal gruesa', microns: '800–1000 µm' },
  { level: 6, name: 'Grueso', ref: 'Migas de pan / pimienta gruesa', microns: '> 1000 µm' },
];

export function getGrindLevel(level) {
  return GRIND_LEVELS.find((g) => g.level === level) || GRIND_LEVELS[3];
}

// helper de paso de receta
const step = (at, title, detail = '') => ({ at, title, detail });

export const RECIPES = [
  /* ---------------- V60 ---------------- */
  {
    id: 'v60-hoffmann',
    methodId: 'v60',
    title: 'V60 definitivo (1 taza)',
    source: 'James Hoffmann',
    coffee: 15,
    water: 250,
    ratio: '1:16,6',
    grind: 'Media-fina (como sal de mesa)',
    grindLevel: 3,
    temp: 95,
    totalTime: 210,
    difficulty: 'Media',
    summary:
      'La receta de referencia para una taza equilibrada y repetible. ' +
      'Enjuaga el filtro con agua caliente antes de empezar.',
    steps: [
      step(0, 'Floración', 'Vierte 50 g de agua y remueve/agita suavemente para mojar todo el café. Deja reposar.'),
      step(45, 'Primer vertido', 'Vierte hasta llegar a 150 g de agua total (centro hacia afuera).'),
      step(70, 'Segundo vertido', 'Vierte hasta 250 g de agua total de forma constante.'),
      step(95, 'Agitar', 'Da un suave remolino a la V60 para nivelar el lecho de café.'),
      step(120, 'Drenado', 'Deja que filtre. Debería terminar alrededor de 3:00–3:30.'),
    ],
    notes: 'Si gotea muy lento, muele un poco más grueso; si es muy rápido, más fino.',
  },
  {
    id: 'v60-46',
    methodId: 'v60',
    title: 'Método 4:6',
    source: 'Tetsu Kasuya (campeón mundial Brewers Cup)',
    coffee: 20,
    water: 300,
    ratio: '1:15',
    grind: 'Media-gruesa',
    grindLevel: 5,
    temp: 92,
    totalTime: 210,
    difficulty: 'Media',
    summary:
      'Cinco vertidos. Los dos primeros (40% del agua) controlan dulzor/acidez; ' +
      'los tres últimos (60%) controlan la intensidad.',
    steps: [
      step(0, 'Vertido 1 (50 g)', 'Más agua aquí = más acidez; menos = más dulzor. Total: 50 g.'),
      step(45, 'Vertido 2 (70 g)', 'Completa el 40%. Total: 120 g.'),
      step(90, 'Vertido 3 (60 g)', 'Empieza el 60% de intensidad. Total: 180 g.'),
      step(130, 'Vertido 4 (60 g)', 'Total: 240 g.'),
      step(160, 'Vertido 5 (60 g)', 'Total: 300 g. Deja drenar.'),
    ],
    notes: 'Menos vertidos en el 60% = taza más intensa; más vertidos = más ligera.',
  },

  /* ---------------- AeroPress ---------------- */
  {
    id: 'aeropress-clasica',
    methodId: 'aeropress',
    title: 'AeroPress clásica',
    source: 'Receta base del fabricante (adaptada)',
    coffee: 16,
    water: 220,
    ratio: '1:13',
    grind: 'Media-fina',
    grindLevel: 3,
    temp: 85,
    totalTime: 90,
    difficulty: 'Fácil',
    summary: 'Posición normal. Rápida y limpia, perfecta para empezar.',
    steps: [
      step(0, 'Añade el café', 'Coloca el filtro enjuagado y vierte 16 g de café molido.'),
      step(10, 'Vierte el agua', 'Añade 220 g de agua a 85 °C. Remueve 3–4 veces.'),
      step(30, 'Reposo', 'Coloca el émbolo y espera.'),
      step(70, 'Presiona', 'Presiona suave y constante durante ~20 s hasta oír el silbido.'),
    ],
    notes: 'Para una taza más suave, diluye el resultado con un poco de agua caliente (estilo americano).',
  },
  {
    id: 'aeropress-invertida',
    methodId: 'aeropress',
    title: 'AeroPress invertida',
    source: 'Técnica popular de competición (adaptada)',
    coffee: 18,
    water: 200,
    ratio: '1:11',
    grind: 'Media',
    grindLevel: 4,
    temp: 88,
    totalTime: 150,
    difficulty: 'Media',
    summary:
      'Montaje al revés para una inmersión completa sin goteo prematuro. ' +
      'Mayor cuerpo y dulzor.',
    steps: [
      step(0, 'Monta invertida', 'Coloca la AeroPress al revés (émbolo abajo) y añade 18 g de café.'),
      step(10, 'Vierte el agua', 'Añade 200 g de agua a 88 °C. Remueve.'),
      step(30, 'Inmersión', 'Tapa con el filtro enroscado y deja reposar.'),
      step(90, 'Voltea', 'Coloca la taza encima y voltea con cuidado el conjunto.'),
      step(110, 'Presiona', 'Presiona lentamente durante ~30 s.'),
    ],
    notes: '¡Cuidado al voltear! Asegúrate de que la tapa esté bien cerrada.',
  },

  /* ---------------- Prensa francesa ---------------- */
  {
    id: 'prensa-hoffmann',
    methodId: 'prensa',
    title: 'Prensa francesa limpia',
    source: 'James Hoffmann',
    coffee: 30,
    water: 500,
    ratio: '1:16,6',
    grind: 'Gruesa',
    grindLevel: 6,
    temp: 95,
    totalTime: 540,
    difficulty: 'Fácil',
    summary:
      'Técnica para reducir sedimentos: se rompe la costra y se retiran los ' +
      'posos antes de prensar.',
    steps: [
      step(0, 'Añade agua', 'Vierte 500 g de agua sobre 30 g de café grueso. No remuevas aún.'),
      step(240, 'Rompe la costra', 'A los 4 min, rompe la capa superior removiendo; retira la espuma y posos flotantes con dos cucharas.'),
      step(300, 'Espera', 'Deja reposar para que los finos se asienten en el fondo.'),
      step(480, 'Prensa suave', 'Baja el émbolo apenas bajo la superficie (no hasta el fondo).'),
      step(520, 'Sirve', 'Vierte lentamente, dejando los posos en el fondo.'),
    ],
    notes: 'Cuanto más esperes antes de servir, más limpia será la taza.',
  },

  /* ---------------- Chemex ---------------- */
  {
    id: 'chemex-clasica',
    methodId: 'chemex',
    title: 'Chemex para compartir',
    source: 'Técnica clásica de filtrado',
    coffee: 42,
    water: 700,
    ratio: '1:16,6',
    grind: 'Media-gruesa',
    grindLevel: 5,
    temp: 94,
    totalTime: 270,
    difficulty: 'Media',
    summary: 'Rinde 2–3 tazas. Usa el filtro grueso de Chemex bien enjuagado.',
    steps: [
      step(0, 'Floración', 'Vierte 90 g de agua y espera a que el café se hinche.'),
      step(45, 'Vertido 1', 'Vierte en espiral hasta 350 g de agua total.'),
      step(105, 'Vertido 2', 'Cuando baje el nivel, vierte hasta 700 g total.'),
      step(180, 'Drenado', 'Deja filtrar. Termina alrededor de 4:00–4:30.'),
      step(255, 'Retira el filtro', 'Quita el papel y agita la jarra antes de servir.'),
    ],
    notes: 'El filtro grueso de Chemex da una taza muy limpia; tarda más en drenar.',
  },

  /* ---------------- Moka ---------------- */
  {
    id: 'moka-clasica',
    methodId: 'moka',
    title: 'Moka clásica (3 tazas)',
    source: 'Técnica tradicional italiana',
    coffee: 17,
    water: 150,
    ratio: '—',
    grind: 'Media-fina (sin apretar)',
    grindLevel: 3,
    temp: 100,
    totalTime: 300,
    difficulty: 'Fácil',
    summary:
      'Truco clave: usa agua ya caliente para no "cocer" el café y retira del ' +
      'fuego en cuanto empiece a gorgotear.',
    steps: [
      step(0, 'Agua caliente', 'Llena la base con agua caliente hasta la válvula de seguridad.'),
      step(20, 'Café', 'Llena el embudo con café molido, sin presionar; nivela con el dedo.'),
      step(40, 'Al fuego', 'Cierra y pon a fuego medio-bajo con la tapa abierta.'),
      step(180, 'Vigila', 'Cuando salga un chorro color miel y empiece el gorgoteo, baja el fuego.'),
      step(240, 'Retira', 'Aparta del fuego antes del gorgoteo fuerte y enfría la base bajo el grifo.'),
    ],
    notes: 'Si sale amargo, baja el fuego y retira antes. Nunca aprietes el café en el embudo.',
  },

  /* ---------------- Espresso ---------------- */
  {
    id: 'espresso-base',
    methodId: 'espresso',
    title: 'Espresso de referencia (doble)',
    source: 'Receta base de dial-in',
    coffee: 18,
    water: 36,
    ratio: '1:2',
    grind: 'Fina (ajustar al tiempo)',
    grindLevel: 2,
    temp: 93,
    totalTime: 30,
    difficulty: 'Alta',
    summary:
      'Punto de partida para "calibrar": 18 g dentro, 36 g fuera, en 25–30 s. ' +
      'Ajusta la molienda según el tiempo de extracción.',
    steps: [
      step(0, 'Dosifica y nivela', 'Muele 18 g, distribuye y nivela en el portafiltro.'),
      step(8, 'Prensa (tamp)', 'Prensa nivelado con presión firme y constante.'),
      step(15, 'Extrae', 'Inicia la extracción: deberían salir ~36 g de café.'),
      step(28, 'Controla el tiempo', 'Objetivo: 25–30 s. Más rápido → muele más fino; más lento → más grueso.'),
    ],
    notes: 'Pesa siempre la salida. Sabor ácido/aguado = submolido; amargo/seco = sobreextraído.',
  },

  /* ---------------- Cold brew ---------------- */
  {
    id: 'coldbrew-inmersion',
    methodId: 'coldbrew',
    title: 'Cold brew por inmersión',
    source: 'Método de inmersión en frío',
    coffee: 100,
    water: 1000,
    ratio: '1:10',
    grind: 'Gruesa',
    grindLevel: 6,
    temp: 20,
    totalTime: 57600,
    difficulty: 'Fácil',
    summary:
      'Se prepara la noche anterior. Resulta un concentrado suave; dilúyelo ' +
      'con agua o leche y sirve con hielo.',
    steps: [
      step(0, 'Mezcla', 'Combina 100 g de café grueso con 1 L de agua a temperatura ambiente. Remueve.'),
      step(60, 'Reposo en frío', 'Tapa y guarda en la nevera 12–18 horas.'),
      step(120, 'Filtra', 'Cuela con filtro de papel o tela para eliminar los posos.'),
      step(180, 'Sirve', 'Diluye al gusto (1:1 con agua) y sirve sobre hielo.'),
    ],
    notes: 'Se conserva hasta 1 semana en nevera. El temporizador aquí es solo simbólico (el reposo son horas).',
  },
];

// Guía de calibración por sabor: cómo diagnosticar la taza y qué ajustar.
export const CALIBRATION = {
  intro:
    'El sabor te dice si te has pasado o quedado corto al extraer. Usa esta ' +
    'guía para corregir tu café: identifica el sabor dominante y aplica el ajuste.',
  rule:
    'Regla de oro: cambia UNA sola variable cada vez y vuelve a probar. Si ' +
    'tocas varias a la vez, no sabrás qué funcionó.',

  // Eje de extracción (subextraído ↔ sobreextraído)
  extraction: [
    {
      id: 'under',
      tone: 'sour',
      title: 'Sabe ácido o agrio',
      taste: ['Ácido/agrio, como limón', 'Salado', 'Final corto y "hueco"', 'Poco dulce'],
      diagnosis: 'Subextraído: el agua extrajo de menos y faltan azúcares y dulzor.',
      fixes: [
        'Muele más FINO (lo primero a probar)',
        'Sube la temperatura del agua 2–3 °C',
        'Alarga el tiempo de contacto',
        'Reparte el agua en más vertidos / remueve un poco más',
      ],
    },
    {
      id: 'over',
      tone: 'bitter',
      title: 'Sabe amargo o seco',
      taste: ['Amargo', 'Seco/astringente (reseca la boca)', 'Áspero', 'Quemado'],
      diagnosis: 'Sobreextraído: el agua extrajo de más y arrastró compuestos amargos.',
      fixes: [
        'Muele más GRUESO (lo primero a probar)',
        'Baja la temperatura del agua 2–3 °C',
        'Acorta el tiempo de extracción',
        'Agita/remueve menos',
      ],
    },
    {
      id: 'balanced',
      tone: 'good',
      title: 'Equilibrado y dulce',
      taste: ['Dulce', 'Acidez agradable', 'Final largo y limpio'],
      diagnosis: '¡Lo lograste! Anota la molienda, dosis y tiempo para repetirlo.',
      fixes: ['Guarda esta configuración', 'Ajusta solo al cambiar de café o de tueste'],
    },
  ],

  // Eje de concentración (fuerza de la taza)
  strength: [
    {
      id: 'weak',
      title: 'Aguado / débil / sin cuerpo',
      diagnosis: 'Concentración baja: poco café para tanta agua.',
      fixes: ['Usa más café (ratio más fuerte, p. ej. 1:15 en vez de 1:17)', 'O reduce el agua'],
    },
    {
      id: 'strong',
      title: 'Demasiado intenso / cargado',
      diagnosis: 'Concentración alta: demasiado café para el agua.',
      fixes: ['Usa menos café (ratio más suave, p. ej. 1:17)', 'O añade un poco de agua caliente al final'],
    },
  ],

  // Referencia rápida sabor → acción
  quick: [
    { taste: 'Ácido / agrio', action: 'Muele más fino · sube Tª · más tiempo' },
    { taste: 'Amargo / seco', action: 'Muele más grueso · baja Tª · menos tiempo' },
    { taste: 'Soso / aguado', action: 'Más café (ratio más fuerte)' },
    { taste: 'Muy cargado', action: 'Más agua o menos café' },
  ],
};

export function recipesForMethod(methodId) {
  return RECIPES.filter((r) => r.methodId === methodId);
}

export function getMethod(id) {
  return METHODS.find((m) => m.id === id);
}

export function getRecipe(id) {
  return RECIPES.find((r) => r.id === id);
}

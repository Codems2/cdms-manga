// Datos del recetario: métodos de extracción y recetas.
// Recetas basadas en técnicas ampliamente difundidas; cantidades orientativas.

export const METHODS = [
  {
    id: 'v60', name: 'V60', icon: 'v60', type: 'Filtrado',
    tagline: 'Taza limpia y aromática',
    description:
      'Goteo manual en cono con filtro de papel. Resalta la acidez y los ' +
      'aromas; ideal para cafés de origen.',
  },
  {
    id: 'aeropress', name: 'AeroPress', icon: 'aeropress', type: 'Inmersión / Presión',
    tagline: 'Versátil y a prueba de errores',
    description:
      'Inmersión + presión con émbolo. Muy tolerante, portátil y fácil de ' +
      'limpiar. Admite estilo espresso suave o tipo filtrado.',
  },
  {
    id: 'prensa', name: 'Prensa francesa', icon: 'press', type: 'Inmersión',
    tagline: 'Cuerpo y textura, sin papel',
    description:
      'Inmersión total con filtro metálico. Cuerpo redondo y boca densa; ' +
      'deja pasar los aceites del café.',
  },
  {
    id: 'chemex', name: 'Chemex', icon: 'chemex', type: 'Filtrado',
    tagline: 'Filtrado extra limpio',
    description:
      'Jarra de vidrio con filtros gruesos. Taza muy limpia, brillante y ' +
      'ligera. Excelente para varias tazas.',
  },
  {
    id: 'moka', name: 'Cafetera italiana', icon: 'moka', type: 'Presión (vapor)',
    tagline: 'Café intenso de fogón',
    description:
      'La clásica moka a presión de vapor. Taza concentrada e intensa, a ' +
      'medio camino entre el espresso y el filtrado.',
  },
  {
    id: 'espresso', name: 'Espresso', icon: 'espresso', type: 'Presión',
    tagline: 'Concentrado, con crema',
    description:
      'Extracción a presión (≈9 bar) en máquina. Base de cortados, lattes y ' +
      'cappuccinos. Requiere molino fino y constante.',
  },
  {
    id: 'coldbrew', name: 'Cold brew', icon: 'coldbrew', type: 'Inmersión en frío',
    tagline: 'Frío, dulce y bajo en acidez',
    description:
      'Extracción en frío por inmersión larga (12–18 h). Suave, dulce y poco ' +
      'ácido; se conserva varios días en nevera.',
  },
  {
    id: 'turco', name: 'Café turco', icon: 'turkish', type: 'Cocción (ibrik)',
    tagline: 'Cocido, con cuerpo y espuma',
    description:
      'Se cuece molienda extra fina en un cezve (ibrik) sin filtrar. Intenso, ' +
      'denso y con posos en el fondo. Tradición turca y de Oriente Medio.',
  },
  {
    id: 'sifon', name: 'Sifón', icon: 'siphon', type: 'Vacío (inmersión)',
    tagline: 'Espectacular y muy limpio',
    description:
      'Cafetera de vacío que combina inmersión y filtrado mediante presión de ' +
      'vapor. Taza limpia, aromática y delicada. Requiere algo de práctica.',
  },
  {
    id: 'kalita', name: 'Kalita Wave', icon: 'kalita', type: 'Filtrado',
    tagline: 'Filtrado uniforme y constante',
    description:
      'Goteador de fondo plano con tres orificios y filtro ondulado. Más ' +
      'tolerante que el V60: flujo estable y resultados muy repetibles.',
  },
  {
    id: 'clever', name: 'Clever Dripper', icon: 'clever', type: 'Inmersión / Filtrado',
    tagline: 'Inmersión y filtrado en uno',
    description:
      'Goteador con válvula: infusiona por inmersión y, al apoyarlo sobre la ' +
      'taza, libera el café filtrado. Fácil, limpio y muy indulgente.',
  },
  {
    id: 'phin', name: 'Phin vietnamita', icon: 'phin', type: 'Goteo lento',
    tagline: 'Café vietnamita intenso',
    description:
      'Filtro metálico individual que gotea lento sobre la taza. Clásico con ' +
      'leche condensada, caliente o helado (cà phê sữa đá).',
  },
  {
    id: 'goteo', name: 'Cafetera de goteo', icon: 'goteo', type: 'Filtrado (eléctrica)',
    tagline: 'Cómoda y para varias tazas',
    description:
      'La cafetera eléctrica de filtro de toda la vida. Cómoda para varias ' +
      'tazas; la clave está en la dosis y usar café recién molido.',
  },
  {
    id: 'percolador', name: 'Percoladora', icon: 'percolador', type: 'Recirculación',
    tagline: 'Café fuerte de camping',
    description:
      'El agua hirviendo recircula a través del café una y otra vez. Café ' +
      'fuerte y con cuerpo, clásico de campamento. Cuidado con sobreextraer.',
  },
];

// Escala de molienda (1 = más fino, 6 = más grueso).
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

// Guía de calibración por sabor.
export const CALIBRATION = {
  intro:
    'El sabor te dice si te has pasado o quedado corto al extraer. Identifica ' +
    'el sabor dominante y aplica el ajuste correspondiente.',
  rule:
    'Regla de oro: cambia UNA sola variable cada vez y vuelve a probar. Si ' +
    'tocas varias a la vez, no sabrás qué funcionó.',
  extraction: [
    {
      id: 'under', tone: 'sour', title: 'Sabe ácido o agrio',
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
      id: 'over', tone: 'bitter', title: 'Sabe amargo o seco',
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
      id: 'balanced', tone: 'good', title: 'Equilibrado y dulce',
      taste: ['Dulce', 'Acidez agradable', 'Final largo y limpio'],
      diagnosis: '¡Lo lograste! Anota la molienda, dosis y tiempo para repetirlo.',
      fixes: ['Guarda esta configuración', 'Ajusta solo al cambiar de café o de tueste'],
    },
  ],
  strength: [
    {
      id: 'weak', title: 'Aguado / débil / sin cuerpo',
      diagnosis: 'Concentración baja: poco café para tanta agua.',
      fixes: ['Usa más café (ratio más fuerte, p. ej. 1:15 en vez de 1:17)', 'O reduce el agua'],
    },
    {
      id: 'strong', title: 'Demasiado intenso / cargado',
      diagnosis: 'Concentración alta: demasiado café para el agua.',
      fixes: ['Usa menos café (ratio más suave, p. ej. 1:17)', 'O añade un poco de agua caliente al final'],
    },
  ],
  quick: [
    { taste: 'Ácido / agrio', action: 'Muele más fino · sube Tª · más tiempo' },
    { taste: 'Amargo / seco', action: 'Muele más grueso · baja Tª · menos tiempo' },
    { taste: 'Soso / aguado', action: 'Más café (ratio más fuerte)' },
    { taste: 'Muy cargado', action: 'Más agua o menos café' },
  ],
};

// helper de paso de receta
const s = (at, title, detail = '') => ({ at, title, detail });

export const RECIPES = [
  /* ===================== V60 ===================== */
  {
    id: 'v60-hoffmann', methodId: 'v60', title: 'V60 definitivo (1 taza)',
    source: 'James Hoffmann', coffee: 15, water: 250, ratio: '1:16,6',
    grind: 'Media-fina (como sal de mesa)', grindLevel: 3, temp: 95,
    totalTime: 210, difficulty: 'Media',
    summary: 'La receta de referencia para una taza equilibrada y repetible. Enjuaga el filtro antes de empezar.',
    steps: [
      s(0, 'Floración', 'Vierte 50 g de agua y agita suavemente para mojar todo el café.'),
      s(45, 'Primer vertido', 'Vierte hasta 150 g de agua total, del centro hacia afuera.'),
      s(70, 'Segundo vertido', 'Vierte hasta 250 g de agua total de forma constante.'),
      s(95, 'Agitar', 'Da un suave remolino a la V60 para nivelar el lecho.'),
      s(120, 'Drenado', 'Deja filtrar. Debería terminar sobre 3:00–3:30.'),
    ],
    notes: 'Si gotea muy lento, muele más grueso; si es muy rápido, más fino.',
  },
  {
    id: 'v60-46', methodId: 'v60', title: 'Método 4:6',
    source: 'Tetsu Kasuya (campeón mundial Brewers Cup)', coffee: 20, water: 300, ratio: '1:15',
    grind: 'Media-gruesa', grindLevel: 5, temp: 92, totalTime: 210, difficulty: 'Media',
    summary: 'Cinco vertidos. Los dos primeros (40%) controlan dulzor/acidez; los tres últimos (60%) controlan la intensidad.',
    steps: [
      s(0, 'Vertido 1 (50 g)', 'Más agua = más acidez; menos = más dulzor. Total: 50 g.'),
      s(45, 'Vertido 2 (70 g)', 'Completa el 40%. Total: 120 g.'),
      s(90, 'Vertido 3 (60 g)', 'Empieza el 60% de intensidad. Total: 180 g.'),
      s(130, 'Vertido 4 (60 g)', 'Total: 240 g.'),
      s(160, 'Vertido 5 (60 g)', 'Total: 300 g. Deja drenar.'),
    ],
    notes: 'Menos vertidos en el 60% = taza más intensa; más vertidos = más ligera.',
  },
  {
    id: 'v60-rao', methodId: 'v60', title: 'Vertido único + remolino',
    source: 'Estilo Scott Rao', coffee: 22, water: 360, ratio: '1:16',
    grind: 'Media-fina', grindLevel: 3, temp: 94, totalTime: 225, difficulty: 'Media',
    summary: 'Floración con agitación y un único vertido continuo. Lecho plano y extracción muy uniforme.',
    steps: [
      s(0, 'Floración', 'Vierte 60 g, remueve para mojar todo el café y agita.'),
      s(45, 'Vertido continuo', 'Vierte sin parar hasta 360 g, en espiral suave.'),
      s(105, 'Remolino final', 'Agita la V60 para aplanar el lecho.'),
      s(120, 'Drenado', 'Deja filtrar hasta ~3:30–4:00.'),
    ],
    notes: 'El remolino al final evita "paredes" de café secas en el filtro.',
  },
  {
    id: 'v60-iced', methodId: 'v60', title: 'V60 helado (Japanese iced)',
    source: 'Técnica japonesa de café helado', coffee: 22, water: 220, ratio: '1:16 (con hielo)',
    grind: 'Media-fina', grindLevel: 3, temp: 94, totalTime: 180, difficulty: 'Media',
    summary: 'Se filtra caliente directamente sobre hielo: aroma intacto y frescura inmediata. Pon ~130 g de hielo en la jarra.',
    steps: [
      s(0, 'Hielo en la jarra', 'Coloca ~130 g de hielo bajo la V60 (cuenta como parte del agua).'),
      s(5, 'Floración', 'Vierte 50 g de agua caliente y espera.'),
      s(45, 'Vertidos', 'Vierte hasta 220 g de agua caliente total en 2–3 tandas.'),
      s(120, 'Enfría y sirve', 'Remueve para fundir el hielo restante y sirve sobre hielo nuevo.'),
    ],
    notes: 'Muele un punto más fino que en caliente para compensar el menor tiempo.',
  },
  {
    id: 'v60-light', methodId: 'v60', title: 'V60 para tueste claro',
    source: 'Ajuste para cafés de tueste claro', coffee: 18, water: 300, ratio: '1:16,6',
    grind: 'Media-fina', grindLevel: 3, temp: 96, totalTime: 210, difficulty: 'Media',
    summary: 'Temperatura alta y varios vertidos para exprimir el dulzor de tuestes claros, que son más difíciles de extraer.',
    steps: [
      s(0, 'Floración generosa', 'Vierte 60 g y agita; espera 45 s.'),
      s(45, 'Vertido 1', 'Hasta 150 g total.'),
      s(80, 'Vertido 2', 'Hasta 230 g total.'),
      s(115, 'Vertido 3', 'Hasta 300 g total y agita.'),
      s(140, 'Drenado', 'Termina sobre 3:30–4:00.'),
    ],
    notes: 'Si sigue ácido, sube aún más la temperatura y muele más fino.',
  },

  /* ===================== AeroPress ===================== */
  {
    id: 'aeropress-clasica', methodId: 'aeropress', title: 'AeroPress clásica',
    source: 'Receta base del fabricante (adaptada)', coffee: 16, water: 220, ratio: '1:13',
    grind: 'Media-fina', grindLevel: 3, temp: 85, totalTime: 90, difficulty: 'Fácil',
    summary: 'Posición normal. Rápida y limpia, perfecta para empezar.',
    steps: [
      s(0, 'Añade el café', 'Filtro enjuagado y 16 g de café molido.'),
      s(10, 'Vierte el agua', 'Añade 220 g a 85 °C y remueve 3–4 veces.'),
      s(30, 'Reposo', 'Coloca el émbolo y espera.'),
      s(70, 'Presiona', 'Presiona suave ~20 s hasta el silbido.'),
    ],
    notes: 'Para una taza más suave, diluye con un poco de agua caliente (estilo americano).',
  },
  {
    id: 'aeropress-invertida', methodId: 'aeropress', title: 'AeroPress invertida',
    source: 'Técnica popular de competición (adaptada)', coffee: 18, water: 200, ratio: '1:11',
    grind: 'Media', grindLevel: 4, temp: 88, totalTime: 150, difficulty: 'Media',
    summary: 'Montaje al revés para una inmersión completa sin goteo prematuro. Más cuerpo y dulzor.',
    steps: [
      s(0, 'Monta invertida', 'AeroPress al revés (émbolo abajo) y 18 g de café.'),
      s(10, 'Vierte el agua', 'Añade 200 g a 88 °C y remueve.'),
      s(30, 'Inmersión', 'Tapa con el filtro enroscado y deja reposar.'),
      s(90, 'Voltea', 'Coloca la taza encima y voltea con cuidado.'),
      s(110, 'Presiona', 'Presiona lentamente ~30 s.'),
    ],
    notes: '¡Cuidado al voltear! Asegúrate de que la tapa esté bien cerrada.',
  },
  {
    id: 'aeropress-campeonato', methodId: 'aeropress', title: 'Estilo campeonato (bypass)',
    source: 'Inspirada en recetas del World AeroPress Championship', coffee: 16, water: 200, ratio: '1:12 (+ bypass)',
    grind: 'Media-fina', grindLevel: 3, temp: 80, totalTime: 150, difficulty: 'Media',
    summary: 'Agua más fría para realzar dulzor, infusión corta y dilución final (bypass) para limpiar la taza.',
    steps: [
      s(0, 'Café y agua', '16 g de café + 100 g de agua a 80 °C. Remueve.'),
      s(20, 'Infusión', 'Espera mientras infusiona.'),
      s(70, 'Presiona', 'Presiona durante ~30 s.'),
      s(110, 'Bypass', 'Añade 100 g de agua caliente al resultado y sirve.'),
    ],
    notes: 'El agua más fría reduce el amargor; ajusta el bypass a tu gusto.',
  },
  {
    id: 'aeropress-fuerte', methodId: 'aeropress', title: 'Concentrado tipo espresso',
    source: 'Receta concentrada', coffee: 18, water: 60, ratio: '1:3,3',
    grind: 'Fina', grindLevel: 2, temp: 90, totalTime: 90, difficulty: 'Media',
    summary: 'Muy concentrado, ideal como base para un americano o con leche. No tiene crema, pero sí mucho cuerpo.',
    steps: [
      s(0, 'Café fino', '18 g de café molido fino.'),
      s(10, 'Agua', 'Añade 60 g a 90 °C y remueve rápido.'),
      s(25, 'Presiona ya', 'Presiona con firmeza durante ~25 s.'),
      s(60, 'Sirve', 'Úsalo solo o alarga con agua/leche caliente.'),
    ],
    notes: 'Si presiona con mucha resistencia, muele un poco más grueso.',
  },
  {
    id: 'aeropress-iced', methodId: 'aeropress', title: 'AeroPress helada',
    source: 'Adaptación para café helado', coffee: 20, water: 120, ratio: '1:6 (+ hielo)',
    grind: 'Media-fina', grindLevel: 3, temp: 90, totalTime: 120, difficulty: 'Fácil',
    summary: 'Concentrado caliente presionado sobre hielo. Refrescante y con aroma intacto.',
    steps: [
      s(0, 'Vaso con hielo', 'Llena un vaso con ~100 g de hielo.'),
      s(10, 'Prepara concentrado', '20 g de café + 120 g de agua a 90 °C. Remueve.'),
      s(40, 'Presiona', 'Presiona directamente sobre el hielo.'),
      s(80, 'Remueve', 'Agita para enfriar y completa con agua o leche fría.'),
    ],
    notes: 'Cuanto más concentrado, menos se "aguará" al fundirse el hielo.',
  },

  /* ===================== Prensa francesa ===================== */
  {
    id: 'prensa-hoffmann', methodId: 'prensa', title: 'Prensa francesa limpia',
    source: 'James Hoffmann', coffee: 30, water: 500, ratio: '1:16,6',
    grind: 'Gruesa', grindLevel: 6, temp: 95, totalTime: 540, difficulty: 'Fácil',
    summary: 'Técnica para reducir sedimentos: se rompe la costra y se retiran los posos antes de prensar.',
    steps: [
      s(0, 'Añade agua', 'Vierte 500 g sobre 30 g de café grueso. No remuevas aún.'),
      s(240, 'Rompe la costra', 'A los 4 min remueve la capa superior y retira la espuma con dos cucharas.'),
      s(300, 'Espera', 'Deja reposar para que los finos se asienten.'),
      s(480, 'Prensa suave', 'Baja el émbolo apenas bajo la superficie.'),
      s(520, 'Sirve', 'Vierte lentamente, dejando los posos en el fondo.'),
    ],
    notes: 'Cuanto más esperes antes de servir, más limpia será la taza.',
  },
  {
    id: 'prensa-clasica', methodId: 'prensa', title: 'Prensa clásica (4 min)',
    source: 'Método tradicional', coffee: 30, water: 500, ratio: '1:16,6',
    grind: 'Gruesa', grindLevel: 6, temp: 95, totalTime: 240, difficulty: 'Fácil',
    summary: 'La forma de toda la vida: infusión de 4 minutos y a prensar. Sencilla y fiable.',
    steps: [
      s(0, 'Añade agua', 'Vierte 500 g sobre 30 g de café y remueve.'),
      s(30, 'Tapa', 'Coloca la tapa con el émbolo arriba.'),
      s(240, 'Prensa', 'Baja el émbolo lenta y firmemente.'),
      s(250, 'Sirve', 'Sirve enseguida para evitar sobreextracción.'),
    ],
    notes: 'No dejes el café reposando sobre los posos tras prensar: pásalo a otra jarra.',
  },
  {
    id: 'prensa-individual', methodId: 'prensa', title: 'Prensa individual',
    source: 'Versión para una taza', coffee: 15, water: 250, ratio: '1:16,6',
    grind: 'Gruesa', grindLevel: 6, temp: 95, totalTime: 240, difficulty: 'Fácil',
    summary: 'Una taza generosa con la misma técnica limpia, a escala reducida.',
    steps: [
      s(0, 'Añade agua', '250 g sobre 15 g de café grueso.'),
      s(240, 'Rompe y limpia', 'Remueve la costra y retira la espuma.'),
      s(300, 'Prensa suave', 'Baja el émbolo apenas bajo la superficie y sirve.'),
    ],
    notes: 'Ideal para cafetera pequeña de 0,35 L.',
  },
  {
    id: 'prensa-cuerpo', methodId: 'prensa', title: 'Prensa con más cuerpo',
    source: 'Ratio más fuerte', coffee: 36, water: 500, ratio: '1:14',
    grind: 'Gruesa', grindLevel: 6, temp: 96, totalTime: 270, difficulty: 'Fácil',
    summary: 'Más café para una taza densa e intensa, perfecta para tuestes oscuros o con leche.',
    steps: [
      s(0, 'Añade agua', '500 g sobre 36 g de café.'),
      s(240, 'Rompe la costra', 'Remueve y retira la espuma.'),
      s(300, 'Espera', 'Deja asentar los finos.'),
      s(420, 'Prensa', 'Baja el émbolo suave y sirve.'),
    ],
    notes: 'Si resulta amargo, vuelve al ratio 1:16 o muele más grueso.',
  },

  /* ===================== Chemex ===================== */
  {
    id: 'chemex-clasica', methodId: 'chemex', title: 'Chemex para compartir',
    source: 'Técnica clásica de filtrado', coffee: 42, water: 700, ratio: '1:16,6',
    grind: 'Media-gruesa', grindLevel: 5, temp: 94, totalTime: 270, difficulty: 'Media',
    summary: 'Rinde 2–3 tazas. Usa el filtro grueso de Chemex bien enjuagado.',
    steps: [
      s(0, 'Floración', 'Vierte 90 g de agua y espera a que el café se hinche.'),
      s(45, 'Vertido 1', 'En espiral hasta 350 g de agua total.'),
      s(105, 'Vertido 2', 'Cuando baje el nivel, hasta 700 g total.'),
      s(180, 'Drenado', 'Deja filtrar. Termina sobre 4:00–4:30.'),
      s(255, 'Retira el filtro', 'Quita el papel y agita la jarra antes de servir.'),
    ],
    notes: 'El filtro grueso da una taza muy limpia; tarda más en drenar.',
  },
  {
    id: 'chemex-single', methodId: 'chemex', title: 'Chemex individual',
    source: 'Versión 1–2 tazas', coffee: 22, water: 360, ratio: '1:16,4',
    grind: 'Media-gruesa', grindLevel: 5, temp: 94, totalTime: 240, difficulty: 'Media',
    summary: 'La taza limpia y brillante de Chemex, a escala de una o dos personas.',
    steps: [
      s(0, 'Floración', 'Vierte 50 g y espera 45 s.'),
      s(45, 'Vertido 1', 'Hasta 200 g total.'),
      s(100, 'Vertido 2', 'Hasta 360 g total.'),
      s(160, 'Drenado', 'Termina sobre 3:30–4:00 y retira el filtro.'),
    ],
    notes: 'Vierte siempre en espiral, evitando mojar las paredes del papel.',
  },

  /* ===================== Moka ===================== */
  {
    id: 'moka-clasica', methodId: 'moka', title: 'Moka clásica (3 tazas)',
    source: 'Técnica tradicional italiana', coffee: 17, water: 150, ratio: '—',
    grind: 'Media-fina (sin apretar)', grindLevel: 3, temp: 100, totalTime: 300, difficulty: 'Fácil',
    summary: 'Truco clave: usa agua ya caliente y retira del fuego en cuanto empiece a gorgotear.',
    steps: [
      s(0, 'Agua caliente', 'Llena la base con agua caliente hasta la válvula.'),
      s(20, 'Café', 'Llena el embudo sin presionar; nivela con el dedo.'),
      s(40, 'Al fuego', 'Cierra y pon a fuego medio-bajo con la tapa abierta.'),
      s(180, 'Vigila', 'Al salir un chorro color miel y empezar el gorgoteo, baja el fuego.'),
      s(240, 'Retira', 'Aparta antes del gorgoteo fuerte y enfría la base bajo el grifo.'),
    ],
    notes: 'Si sale amargo, baja el fuego y retira antes. Nunca aprietes el café.',
  },
  {
    id: 'moka-individual', methodId: 'moka', title: 'Moka individual (1 taza)',
    source: 'Versión para moka pequeña', coffee: 7, water: 60, ratio: '—',
    grind: 'Media-fina', grindLevel: 3, temp: 100, totalTime: 240, difficulty: 'Fácil',
    summary: 'Para la cafetera de 1 taza. Misma técnica, control de fuego aún más importante.',
    steps: [
      s(0, 'Agua caliente', 'Base con agua caliente hasta la válvula.'),
      s(15, 'Café', 'Llena el embudo sin presionar.'),
      s(30, 'Al fuego', 'Fuego bajo con la tapa abierta.'),
      s(150, 'Retira', 'Aparta al primer gorgoteo y enfría la base.'),
    ],
    notes: 'Las mokas pequeñas se sobrecalientan rápido: fuego siempre bajo.',
  },
  {
    id: 'moka-cortado', methodId: 'moka', title: 'Cortado con moka',
    source: 'Café con leche estilo casero', coffee: 17, water: 150, ratio: '— (+ leche)',
    grind: 'Media-fina', grindLevel: 3, temp: 100, totalTime: 360, difficulty: 'Fácil',
    summary: 'La intensidad de la moka suavizada con leche caliente. Un clásico de desayuno.',
    steps: [
      s(0, 'Prepara la moka', 'Sigue la receta clásica de moka.'),
      s(240, 'Calienta la leche', 'Calienta ~120 g de leche sin que hierva; espúmala si puedes.'),
      s(300, 'Combina', 'Vierte la leche sobre el café al gusto y sirve.'),
    ],
    notes: 'Para más espuma, agita la leche caliente en un frasco cerrado.',
  },

  /* ===================== Espresso ===================== */
  {
    id: 'espresso-base', methodId: 'espresso', title: 'Espresso de referencia (doble)',
    source: 'Receta base de dial-in', coffee: 18, water: 36, ratio: '1:2',
    grind: 'Fina (ajustar al tiempo)', grindLevel: 2, temp: 93, totalTime: 30, difficulty: 'Alta',
    summary: 'Punto de partida para calibrar: 18 g dentro, 36 g fuera, en 25–30 s.',
    steps: [
      s(0, 'Dosifica y nivela', 'Muele 18 g, distribuye y nivela en el portafiltro.'),
      s(8, 'Prensa (tamp)', 'Prensa nivelado con presión firme y constante.'),
      s(15, 'Extrae', 'Inicia la extracción: deberían salir ~36 g.'),
      s(28, 'Controla el tiempo', 'Objetivo 25–30 s. Más rápido → muele más fino; más lento → más grueso.'),
    ],
    notes: 'Pesa siempre la salida. Ácido/aguado = submolido; amargo/seco = sobreextraído.',
  },
  {
    id: 'espresso-ristretto', methodId: 'espresso', title: 'Ristretto',
    source: 'Espresso restringido', coffee: 18, water: 27, ratio: '1:1,5',
    grind: 'Fina', grindLevel: 2, temp: 92, totalTime: 28, difficulty: 'Alta',
    summary: 'Extracción más corta: más dulce, denso y con menos amargor que un espresso normal.',
    steps: [
      s(0, 'Prepara', 'Misma dosis (18 g), molienda ligeramente más fina.'),
      s(8, 'Prensa', 'Tamp nivelado.'),
      s(15, 'Extrae corto', 'Corta a ~27 g de salida (1:1,5).'),
      s(26, 'Verifica', 'Objetivo 25–30 s; si va muy rápido, afina la molienda.'),
    ],
    notes: 'Resalta el cuerpo y el dulzor; ideal para tuestes medios y oscuros.',
  },
  {
    id: 'espresso-lungo', methodId: 'espresso', title: 'Lungo',
    source: 'Espresso largo', coffee: 18, water: 54, ratio: '1:3',
    grind: 'Media-fina', grindLevel: 3, temp: 92, totalTime: 40, difficulty: 'Alta',
    summary: 'Más agua a través del café: taza más larga, ligera y aromática (cuidado con el amargor).',
    steps: [
      s(0, 'Prepara', 'Dosis 18 g, molienda un punto más gruesa que el espresso.'),
      s(8, 'Prensa', 'Tamp nivelado.'),
      s(15, 'Extrae largo', 'Lleva la salida hasta ~54 g.'),
      s(38, 'Verifica', 'Si amarga, muele más grueso o baja la temperatura.'),
    ],
    notes: 'No confundir con americano: el lungo pasa más agua por el café.',
  },
  {
    id: 'espresso-americano', methodId: 'espresso', title: 'Americano',
    source: 'Espresso + agua caliente', coffee: 18, water: 36, ratio: '1:2 (+ agua)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Media',
    summary: 'Un espresso doble alargado con agua caliente: cuerpo de espresso, formato de café largo.',
    steps: [
      s(0, 'Espresso doble', 'Extrae un espresso de 36 g como referencia.'),
      s(30, 'Añade agua', 'Agrega 120–180 g de agua caliente al gusto.'),
      s(50, 'Sirve', 'Para conservar la crema, añade el espresso sobre el agua.'),
    ],
    notes: 'Ajusta la cantidad de agua según lo fuerte que lo quieras.',
  },
  {
    id: 'espresso-cappuccino', methodId: 'espresso', title: 'Cappuccino',
    source: 'Espresso + leche texturizada', coffee: 18, water: 36, ratio: '1:2 (+ leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 90, difficulty: 'Alta',
    summary: 'Espresso doble con leche vaporizada y una capa de espuma cremosa (~150 ml de leche).',
    steps: [
      s(0, 'Espresso doble', 'Extrae 36 g de espresso en una taza.'),
      s(30, 'Vaporiza la leche', 'Textura ~150 g de leche creando microespuma sedosa.'),
      s(70, 'Vierte', 'Integra la leche y deja una capa de espuma de ~1 cm.'),
    ],
    notes: 'Sin vaporizador: calienta la leche y agítala en un frasco para crear espuma.',
  },
  {
    id: 'espresso-latte', methodId: 'espresso', title: 'Café latte',
    source: 'Espresso + mucha leche', coffee: 18, water: 36, ratio: '1:2 (+ leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 90, difficulty: 'Alta',
    summary: 'Más leche que el cappuccino y menos espuma: suave y cremoso (~220 ml de leche).',
    steps: [
      s(0, 'Espresso doble', 'Extrae 36 g de espresso.'),
      s(30, 'Vaporiza la leche', 'Textura ~220 g de leche con poca espuma.'),
      s(70, 'Vierte', 'Vierte integrando bien; remata con una fina capa de espuma.'),
    ],
    notes: 'La temperatura ideal de la leche ronda los 60–65 °C (no debe quemar).',
  },

  /* ===================== Cold brew ===================== */
  {
    id: 'coldbrew-inmersion', methodId: 'coldbrew', title: 'Cold brew por inmersión',
    source: 'Método de inmersión en frío', coffee: 100, water: 1000, ratio: '1:10',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 57600, difficulty: 'Fácil',
    summary: 'Se prepara la noche anterior. Concentrado suave; dilúyelo con agua o leche y sirve con hielo.',
    steps: [
      s(0, 'Mezcla', '100 g de café grueso con 1 L de agua a temperatura ambiente. Remueve.'),
      s(60, 'Reposo en frío', 'Tapa y guarda en la nevera 12–18 horas.'),
      s(120, 'Filtra', 'Cuela con filtro de papel o tela.'),
      s(180, 'Sirve', 'Diluye al gusto (1:1 con agua) y sirve sobre hielo.'),
    ],
    notes: 'Se conserva hasta 1 semana en nevera. El temporizador aquí es simbólico (el reposo son horas).',
  },
  {
    id: 'coldbrew-concentrado', methodId: 'coldbrew', title: 'Concentrado fuerte (1:5)',
    source: 'Concentrado para diluir', coffee: 200, water: 1000, ratio: '1:5',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 57600, difficulty: 'Fácil',
    summary: 'Un concentrado potente que rinde más raciones: se diluye al servir (1:1 o 1:2).',
    steps: [
      s(0, 'Mezcla', '200 g de café grueso con 1 L de agua. Remueve bien.'),
      s(60, 'Reposo', 'Nevera 14–18 horas.'),
      s(120, 'Filtra', 'Cuela dos veces para máxima limpieza.'),
      s(180, 'Diluye', 'Mezcla 1 parte de concentrado con 1–2 de agua o leche.'),
    ],
    notes: 'Ocupa menos espacio en la nevera y dura más que el cold brew listo para beber.',
  },
  {
    id: 'coldbrew-suave', methodId: 'coldbrew', title: 'Cold brew suave (1:12)',
    source: 'Versión más ligera', coffee: 80, water: 1000, ratio: '1:12',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 50400, difficulty: 'Fácil',
    summary: 'Listo para beber sin diluir: más ligero y refrescante, perfecto para el día a día.',
    steps: [
      s(0, 'Mezcla', '80 g de café grueso con 1 L de agua.'),
      s(60, 'Reposo', 'Nevera 12–14 horas.'),
      s(120, 'Filtra y sirve', 'Cuela y sirve directamente sobre hielo.'),
    ],
    notes: 'Menos tiempo de reposo = taza más ligera; ajústalo a tu gusto.',
  },

  /* ===================== Café turco ===================== */
  {
    id: 'turco-clasico', methodId: 'turco', title: 'Café turco clásico',
    source: 'Tradición turca (cezve/ibrik)', coffee: 7, water: 70, ratio: '1:10',
    grind: 'Extra fina (como harina)', grindLevel: 1, temp: 90, totalTime: 240, difficulty: 'Media',
    summary: 'Café molido finísimo cocido lentamente. Denso, aromático y con espuma; no se filtra.',
    steps: [
      s(0, 'Mezcla en frío', 'En el cezve: 70 g de agua fría, 7 g de café extra fino y azúcar al gusto. Remueve.'),
      s(20, 'Fuego muy bajo', 'Calienta sin remover. Tarda un par de minutos.'),
      s(150, 'Forma la espuma', 'Cuando suba la espuma (sin hervir), retira del fuego.'),
      s(180, 'Reparte espuma', 'Vierte un poco de espuma en cada taza, vuelve al fuego un instante y termina de servir.'),
    ],
    notes: 'Nunca dejes que hierva a borbotones: arruina la espuma y el sabor. Espera a que asienten los posos antes de beber.',
  },
  {
    id: 'turco-doble', methodId: 'turco', title: 'Turco doble (2 tazas)',
    source: 'Tradición turca', coffee: 14, water: 140, ratio: '1:10',
    grind: 'Extra fina', grindLevel: 1, temp: 90, totalTime: 270, difficulty: 'Media',
    summary: 'La misma técnica para dos tazas. Reparte la espuma entre ambas para una presentación perfecta.',
    steps: [
      s(0, 'Mezcla en frío', '140 g de agua fría + 14 g de café extra fino (+ azúcar opcional).'),
      s(20, 'Fuego bajo', 'Calienta despacio sin remover.'),
      s(170, 'Espuma', 'Al subir la espuma, retira antes de hervir.'),
      s(210, 'Sirve', 'Reparte la espuma y termina de servir con cuidado.'),
    ],
    notes: 'Usa un cezve con capacidad de sobra: la espuma necesita espacio para subir.',
  },

  /* ===================== Sifón ===================== */
  {
    id: 'sifon-clasico', methodId: 'sifon', title: 'Sifón clásico',
    source: 'Técnica de cafetera de vacío', coffee: 20, water: 300, ratio: '1:15',
    grind: 'Media', grindLevel: 4, temp: 92, totalTime: 240, difficulty: 'Alta',
    summary: 'El agua sube al bulbo superior por presión de vapor, infusiona y baja filtrada al enfriar. Espectáculo y taza limpia.',
    steps: [
      s(0, 'Agua caliente abajo', 'Pon 300 g de agua caliente en el bulbo inferior y enciende la fuente de calor.'),
      s(60, 'Sube el agua', 'Cuando el agua suba al bulbo superior, añade los 20 g de café.'),
      s(75, 'Remueve e infusiona', 'Remueve para mojar todo y deja infusionar ~60 s.'),
      s(150, 'Retira el calor', 'Apaga el fuego: el café bajará filtrado al bulbo inferior.'),
      s(210, 'Sirve', 'Cuando termine de bajar, sirve enseguida.'),
    ],
    notes: 'Controla el tiempo total de contacto (~1:30–2:00). Más tiempo amarga.',
  },
  {
    id: 'sifon-suave', methodId: 'sifon', title: 'Sifón delicado',
    source: 'Ajuste para cafés florales', coffee: 18, water: 300, ratio: '1:16,6',
    grind: 'Media', grindLevel: 4, temp: 90, totalTime: 220, difficulty: 'Alta',
    summary: 'Menos café e infusión más corta para realzar aromas florales y delicados.',
    steps: [
      s(0, 'Agua caliente', '300 g de agua caliente en el bulbo inferior.'),
      s(60, 'Café', 'Al subir el agua, añade 18 g de café y remueve suave.'),
      s(75, 'Infusión corta', 'Infusiona solo ~45 s.'),
      s(135, 'Retira el calor', 'Apaga y deja que baje filtrado.'),
      s(195, 'Sirve', 'Sirve en cuanto termine.'),
    ],
    notes: 'Remueve con delicadeza: una agitación excesiva sobreextrae rápido en el sifón.',
  },

  /* ===================== V60 (más) ===================== */
  {
    id: 'v60-doble', methodId: 'v60', title: 'V60 doble (2 tazas)',
    source: 'Escalado de la receta de referencia', coffee: 30, water: 500, ratio: '1:16,6',
    grind: 'Media-fina', grindLevel: 3, temp: 95, totalTime: 240, difficulty: 'Media',
    summary: 'La misma técnica equilibrada para dos tazas. Usa un V60 del 02 y vierte sin prisa.',
    steps: [
      s(0, 'Floración', 'Vierte 60 g y agita para mojar todo el café.'),
      s(45, 'Vertido 1', 'Hasta 300 g de agua total.'),
      s(80, 'Vertido 2', 'Hasta 500 g total.'),
      s(110, 'Agita', 'Remolino suave para nivelar el lecho.'),
      s(135, 'Drenado', 'Termina sobre 3:30–4:00.'),
    ],
    notes: 'Con más volumen el drenado tarda algo más; ajusta la molienda si hace falta.',
  },
  {
    id: 'v60-fuerte', methodId: 'v60', title: 'V60 con más fuerza',
    source: 'Ratio más cargado', coffee: 18, water: 250, ratio: '1:14',
    grind: 'Media-fina', grindLevel: 3, temp: 94, totalTime: 210, difficulty: 'Media',
    summary: 'Más café para una taza con más cuerpo e intensidad, sin perder claridad.',
    steps: [
      s(0, 'Floración', 'Vierte 45 g y agita.'),
      s(45, 'Vertido 1', 'Hasta 150 g total.'),
      s(75, 'Vertido 2', 'Hasta 250 g total y agita.'),
      s(105, 'Drenado', 'Termina sobre 3:00–3:30.'),
    ],
    notes: 'Si amarga, muele un punto más grueso o baja la temperatura.',
  },
  {
    id: 'v60-suave', methodId: 'v60', title: 'V60 suave para el día a día',
    source: 'Ratio ligero', coffee: 15, water: 270, ratio: '1:18',
    grind: 'Media', grindLevel: 4, temp: 92, totalTime: 200, difficulty: 'Fácil',
    summary: 'Taza ligera y fácil de beber, ideal para tuestes medios y para beber en cantidad.',
    steps: [
      s(0, 'Floración', 'Vierte 45 g y espera.'),
      s(45, 'Vertido único', 'Vierte hasta 270 g de forma continua.'),
      s(100, 'Drenado', 'Deja filtrar hasta ~3:00.'),
    ],
    notes: 'Molienda algo más gruesa para que no se sobreextraiga al ser tan diluido.',
  },

  /* ===================== AeroPress (más) ===================== */
  {
    id: 'aeropress-suave', methodId: 'aeropress', title: 'AeroPress tipo filtrado',
    source: 'Estilo filtrado largo', coffee: 14, water: 230, ratio: '1:16',
    grind: 'Media', grindLevel: 4, temp: 82, totalTime: 120, difficulty: 'Fácil',
    summary: 'Más diluida y delicada, parecida a un filtrado. Agua templada y presión muy suave.',
    steps: [
      s(0, 'Café y agua', '14 g de café + 230 g de agua a 82 °C.'),
      s(15, 'Remueve', 'Da unas vueltas y coloca el émbolo.'),
      s(75, 'Presiona lento', 'Presiona muy suave durante ~40 s.'),
    ],
    notes: 'La presión suave evita el amargor en una receta tan diluida.',
  },
  {
    id: 'aeropress-doble', methodId: 'aeropress', title: 'AeroPress doble (2 tazas)',
    source: 'Versión para compartir', coffee: 28, water: 420, ratio: '1:15',
    grind: 'Media-fina', grindLevel: 3, temp: 88, totalTime: 180, difficulty: 'Media',
    summary: 'Concentrado en la AeroPress y dilución final para llenar dos tazas.',
    steps: [
      s(0, 'Café y agua', '28 g de café + 200 g de agua a 88 °C. Remueve.'),
      s(30, 'Infusión', 'Espera mientras infusiona.'),
      s(90, 'Presiona', 'Presiona durante ~30 s.'),
      s(130, 'Diluye', 'Añade 220 g de agua caliente y reparte en dos tazas.'),
    ],
    notes: 'Hazlo en posición invertida para evitar el goteo durante la infusión.',
  },
  {
    id: 'aeropress-overnight', methodId: 'aeropress', title: 'AeroPress fría de un día para otro',
    source: 'Cold brew exprés en AeroPress', coffee: 18, water: 220, ratio: '1:12',
    grind: 'Media', grindLevel: 4, temp: 20, totalTime: 28800, difficulty: 'Fácil',
    summary: 'Inmersión en frío toda la noche y prensado por la mañana: suave, dulce y sin acidez.',
    steps: [
      s(0, 'Monta invertida', 'AeroPress invertida con 18 g de café y 220 g de agua fría.'),
      s(30, 'A la nevera', 'Tapa con el filtro y deja en la nevera 8 h.'),
      s(120, 'Voltea y presiona', 'Voltea sobre el vaso y presiona suave.'),
    ],
    notes: 'Sirve sobre hielo. El temporizador aquí es simbólico (el reposo son horas).',
  },

  /* ===================== Prensa francesa (más) ===================== */
  {
    id: 'prensa-coldbrew', methodId: 'prensa', title: 'Cold brew en prensa francesa',
    source: 'Inmersión en frío', coffee: 60, water: 600, ratio: '1:10',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 43200, difficulty: 'Fácil',
    summary: 'La prensa es perfecta para cold brew: infusiona en frío y filtra con el émbolo.',
    steps: [
      s(0, 'Mezcla', '60 g de café grueso + 600 g de agua fría. Remueve.'),
      s(60, 'Reposo', 'Tapa (sin prensar) y deja en la nevera 12 h.'),
      s(120, 'Prensa', 'Baja el émbolo y sirve sobre hielo.'),
    ],
    notes: 'Pasa el café a otro recipiente tras prensar para que no siga extrayendo.',
  },
  {
    id: 'prensa-batch', methodId: 'prensa', title: 'Prensa grande (1 litro)',
    source: 'Para grupo', coffee: 60, water: 1000, ratio: '1:16,6',
    grind: 'Gruesa', grindLevel: 6, temp: 95, totalTime: 270, difficulty: 'Fácil',
    summary: 'Cafetera de 1 L para varias personas con la técnica limpia de romper y retirar la costra.',
    steps: [
      s(0, 'Añade agua', '1000 g de agua sobre 60 g de café.'),
      s(240, 'Rompe la costra', 'Remueve y retira la espuma.'),
      s(330, 'Espera', 'Deja asentar los finos.'),
      s(450, 'Prensa y sirve', 'Baja el émbolo suave y sirve.'),
    ],
    notes: 'Ideal para desayunos en grupo; sirve en cuanto esté para no sobreextraer.',
  },

  /* ===================== Chemex (más) ===================== */
  {
    id: 'chemex-batch', methodId: 'chemex', title: 'Chemex grande (6 tazas)',
    source: 'Para grupo', coffee: 60, water: 1000, ratio: '1:16,6',
    grind: 'Media-gruesa', grindLevel: 5, temp: 94, totalTime: 360, difficulty: 'Media',
    summary: 'La Chemex de 8 tazas a su máxima capacidad. Vierte por tandas y ten paciencia.',
    steps: [
      s(0, 'Floración', 'Vierte 120 g y espera 45 s.'),
      s(45, 'Vertido 1', 'Hasta 500 g total.'),
      s(150, 'Vertido 2', 'Hasta 1000 g total, manteniendo el nivel.'),
      s(280, 'Drenado', 'Termina sobre 5:30–6:00 y retira el filtro.'),
    ],
    notes: 'El filtro grueso drena lento con este volumen; no muelas demasiado fino.',
  },
  {
    id: 'chemex-iced', methodId: 'chemex', title: 'Chemex helada',
    source: 'Filtrado sobre hielo', coffee: 30, water: 300, ratio: '1:15 (con hielo)',
    grind: 'Media', grindLevel: 4, temp: 94, totalTime: 240, difficulty: 'Media',
    summary: 'Filtra caliente sobre hielo dentro de la propia jarra: limpia y muy refrescante.',
    steps: [
      s(0, 'Hielo en la jarra', 'Pon ~150 g de hielo en la Chemex.'),
      s(5, 'Floración', 'Vierte 60 g de agua caliente.'),
      s(45, 'Vertidos', 'Vierte hasta 300 g de agua caliente total.'),
      s(150, 'Remueve y sirve', 'Agita para fundir el hielo y sirve sobre hielo nuevo.'),
    ],
    notes: 'Muele un punto más fino que en caliente para compensar la dilución.',
  },

  /* ===================== Moka (más) ===================== */
  {
    id: 'moka-grande', methodId: 'moka', title: 'Moka grande (6 tazas)',
    source: 'Cafetera de 6 tazas', coffee: 30, water: 300, ratio: '—',
    grind: 'Media-fina', grindLevel: 3, temp: 100, totalTime: 360, difficulty: 'Fácil',
    summary: 'Para la moka de 6 tazas. Misma técnica: agua caliente y retirar a tiempo.',
    steps: [
      s(0, 'Agua caliente', 'Base con agua caliente hasta la válvula.'),
      s(25, 'Café', 'Llena el embudo sin presionar.'),
      s(45, 'Al fuego', 'Fuego medio-bajo con la tapa abierta.'),
      s(240, 'Vigila', 'Al empezar el gorgoteo, baja el fuego.'),
      s(300, 'Retira', 'Aparta y enfría la base bajo el grifo.'),
    ],
    notes: 'A más volumen, fuego algo más alto al principio; bájalo al salir el café.',
  },
  {
    id: 'moka-bombon', methodId: 'moka', title: 'Café bombón con moka',
    source: 'Especialidad española', coffee: 17, water: 150, ratio: '— (+ leche condensada)',
    grind: 'Media-fina', grindLevel: 3, temp: 100, totalTime: 330, difficulty: 'Fácil',
    summary: 'Café intenso sobre una capa de leche condensada, en vaso transparente para ver las dos capas.',
    steps: [
      s(0, 'Leche condensada', 'Pon 2–3 cucharadas de leche condensada en un vaso de cristal.'),
      s(30, 'Prepara la moka', 'Haz el café siguiendo la receta clásica.'),
      s(300, 'Vierte despacio', 'Añade el café lentamente para crear dos capas. Remueve antes de beber.'),
    ],
    notes: 'Un vaso pequeño realza el efecto visual de las dos capas.',
  },
  {
    id: 'moka-iced', methodId: 'moka', title: 'Moka helada',
    source: 'Café de fogón sobre hielo', coffee: 17, water: 150, ratio: '— (+ hielo)',
    grind: 'Media-fina', grindLevel: 3, temp: 100, totalTime: 360, difficulty: 'Fácil',
    summary: 'El cuerpo de la moka enfriado de golpe sobre hielo. Endúlzalo en caliente si quieres.',
    steps: [
      s(0, 'Prepara la moka', 'Haz el café clásico (añade azúcar en caliente si te gusta).'),
      s(300, 'Vaso con hielo', 'Llena un vaso con hielo abundante.'),
      s(330, 'Vierte y remueve', 'Vierte el café sobre el hielo y remueve. Completa con leche fría si quieres.'),
    ],
    notes: 'Enfriar rápido conserva mejor el aroma que dejarlo entibiar.',
  },

  /* ===================== Espresso (más) ===================== */
  {
    id: 'espresso-cortado', methodId: 'espresso', title: 'Cortado',
    source: 'Espresso + un toque de leche', coffee: 18, water: 36, ratio: '1:2 (+ leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Media',
    summary: 'Espresso "cortado" con una pequeña cantidad de leche caliente (~30–60 ml). Intenso pero suavizado.',
    steps: [
      s(0, 'Espresso doble', 'Extrae 36 g de espresso en un vaso pequeño.'),
      s(30, 'Leche', 'Añade 30–60 g de leche caliente con poca espuma.'),
      s(50, 'Sirve', 'La proporción aprox. es 1:1 entre café y leche.'),
    ],
    notes: 'Más leche que un macchiato pero mucha menos que un cortado catalán o un latte.',
  },
  {
    id: 'espresso-flatwhite', methodId: 'espresso', title: 'Flat white',
    source: 'Estilo antípoda', coffee: 18, water: 27, ratio: '1:1,5 (+ leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 90, difficulty: 'Alta',
    summary: 'Base de ristretto doble y leche con microespuma muy fina (~120 ml). Cremoso e intenso.',
    steps: [
      s(0, 'Ristretto doble', 'Extrae ~27 g de espresso (corto e intenso).'),
      s(30, 'Microespuma', 'Textura ~120 g de leche con espuma muy fina y sedosa.'),
      s(70, 'Vierte', 'Integra la leche dejando apenas 0,5 cm de espuma.'),
    ],
    notes: 'La clave es la microespuma fina, no una capa gruesa como el cappuccino.',
  },
  {
    id: 'espresso-macchiato', methodId: 'espresso', title: 'Espresso macchiato',
    source: 'Espresso "manchado"', coffee: 18, water: 36, ratio: '1:2 (+ espuma)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Media',
    summary: 'Un espresso con solo una cucharada de espuma de leche encima. Casi todo café.',
    steps: [
      s(0, 'Espresso doble', 'Extrae 36 g de espresso.'),
      s(30, 'Mancha de espuma', 'Añade 1–2 cucharadas de microespuma de leche.'),
    ],
    notes: 'No confundir con el latte macchiato, que es prácticamente lo contrario.',
  },
  {
    id: 'espresso-lattemacchiato', methodId: 'espresso', title: 'Latte macchiato',
    source: 'Leche "manchada" de café', coffee: 18, water: 36, ratio: '1:2 (+ mucha leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 90, difficulty: 'Alta',
    summary: 'Vaso de leche texturizada (~220 ml) "manchado" vertiendo el espresso por encima. Bonitas capas.',
    steps: [
      s(0, 'Leche en el vaso', 'Vierte ~220 g de leche texturizada en un vaso alto.'),
      s(40, 'Espresso encima', 'Extrae 36 g de espresso y viértelo despacio sobre la leche.'),
      s(70, 'Capas', 'El café se asienta en una capa intermedia. Sirve sin remover.'),
    ],
    notes: 'Al revés que el cappuccino: aquí la leche es la base y el café se añade después.',
  },
  {
    id: 'espresso-mocha', methodId: 'espresso', title: 'Mocha (café con chocolate)',
    source: 'Espresso + chocolate + leche', coffee: 18, water: 36, ratio: '1:2 (+ choco y leche)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 120, difficulty: 'Media',
    summary: 'Espresso con chocolate y leche texturizada. Goloso y reconfortante.',
    steps: [
      s(0, 'Chocolate', 'Pon 1–2 cucharadas de cacao o salsa de chocolate en la taza.'),
      s(20, 'Espresso doble', 'Extrae 36 g de espresso y mezcla con el chocolate.'),
      s(50, 'Leche', 'Añade ~180 g de leche texturizada y remueve.'),
    ],
    notes: 'Remata con un poco de cacao en polvo o nata si te apetece.',
  },
  {
    id: 'espresso-affogato', methodId: 'espresso', title: 'Affogato',
    source: 'Postre italiano', coffee: 18, water: 36, ratio: '1:2 (+ helado)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Fácil',
    summary: 'Una bola de helado de vainilla "ahogada" en un espresso caliente. Postre y café a la vez.',
    steps: [
      s(0, 'Helado', 'Pon una bola de helado de vainilla en una copa.'),
      s(20, 'Espresso doble', 'Extrae 36 g de espresso bien caliente.'),
      s(40, 'Vierte y sirve', 'Vierte el espresso sobre el helado y sirve de inmediato.'),
    ],
    notes: 'Sirve al momento, antes de que el helado se derrita del todo.',
  },
  {
    id: 'espresso-tonic', methodId: 'espresso', title: 'Espresso tonic',
    source: 'Espresso + tónica', coffee: 18, water: 36, ratio: '1:2 (+ tónica)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 90, difficulty: 'Fácil',
    summary: 'Refrescante y burbujeante: tónica fría con hielo y un espresso por encima. Cítrico y vibrante.',
    steps: [
      s(0, 'Vaso con hielo', 'Llena un vaso con hielo.'),
      s(10, 'Tónica', 'Añade ~120 g de agua tónica fría.'),
      s(40, 'Espresso', 'Extrae 36 g de espresso y viértelo despacio sobre la tónica.'),
    ],
    notes: 'Un espresso de tueste claro y frutal combina genial. Opcional: una rodaja de limón o naranja.',
  },
  {
    id: 'espresso-conpanna', methodId: 'espresso', title: 'Espresso con panna',
    source: 'Espresso + nata montada', coffee: 18, water: 36, ratio: '1:2 (+ nata)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Fácil',
    summary: 'Un espresso coronado con una cucharada de nata montada. Sencillo y goloso.',
    steps: [
      s(0, 'Espresso doble', 'Extrae 36 g de espresso en una taza.'),
      s(30, 'Nata', 'Corona con una cucharada de nata montada.'),
    ],
    notes: 'Puedes espolvorear cacao o canela por encima.',
  },
  {
    id: 'espresso-carajillo', methodId: 'espresso', title: 'Carajillo',
    source: 'Espresso con licor', coffee: 18, water: 36, ratio: '1:2 (+ licor)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Fácil',
    summary: 'Espresso con un chorrito de licor (brandy, ron o whisky). Clásico de sobremesa (solo para adultos).',
    steps: [
      s(0, 'Licor', 'Pon ~20 ml del licor elegido en el vaso (puedes flamearlo con azúcar).'),
      s(20, 'Espresso doble', 'Extrae 36 g de espresso y añádelo al licor.'),
    ],
    notes: 'Consúmelo con moderación. Variante fría: con hielo.',
  },
  {
    id: 'espresso-bombon', methodId: 'espresso', title: 'Café bombón (espresso)',
    source: 'Espresso + leche condensada', coffee: 18, water: 36, ratio: '1:2 (+ leche condensada)',
    grind: 'Fina', grindLevel: 2, temp: 93, totalTime: 60, difficulty: 'Fácil',
    summary: 'Capa de leche condensada y espresso encima, en vaso de cristal para lucir las dos capas.',
    steps: [
      s(0, 'Leche condensada', 'Pon una capa de leche condensada en un vaso pequeño.'),
      s(20, 'Espresso doble', 'Extrae 36 g de espresso.'),
      s(40, 'Vierte despacio', 'Añade el café lentamente para mantener las capas. Remueve antes de beber.'),
    ],
    notes: 'Versión exprés del bombón de moka, con la intensidad del espresso.',
  },

  /* ===================== Cold brew (más) ===================== */
  {
    id: 'coldbrew-tonic', methodId: 'coldbrew', title: 'Cold brew tonic',
    source: 'Concentrado + tónica', coffee: 0, water: 0, ratio: 'al gusto',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 120, difficulty: 'Fácil',
    summary: 'Refrescante: tónica con hielo y un chorro de concentrado de cold brew por encima.',
    steps: [
      s(0, 'Vaso con hielo', 'Llena un vaso con hielo.'),
      s(10, 'Tónica', 'Añade ~150 g de agua tónica fría.'),
      s(40, 'Cold brew', 'Vierte 40–60 g de concentrado de cold brew sobre la tónica.'),
    ],
    notes: 'Usa el "Concentrado fuerte (1:5)" como base. Opcional: cítrico para decorar.',
  },
  {
    id: 'coldbrew-latte', methodId: 'coldbrew', title: 'Cold brew latte',
    source: 'Concentrado + leche fría', coffee: 0, water: 0, ratio: '1:1',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 120, difficulty: 'Fácil',
    summary: 'Concentrado de cold brew con leche fría sobre hielo. Cremoso y suave.',
    steps: [
      s(0, 'Vaso con hielo', 'Llena un vaso con hielo.'),
      s(10, 'Concentrado', 'Añade ~100 g de concentrado de cold brew.'),
      s(40, 'Leche', 'Completa con ~100 g de leche fría (o bebida vegetal) y remueve.'),
    ],
    notes: 'Endúlzalo con sirope si quieres; el frío "esconde" el dulzor, así que prueba.',
  },
  {
    id: 'coldbrew-batch', methodId: 'coldbrew', title: 'Cold brew grande (1,5 L)',
    source: 'Inmersión en frío para varios días', coffee: 150, water: 1500, ratio: '1:10',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 64800, difficulty: 'Fácil',
    summary: 'Una jarra grande que dura toda la semana. Mismo método de inmersión, más cantidad.',
    steps: [
      s(0, 'Mezcla', '150 g de café grueso + 1,5 L de agua. Remueve bien.'),
      s(60, 'Reposo', 'Nevera 16–18 horas.'),
      s(120, 'Filtra', 'Cuela con filtro de papel o tela.'),
      s(180, 'Guarda', 'Conserva en botella tapada; diluye al servir.'),
    ],
    notes: 'Se conserva hasta una semana en nevera bien tapado.',
  },
  {
    id: 'coldbrew-especiado', methodId: 'coldbrew', title: 'Cold brew especiado',
    source: 'Inmersión en frío aromatizada', coffee: 100, water: 1000, ratio: '1:10',
    grind: 'Gruesa', grindLevel: 6, temp: 20, totalTime: 57600, difficulty: 'Fácil',
    summary: 'Cold brew con canela y vainilla añadidas a la infusión. Aromático y reconfortante en frío.',
    steps: [
      s(0, 'Mezcla', '100 g de café + 1 L de agua + 1 rama de canela y unas gotas de vainilla.'),
      s(60, 'Reposo', 'Nevera 14–18 horas.'),
      s(120, 'Filtra', 'Retira las especias y cuela el café.'),
      s(180, 'Sirve', 'Diluye al gusto y sirve sobre hielo.'),
    ],
    notes: 'Prueba también con cardamomo o piel de naranja en la infusión.',
  },

  /* ===================== Café turco (más) ===================== */
  {
    id: 'turco-cardamomo', methodId: 'turco', title: 'Turco con cardamomo',
    source: 'Estilo de Oriente Medio', coffee: 7, water: 70, ratio: '1:10',
    grind: 'Extra fina', grindLevel: 1, temp: 90, totalTime: 240, difficulty: 'Media',
    summary: 'Café turco aromatizado con cardamomo molido, muy típico en Oriente Medio.',
    steps: [
      s(0, 'Mezcla en frío', 'En el cezve: 70 g de agua fría, 7 g de café extra fino, una pizca de cardamomo (y azúcar al gusto).'),
      s(20, 'Fuego muy bajo', 'Calienta despacio sin remover.'),
      s(150, 'Espuma', 'Al subir la espuma, retira antes de hervir.'),
      s(180, 'Sirve', 'Reparte la espuma y sirve; deja asentar los posos.'),
    ],
    notes: 'Una vaina de cardamomo machacada en lugar del molido da un aroma más limpio.',
  },

  /* ===================== Sifón (más) ===================== */
  {
    id: 'sifon-batch', methodId: 'sifon', title: 'Sifón para tres',
    source: 'Cafetera de vacío grande', coffee: 30, water: 450, ratio: '1:15',
    grind: 'Media', grindLevel: 4, temp: 92, totalTime: 260, difficulty: 'Alta',
    summary: 'El sifón a mayor escala para tres tazas, controlando bien el tiempo de contacto.',
    steps: [
      s(0, 'Agua caliente', '450 g de agua caliente en el bulbo inferior y enciende el calor.'),
      s(70, 'Café', 'Al subir el agua, añade 30 g de café y remueve.'),
      s(90, 'Infusión', 'Infusiona ~60 s.'),
      s(160, 'Retira el calor', 'Apaga y deja que baje filtrado.'),
      s(230, 'Sirve', 'Sirve en cuanto termine de bajar.'),
    ],
    notes: 'Con más volumen, vigila que la fuente de calor sea suficiente para mantener el agua arriba.',
  },

  /* ===================== Kalita Wave ===================== */
  {
    id: 'kalita-clasica', methodId: 'kalita', title: 'Kalita Wave clásica',
    source: 'Técnica de fondo plano', coffee: 20, water: 320, ratio: '1:16',
    grind: 'Media-fina', grindLevel: 3, temp: 93, totalTime: 210, difficulty: 'Media',
    summary: 'Vertidos pequeños y frecuentes manteniendo el nivel. El fondo plano da una extracción muy uniforme.',
    steps: [
      s(0, 'Floración', 'Vierte 50 g y espera a que se hinche.'),
      s(45, 'Vertido 1', 'Hasta 150 g, en círculos pequeños.'),
      s(80, 'Vertido 2', 'Hasta 230 g.'),
      s(115, 'Vertido 3', 'Hasta 320 g.'),
      s(150, 'Drenado', 'Termina sobre 3:00–3:30.'),
    ],
    notes: 'Mantén un nivel de agua constante; evita verter sobre las paredes del filtro.',
  },
  {
    id: 'kalita-doble', methodId: 'kalita', title: 'Kalita doble (2 tazas)',
    source: 'Escalado', coffee: 28, water: 450, ratio: '1:16',
    grind: 'Media-fina', grindLevel: 3, temp: 93, totalTime: 240, difficulty: 'Media',
    summary: 'La misma técnica de vertidos por tandas para dos tazas, con el Kalita 185.',
    steps: [
      s(0, 'Floración', 'Vierte 60 g y espera.'),
      s(45, 'Vertido 1', 'Hasta 200 g.'),
      s(85, 'Vertido 2', 'Hasta 330 g.'),
      s(125, 'Vertido 3', 'Hasta 450 g.'),
      s(165, 'Drenado', 'Termina sobre 3:30–4:00.'),
    ],
    notes: 'Si drena demasiado lento, sube un punto la molienda.',
  },
  {
    id: 'kalita-iced', methodId: 'kalita', title: 'Kalita helada',
    source: 'Filtrado sobre hielo', coffee: 22, water: 200, ratio: '1:16 (con hielo)',
    grind: 'Media-fina', grindLevel: 3, temp: 93, totalTime: 180, difficulty: 'Media',
    summary: 'Filtra caliente sobre hielo. El fondo plano del Kalita facilita un goteo estable.',
    steps: [
      s(0, 'Hielo en la jarra', 'Pon ~130 g de hielo bajo el Kalita.'),
      s(5, 'Floración', 'Vierte 50 g de agua caliente.'),
      s(45, 'Vertidos', 'Vierte hasta 200 g de agua caliente total en 2 tandas.'),
      s(120, 'Remueve y sirve', 'Funde el hielo restante y sirve sobre hielo nuevo.'),
    ],
    notes: 'Muele un punto más fino que en caliente para compensar el menor tiempo.',
  },

  /* ===================== Clever Dripper ===================== */
  {
    id: 'clever-clasica', methodId: 'clever', title: 'Clever clásica',
    source: 'Inmersión + filtrado', coffee: 18, water: 300, ratio: '1:16,6',
    grind: 'Media', grindLevel: 4, temp: 92, totalTime: 180, difficulty: 'Fácil',
    summary: 'Inmersión total y, al apoyarla en la taza, libera el café filtrado. Casi imposible fallar.',
    steps: [
      s(0, 'Café y agua', 'Filtro enjuagado, 18 g de café y 300 g de agua. Remueve.'),
      s(20, 'Tapa', 'Coloca la tapa y deja infusionar.'),
      s(150, 'Libera', 'Apoya la Clever sobre la taza: el café empezará a filtrar.'),
      s(170, 'Sirve', 'Espera a que termine de drenar y sirve.'),
    ],
    notes: 'Más tiempo de inmersión = taza más fuerte. Empieza por 2:30 totales.',
  },
  {
    id: 'clever-fuerte', methodId: 'clever', title: 'Clever con cuerpo',
    source: 'Ratio cargado', coffee: 22, water: 300, ratio: '1:13,6',
    grind: 'Media', grindLevel: 4, temp: 92, totalTime: 210, difficulty: 'Fácil',
    summary: 'Más café e infusión algo más larga para una taza intensa y con cuerpo.',
    steps: [
      s(0, 'Café y agua', '22 g de café + 300 g de agua. Remueve.'),
      s(20, 'Infusión larga', 'Tapa y deja infusionar ~3 min.'),
      s(180, 'Libera y sirve', 'Apoya sobre la taza y deja drenar.'),
    ],
    notes: 'Si amarga, reduce la infusión o muele más grueso.',
  },
  {
    id: 'clever-clara', methodId: 'clever', title: 'Clever ligera y limpia',
    source: 'Estilo delicado', coffee: 15, water: 250, ratio: '1:16,6',
    grind: 'Media-gruesa', grindLevel: 5, temp: 90, totalTime: 150, difficulty: 'Fácil',
    summary: 'Infusión corta y molienda más gruesa para una taza ligera y muy limpia.',
    steps: [
      s(0, 'Café y agua', '15 g de café + 250 g de agua. Remueve suave.'),
      s(20, 'Infusión corta', 'Tapa y deja solo ~1:30.'),
      s(110, 'Libera y sirve', 'Apoya sobre la taza y deja filtrar.'),
    ],
    notes: 'Ideal para tuestes claros que quieras disfrutar suaves.',
  },

  /* ===================== Phin vietnamita ===================== */
  {
    id: 'phin-sua-nong', methodId: 'phin', title: 'Cà phê sữa nóng (caliente)',
    source: 'Café vietnamita tradicional', coffee: 25, water: 120, ratio: '1:5 aprox.',
    grind: 'Media-fina', grindLevel: 3, temp: 92, totalTime: 300, difficulty: 'Media',
    summary: 'Café fuerte que gotea lento sobre una capa de leche condensada. Dulce, denso e intenso.',
    steps: [
      s(0, 'Leche condensada', 'Pon 2–3 cucharadas de leche condensada en el vaso.'),
      s(15, 'Carga el phin', 'Coloca el phin encima, añade 25 g de café y asienta el filtro-prensa.'),
      s(30, 'Humedece', 'Vierte un poco de agua caliente para "florecer" el café (~30 s).'),
      s(60, 'Llena', 'Completa hasta ~120 g de agua y tapa.'),
      s(280, 'Remueve', 'Cuando termine de gotear, retira el phin y remueve la leche.'),
    ],
    notes: 'El goteo debe ser lento (3–5 min). Si va muy rápido, presiona algo más el filtro.',
  },
  {
    id: 'phin-sua-da', methodId: 'phin', title: 'Cà phê sữa đá (helado)',
    source: 'Café vietnamita helado', coffee: 25, water: 120, ratio: '1:5 aprox. (+ hielo)',
    grind: 'Media-fina', grindLevel: 3, temp: 92, totalTime: 330, difficulty: 'Media',
    summary: 'La versión helada e icónica: café con leche condensada vertido sobre hielo abundante.',
    steps: [
      s(0, 'Leche condensada', 'Pon 2–3 cucharadas de leche condensada en el vaso.'),
      s(15, 'Prepara el phin', 'Café en el phin, humedece y completa hasta ~120 g de agua. Tapa.'),
      s(280, 'Remueve', 'Al terminar de gotear, retira el phin y remueve bien.'),
      s(300, 'Hielo', 'Añade hielo abundante o vierte sobre un vaso lleno de hielo.'),
    ],
    notes: 'Usa café robusta de tueste oscuro para el sabor vietnamita auténtico.',
  },

  /* ===================== Cafetera de goteo ===================== */
  {
    id: 'goteo-clasica', methodId: 'goteo', title: 'Goteo eléctrica (jarra)',
    source: 'Cafetera de filtro doméstica', coffee: 30, water: 500, ratio: '1:16,6',
    grind: 'Media', grindLevel: 4, temp: 94, totalTime: 300, difficulty: 'Fácil',
    summary: 'La cómoda cafetera de filtro: pesa el café, usa agua filtrada y muele justo antes. Para ~3–4 tazas.',
    steps: [
      s(0, 'Filtro y café', 'Coloca el filtro (enjuágalo si es de papel) y 30 g de café molido medio.'),
      s(20, 'Agua', 'Añade 500 g de agua filtrada al depósito.'),
      s(40, 'Enciende', 'Pon en marcha; el agua goteará sobre el café.'),
      s(290, 'Sirve', 'Sirve al terminar; retira la jarra de la placa para que no se "queme".'),
    ],
    notes: 'El error más común es café molido demasiado antes y dosis "a ojo". Pésalo.',
  },
  {
    id: 'goteo-batch', methodId: 'goteo', title: 'Goteo grande (jarra llena)',
    source: 'Para grupo', coffee: 60, water: 1000, ratio: '1:16,6',
    grind: 'Media', grindLevel: 4, temp: 94, totalTime: 420, difficulty: 'Fácil',
    summary: 'La jarra completa para varias personas, manteniendo el ratio para que no salga aguado.',
    steps: [
      s(0, 'Filtro y café', 'Filtro enjuagado y 60 g de café medio.'),
      s(20, 'Agua', '1000 g de agua filtrada en el depósito.'),
      s(40, 'Enciende', 'Pon en marcha la cafetera.'),
      s(400, 'Sirve', 'Pasa el café a un termo para conservar aroma y temperatura.'),
    ],
    notes: 'Si tu cafetera extrae muy rápido, sube un punto la dosis de café.',
  },

  /* ===================== Percoladora ===================== */
  {
    id: 'percolador-clasico', methodId: 'percolador', title: 'Percoladora clásica',
    source: 'Cafetera de recirculación', coffee: 55, water: 1000, ratio: '1:18',
    grind: 'Gruesa', grindLevel: 6, temp: 100, totalTime: 480, difficulty: 'Media',
    summary: 'El agua sube y recircula por el café. Da un café fuerte; la clave es no pasarse de tiempo.',
    steps: [
      s(0, 'Agua y café', 'Llena el depósito con 1 L de agua y pon 55 g de café grueso en la cesta.'),
      s(30, 'Al fuego', 'Calienta hasta que empiece a "percolar" (verás saltar el café en el visor).'),
      s(60, 'Percola', 'Mantén un borboteo suave, no violento.'),
      s(420, 'Retira', 'Tras 6–8 min de percolado, retira del fuego.'),
      s(450, 'Sirve', 'Quita la cesta del café y sirve.'),
    ],
    notes: 'Molienda gruesa obligatoria: el café está en contacto mucho tiempo y se sobreextrae fácil.',
  },
  {
    id: 'percolador-camping', methodId: 'percolador', title: 'Percoladora de camping',
    source: 'Versión individual al fuego', coffee: 15, water: 250, ratio: '1:16,6',
    grind: 'Gruesa', grindLevel: 6, temp: 100, totalTime: 420, difficulty: 'Media',
    summary: 'La percoladora pequeña sobre fogón o brasas. Fuerte y reconfortante en plena naturaleza.',
    steps: [
      s(0, 'Agua y café', '250 g de agua en el depósito y 15 g de café grueso en la cesta.'),
      s(30, 'Al fuego', 'Calienta hasta que empiece a percolar.'),
      s(60, 'Percola', 'Mantén un borboteo suave 5–6 min.'),
      s(390, 'Retira y sirve', 'Aparta del calor, quita la cesta y sirve.'),
    ],
    notes: 'Sobre brasas, aleja un poco la percoladora para evitar que hierva con violencia.',
  },
];

export function recipesForMethod(methodId) {
  return RECIPES.filter((r) => r.methodId === methodId);
}

export function getMethod(id) {
  return METHODS.find((m) => m.id === id);
}

export function getRecipe(id) {
  return RECIPES.find((r) => r.id === id);
}

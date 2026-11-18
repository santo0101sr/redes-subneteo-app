// Datos educativos estructurados por área:
// 1. Soporte TI: IPEC Santo Domingo (Subneteo IPv4) + Cisco Networking Academy
// 2. Diseño de Software: Calidad del Software

window.APP_DATA = {
  areaTabs: {
    soporte: [
      { id: "inicio-soporte", label: "🏠 Ruta Soporte" },
      { id: "fundamentos", label: "🌐 Conceptos y OSI" },
      { id: "clases", label: "🔢 IPv4 y Clases" },
      { id: "binario", label: "⚡ Binario y CIDR" },
      { id: "subneteo", label: "🧮 Subneteo (6 Pasos)" },
      { id: "cisco", label: "💻 Consola IOS" },
      { id: "practica", label: "📝 Prácticas y Quiz" }
    ],
    diseno: [
      { id: "calidad-fund", label: "🛡️ Fundamentos e ISO" },
      { id: "calidad-metricas", label: "📊 Métricas y Riesgos" },
      { id: "calidad-qa", label: "🔄 QA y Verificación" },
      { id: "calidad-etica", label: "🤝 Servicio y Ética" },
      { id: "practica", label: "📝 Evaluación" }
    ]
  },

  flashcards: [
    { front: "TCP vs UDP", back: "TCP: confiable, orientado a conexión (HTTP, correo). UDP: rápido, sin conexión (VoIP, streaming, DNS)." },
    { front: "DHCP", back: "Asigna automáticamente dirección IP, máscara de subred, puerta de enlace y DNS a los hosts." },
    { front: "DNS", back: "Traduce nombres de dominio legibles (www.cisco.com) a direcciones IP numéricas." },
    { front: "ARP", back: "Descubre la dirección MAC asociada a una IPv4 conocida en la LAN (en IPv6 se usa ND / ICMPv6)." },
    { front: "Default Gateway", back: "IP de la interfaz del router local que permite a los hosts comunicarse con redes externas." },
    { front: "Loopback y APIPA", back: "127.0.0.0/8 es Loopback (pruebas locales). 169.254.0.0/16 es APIPA (asignación automática si falla DHCP)." }
  ],

  osiLayers: [
    { num: 7, osi: "Aplicación", tcpip: "Aplicación", pdu: "Datos", desc: "Interfaz con el usuario y servicios de red (HTTP, DNS, DHCP, FTP).", encap: "Se generan los datos originales de la aplicación." },
    { num: 6, osi: "Presentación", tcpip: "(En Aplicación)", pdu: "Datos", desc: "Formato, cifrado y compresión de datos.", encap: "Los datos se codifican o cifran antes de pasar a Sesión." },
    { num: 5, osi: "Sesión", tcpip: "(En Aplicación)", pdu: "Datos", desc: "Establece, mantiene y cierra diálogos entre aplicaciones.", encap: "Se gestiona el control de diálogo de la sesión." },
    { num: 4, osi: "Transporte", tcpip: "Transporte", pdu: "Segmento", desc: "Comunicación extremo a extremo, puertos y confiabilidad (TCP / UDP).", encap: "Se agrega el encabezado TCP/UDP con puertos." },
    { num: 3, osi: "Red", tcpip: "Internet", pdu: "Paquete", desc: "Direccionamiento lógico (IP) y enrutamiento entre redes (Routers).", encap: "Se agrega el encabezado IP (origen y destino)." },
    { num: 2, osi: "Enlace de Datos", tcpip: "Acceso a la Red", pdu: "Trama (Frame)", desc: "Direccionamiento físico (MAC) y acceso al medio (Switches).", encap: "Se agrega encabezado MAC y tráiler FCS." },
    { num: 1, osi: "Física", tcpip: "(En Acceso a la Red)", pdu: "Bits", desc: "Transmisión binaria (bits 0 y 1) por cables, fibra o aire.", encap: "La trama se convierte en pulsos eléctricos, luz u ondas." }
  ],

  qualityFactors: [
    { name: "Funcionalidad", summary: "Ofrece las funciones necesarias y produce resultados exactos según las reglas del negocio." },
    { name: "Fiabilidad y Disponibilidad", summary: "Fiabilidad: opera sin fallos bajo condiciones definidas (no es sinónimo de seguridad). Disponibilidad: proporción de tiempo operativo." },
    { name: "Usabilidad y Accesibilidad", summary: "Usabilidad: facilidad para lograr objetivos. Accesibilidad: uso inclusivo con tecnologías de apoyo (contraste, navegación por teclado)." },
    { name: "Eficiencia y Rendimiento", summary: "Tiempos de respuesta, consumo de recursos y capacidad bajo carga medida (ej. responder en < 2 s con 100 usuarios concurrentes)." },
    { name: "Mantenibilidad y Portabilidad", summary: "Mantenibilidad: facilidad para analizar, modificar y probar el código (modularidad). Portabilidad: adaptación a otros entornos." },
    { name: "Seguridad", summary: "Confidencialidad, integridad, autenticidad, control de acceso y trazabilidad aplicados por capas (autenticación, validación y respaldos)." }
  ],

  pyramidLevels: {
    aceptacion: "Cima · Pruebas de Aceptación / Sistema: Valida el sistema completo frente a requisitos y criterios del usuario final.",
    integracion: "Centro · Pruebas de Integración: Verifica que los módulos, APIs y servicios se comuniquen correctamente entre sí.",
    unitarias: "Base · Pruebas Unitarias: Pruebas rápidas y aisladas sobre funciones o componentes individuales. Son la base de la pirámide."
  },

  qaCycleSteps: {
    planificar: "1. Planificar: Definir alcance, objetivos, riesgos y criterios de aceptación proporcionales al proyecto.",
    estandares: "2. Definir estándares: Establecer buenas prácticas compartidas y procedimientos claros.",
    revisar: "3. Revisar y probar: Ejecutar revisiones estáticas (pares/formales) y pruebas dinámicas (QC).",
    medir: "4. Medir: Recolectar métricas con fórmula, unidad, fuente y periodo (densidad, reapertura, aprobación).",
    mejorar: "5. Mejorar: Usar la evidencia estadística (Pareto, histogramas) para retroalimentar el siguiente ciclo."
  },

  practices: [
    {
      id: "p1",
      title: "Práctica 1: Identificar clases y bloques privados",
      prompt: "¿Qué clase histórica es 172.20.3.8 y es pública o privada?",
      placeholder: "Ej: Clase B, privada",
      check: (val) => val.toLowerCase().includes("b") && val.toLowerCase().includes("privada"),
      solution: "Clase B, privada (pertenece al bloque 172.16.0.0/12)."
    },
    {
      id: "p2",
      title: "Práctica 2: Dividir 192.168.20.0/24 en 2 subredes iguales",
      prompt: "¿Cuál es el nuevo prefijo CIDR y el salto?",
      placeholder: "Ej: /25 y salto 128",
      check: (val) => val.includes("25") && val.includes("128"),
      solution: "1 bit prestado → /25 (255.255.255.128), salto 128. Subred 1: .0 (.1–.126, bcast .127), Subred 2: .128 (.129–.254, bcast .255)."
    },
    {
      id: "p3",
      title: "Práctica 3: 192.168.30.0/24 en 8 subredes iguales",
      prompt: "¿Cuál es la quinta dirección de red?",
      placeholder: "Ej: 192.168.30.128",
      check: (val) => val.trim().startsWith("192.168.30.128"),
      solution: "8 subredes = 2³ → /27, salto 32. Redes: .0, .32, .64, .96, .128. La quinta subred es 192.168.30.128/27."
    },
    {
      id: "p4",
      title: "Práctica 4: Oficina requiere 50 hosts por subred en 192.168.40.0/24",
      prompt: "¿Cuántos bits de host se necesitan y qué prefijo resulta?",
      placeholder: "Ej: 6 bits, /26",
      check: (val) => val.includes("6") && val.includes("26"),
      solution: "2⁵−2 = 30 (insuficiente), 2⁶−2 = 62 (suficiente). Se necesitan 6 bits de host → prefijo /26 (255.255.255.192, salto 64)."
    }
  ],

  quizQuestions: [
    {
      q: "1. [Redes] ¿Qué prefijo CIDR corresponde a la máscara 255.255.255.192?",
      options: ["/24", "/25", "/26", "/27"],
      answer: 2
    },
    {
      q: "2. [Redes] ¿Cuántos hosts utilizables tiene una subred /27?",
      options: ["14 hosts", "30 hosts", "32 hosts", "62 hosts"],
      answer: 1
    },
    {
      q: "3. [Soporte] ¿Qué protocolo descubre la dirección MAC asociada a una IPv4 en la LAN?",
      options: ["DHCP", "DNS", "ARP", "ICMP"],
      answer: 2
    },
    {
      q: "4. [Soporte] En el modelo OSI, ¿qué dispositivo opera en la Capa 2 usando direcciones MAC?",
      options: ["Router", "Switch", "Repetidor", "Servidor DNS"],
      answer: 1
    },
    {
      q: "5. [Diseño / Calidad] ¿Cuál es la diferencia principal entre QA (Aseguramiento) y QC (Control)?",
      options: [
        "QA es detectivo sobre el producto y QC es preventivo sobre el proceso",
        "QA es preventivo enfocado en los procesos; QC es detectivo y evalúa el producto",
        "Ambos significan exactamente lo mismo en ISO 9001",
        "QC solo aplica a redes y QA solo a bases de datos"
      ],
      answer: 1
    },
    {
      q: "6. [Diseño / Calidad] ¿Qué categoría de costos de calidad representa el mayor impacto económico?",
      options: ["Prevención", "Evaluación", "Fallas internas", "Fallas externas (en producción)"],
      answer: 3
    },
    {
      q: "7. [Diseño / Calidad] ¿Cuál es un ejemplo de criterio de aceptación verificable?",
      options: [
        "Que el sistema sea seguro y rápido",
        "Bloquear el acceso tras 5 intentos fallidos de inicio de sesión",
        "Tener una interfaz bonita",
        "Cumplir con ISO 9001 automáticamente"
      ],
      answer: 1
    }
  ]
};

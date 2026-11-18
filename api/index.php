<?php
declare(strict_types=1);

header('Content-Type: text/html; charset=UTF-8');

$appTitle = 'IPEC Santo Domingo · Soporte TI y Diseño de Software';
$phpVersion = PHP_VERSION;
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>IPEC Santo Domingo · Soporte TI y Diseño de Software</title>
  <link rel="stylesheet" href="/css/styles.css" />
</head>
<body data-active-area="soporte" data-theme="light">
  <div class="app-layout">
    <!-- Menú lateral con Switch de Área y Tema Claro/Oscuro -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-top-row">
        <span class="brand-badge">IPEC · Cisco · QA</span>
        <button id="theme-toggle" class="theme-btn" aria-label="Cambiar tema">🌙 Oscuro</button>
      </div>

      <div class="brand">
        <h1>Portal de Estudio</h1>
        <p class="brand-sub">Soporte TI &amp; Diseño</p>
      </div>

      <!-- Switch de Área: Soporte (Azul) <-> Diseño (Verde) -->
      <div class="area-switch" role="tablist" aria-label="Cambiar de área">
        <button class="area-switch-btn active" data-area="soporte" role="tab" aria-selected="true">
          Soporte
        </button>
        <button class="area-switch-btn" data-area="diseno" role="tab" aria-selected="false">
          Diseño
        </button>
      </div>

      <div class="progress-box">
        <div class="progress-label">
          <span>Progreso</span>
          <strong id="progress-percent">0%</strong>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
      </div>

      <!-- Pestañas del área activa en menú lateral -->
      <nav class="tabs-bar" id="tabs-bar" aria-label="Secciones del área"></nav>

      <div class="sidebar-footer" style="display:flex; flex-direction:column; gap:6px;">
        <button id="credits-btn" class="tab-btn" data-section="creditos">ℹ️ Créditos</button>
        <button id="reset-progress" class="btn-ghost">Reiniciar progreso</button>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <header class="topbar">
        <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menú">☰</button>
        <div class="topbar-title" id="topbar-title">Ruta Soporte</div>
        <div class="topbar-meta" id="topbar-area-label">Área: Soporte TI</div>
      </header>
      <!-- SOPORTE TI: RUTA -->
    <section id="sec-inicio-soporte" class="section active">
      <div class="hero-card">
        <h2>Soporte TI: Redes y Subneteo IPv4</h2>
        <p>
          Aprende de forma visual y práctica los fundamentos de redes (Cisco) y el método de 6 pasos para subneteo IPv4 (IPEC Santo Domingo).
        </p>
        <div class="key-idea">
          <strong>Idea clave del subneteo:</strong> Identifica el prefijo, calcula el salto y verifica el rango de direcciones.
        </div>
      </div>

      <h3 class="mt-lg">Ruta de aprendizaje</h3>
      <div class="grid-cards">
        <article class="card clickable" data-goto="fundamentos">
          <span class="step-num">1</span>
          <h4>Conceptos y OSI</h4>
          <p>Dispositivos, LAN/WAN, encapsulamiento OSI vs TCP/IP y tarjetas de repaso.</p>
        </article>
        <article class="card clickable" data-goto="clases">
          <span class="step-num">2</span>
          <h4>IPv4 y Clases</h4>
          <p>Inspector interactivo de IPv4, bloques privados RFC 1918, Loopback y APIPA.</p>
        </article>
        <article class="card clickable" data-goto="binario">
          <span class="step-num">3</span>
          <h4>Binario y CIDR</h4>
          <p>Tablero de 8 bits clickeable y explorador de prefijos /24 a /30.</p>
        </article>
        <article class="card clickable" data-goto="subneteo">
          <span class="step-num">4</span>
          <h4>Subneteo (6 Pasos)</h4>
          <p>Calculadora paso a paso con barra visual proporcional de subredes.</p>
        </article>
        <article class="card clickable" data-goto="cisco">
          <span class="step-num">5</span>
          <h4>Consola Cisco IOS</h4>
          <p>Mini terminal interactiva para practicar comandos de configuración y diagnóstico.</p>
        </article>
      </div>

      <div class="card mt-lg">
        <h4>Videos de apoyo recomendados</h4>
        <ul class="link-list">
          <li>
            <a href="https://www.youtube.com/watch?v=kceWXMaJsew&list=PLINy58Bvq5_L2WfuQeZ4t77EEhj-sG675" target="_blank" rel="noopener">
              ▶ Lista de reproducción: Subneteo IPv4 paso a paso
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=SHbBso63X38" target="_blank" rel="noopener">
              ▶ Video complementario de subneteo
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- SOPORTE TI: CONCEPTOS Y OSI -->
    <section id="sec-fundamentos" class="section">
      <div class="section-header">
        <h2>Resumen de Conceptos en Soporte TI</h2>
        <label class="done-check"><input type="checkbox" data-module="fundamentos" /> Completado</label>
      </div>

      <div class="grid-cards three-cols">
        <div class="card">
          <h4>Dispositivos Finales</h4>
          <p>Origen o destino (PC, laptops, servidores, impresoras). Tienen dirección <strong>IP</strong> y <strong>MAC</strong>.</p>
        </div>
        <div class="card">
          <h4>Dispositivos Intermediarios</h4>
          <p><strong>Switches</strong> (LAN por MAC), <strong>Routers</strong> (entre redes por IP), puntos de acceso (AP) y firewalls.</p>
        </div>
        <div class="card">
          <h4>Medios y Redes</h4>
          <p>Cobre (UTP/STP), Fibra óptica (luz, sin EMI) e Inalámbrico. <strong>LAN</strong> (local) vs <strong>WAN</strong> (ISP).</p>
        </div>
      </div>

      <!-- Flashcards interactivas -->
      <div class="interactive-box mt-lg">
        <h3>Tarjetas de Repaso Rápido (Haz clic para voltear)</h3>
        <div class="flashcards-grid" id="flashcards-grid"></div>
      </div>

      <!-- Simulador OSI -->
      <div class="interactive-box mt-lg">
        <h3>Simulador de Encapsulamiento: OSI vs TCP/IP</h3>
        <p>Haz clic en cualquier capa para inspeccionar su equivalente TCP/IP, PDU y función.</p>
        <div class="osi-layout">
          <div class="osi-stack" id="osi-stack"></div>
          <div class="osi-detail" id="osi-detail">
            <h4>Selecciona una capa</h4>
            <p>Explora cómo se encapsulan los datos desde Capa 7 (Aplicación) hasta Capa 1 (Física).</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOPORTE TI: IPv4 Y CLASES -->
    <section id="sec-clases" class="section">
      <div class="section-header">
        <h2>IPv4, Clases y Direcciones Especiales</h2>
        <label class="done-check"><input type="checkbox" data-module="clases" /> Completado</label>
      </div>

      <div class="interactive-box">
        <h3>Inspector Interactivo de IPv4</h3>
        <p>Escribe o elige una IPv4 para ver sus octetos, representación binaria, clase y si es pública, privada o especial.</p>
        <div class="input-row">
          <input type="text" id="ip-inspector-input" value="172.20.3.8" placeholder="Ej. 192.168.10.25" />
          <button id="ip-inspector-btn" class="btn-primary">Analizar IP</button>
        </div>
        <div class="preset-chips">
          <button class="chip" data-ip="10.5.2.1">10.5.2.1</button>
          <button class="chip" data-ip="172.20.3.8">172.20.3.8</button>
          <button class="chip" data-ip="172.35.1.1">172.35.1.1</button>
          <button class="chip" data-ip="192.168.15.10">192.168.15.10</button>
          <button class="chip" data-ip="127.0.0.1">127.0.0.1</button>
          <button class="chip" data-ip="169.254.10.5">169.254.10.5</button>
          <button class="chip" data-ip="230.1.1.1">230.1.1.1</button>
        </div>
        <div id="ip-inspector-result" class="result-panel"></div>
      </div>

      <div class="grid-cards two-cols mt-lg">
        <div class="card">
          <h4>MAC vs IPv4 vs IPv6</h4>
          <ul>
            <li><strong>MAC (Capa 2):</strong> 48 bits en hexadecimal. Entrega tramas dentro de la LAN.</li>
            <li><strong>IPv4 (Capa 3):</strong> 32 bits en 4 octetos decimales (0–255).</li>
            <li><strong>IPv6:</strong> 128 bits en hexadecimal. No utiliza transmisión <em>Broadcast</em>.</li>
          </ul>
        </div>
        <div class="card">
          <h4>Privadas (RFC 1918) y Especiales</h4>
          <ul>
            <li><strong>Clase A:</strong> <code>10.0.0.0/8</code> | <strong>Clase B:</strong> <code>172.16.0.0/12</code> | <strong>Clase C:</strong> <code>192.168.0.0/16</code></li>
            <li><strong>Especiales:</strong> <code>0.0.0.0</code> (defecto), <code>127.0.0.0/8</code> (Loopback), <code>169.254.0.0/16</code> (APIPA), <code>255.255.255.255</code> (Broadcast).</li>
          </ul>
        </div>
      </div>

      <div class="card mt-lg">
        <h3>Resumen de Clases IPv4</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Clase</th><th>1.er Bit</th><th>Rango 1.er Octeto</th><th>Máscara Histórica</th><th>Hosts / Red</th></tr>
            </thead>
            <tbody>
              <tr><td>Clase A</td><td><code>0...</code></td><td>1 – 126</td><td>255.0.0.0 (/8)</td><td>16,777,214</td></tr>
              <tr><td>Clase B</td><td><code>10...</code></td><td>128 – 191</td><td>255.255.0.0 (/16)</td><td>65,534</td></tr>
              <tr><td>Clase C</td><td><code>110...</code></td><td>192 – 223</td><td>255.255.255.0 (/24)</td><td>254</td></tr>
              <tr><td>Clase D</td><td><code>1110...</code></td><td>224 – 239</td><td>No aplica (Multicast)</td><td>—</td></tr>
              <tr><td>Clase E</td><td><code>1111...</code></td><td>240 – 255</td><td>No aplica (Reservado)</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- SOPORTE TI: BINARIO Y CIDR -->
    <section id="sec-binario" class="section">
      <div class="section-header">
        <h2>Binario y Notación CIDR</h2>
        <label class="done-check"><input type="checkbox" data-module="binario" /> Completado</label>
      </div>

      <div class="interactive-box">
        <h3>Tablero Interactivo de 8 Bits</h3>
        <p>Haz clic en cada bit para encenderlo (1) o apagarlo (0) y ver cómo se suma el octeto.</p>
        <div class="bit-board" id="bit-board"></div>
        <div class="bit-summary">
          <div>
            <label for="decimal-input">Decimal:</label>
            <input type="number" id="decimal-input" min="0" max="255" value="192" />
          </div>
          <div class="bit-equation" id="bit-equation">128 + 64 = 192</div>
          <div class="preset-chips">
            <button class="chip bit-preset" data-val="13">13</button>
            <button class="chip bit-preset" data-val="192">192 (/26)</button>
            <button class="chip bit-preset" data-val="224">224 (/27)</button>
            <button class="chip bit-preset" data-val="255">255</button>
          </div>
        </div>
      </div>

      <div class="interactive-box mt-lg">
        <h3>Explorador de Prefijos CIDR (/24 a /30)</h3>
        <p>Regla: <code>bits de host = 32 − prefijo</code> y <code>hosts utilizables = 2^h − 2</code>.</p>
        <div class="cidr-control">
          <label for="cidr-slider">Prefijo CIDR: <strong id="cidr-display">/26</strong></label>
          <input type="range" id="cidr-slider" min="24" max="30" value="26" />
        </div>
        <div id="cidr-result" class="result-panel"></div>
      </div>
    </section>

    <!-- SOPORTE TI: SUBNETEO 6 PASOS -->
    <section id="sec-subneteo" class="section">
      <div class="section-header">
        <h2>Laboratorio de Subneteo (6 Pasos)</h2>
        <label class="done-check"><input type="checkbox" data-module="subneteo" /> Completado</label>
      </div>

      <div class="interactive-box">
        <h3>Calculadora Didáctica Paso a Paso</h3>
        <div class="subnet-form">
          <div class="form-group">
            <label for="sub-ip">Red Base (IP)</label>
            <input type="text" id="sub-ip" value="192.168.1.0" />
          </div>
          <div class="form-group">
            <label for="sub-prefix">Prefijo Inicial</label>
            <select id="sub-prefix">
              <option value="8">/8 (Clase A)</option>
              <option value="16">/16 (Clase B)</option>
              <option value="24" selected>/24 (Clase C)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="sub-mode">Diseñar según:</label>
            <select id="sub-mode">
              <option value="subnets">Cantidad de subredes</option>
              <option value="hosts">Hosts necesarios por subred</option>
            </select>
          </div>
          <div class="form-group">
            <label for="sub-target" id="sub-target-label">Subredes requeridas</label>
            <input type="number" id="sub-target" min="1" max="256" value="4" />
          </div>
          <button id="sub-calc-btn" class="btn-primary">Calcular 6 Pasos</button>
        </div>

        <div class="preset-chips">
          <span>Ejemplos:</span>
          <button class="chip sub-preset" data-ip="192.168.1.0" data-pre="24" data-mode="subnets" data-val="4">192.168.1.0/24 → 4 subredes</button>
          <button class="chip sub-preset" data-ip="192.168.10.0" data-pre="24" data-mode="subnets" data-val="8">192.168.10.0/24 → 8 subredes</button>
          <button class="chip sub-preset" data-ip="192.168.50.0" data-pre="24" data-mode="hosts" data-val="25">192.168.50.0/24 → 25 hosts</button>
          <button class="chip sub-preset" data-ip="172.16.0.0" data-pre="16" data-mode="subnets" data-val="4">172.16.0.0/16 → 4 subredes</button>
        </div>

        <div id="subnet-visual-bar" class="subnet-visual-bar"></div>
        <div id="subnet-steps" class="steps-grid mt-md"></div>
        <div id="subnet-table-wrap" class="table-wrap mt-md"></div>
      </div>
    </section>

    <!-- SOPORTE TI: CONSOLA CISCO IOS -->
    <section id="sec-cisco" class="section">
      <div class="section-header">
        <h2>Consola Básica Cisco IOS</h2>
        <label class="done-check"><input type="checkbox" data-module="cisco" /> Completado</label>
      </div>

      <div class="interactive-box">
        <p>Haz clic en los comandos o escríbelos para practicar los modos de Cisco IOS.</p>
        <div class="preset-chips">
          <button class="chip ios-cmd" data-cmd="enable">enable</button>
          <button class="chip ios-cmd" data-cmd="configure terminal">configure terminal</button>
          <button class="chip ios-cmd" data-cmd="interface g0/1">interface g0/1</button>
          <button class="chip ios-cmd" data-cmd="no shutdown">no shutdown</button>
          <button class="chip ios-cmd" data-cmd="exit">exit</button>
          <button class="chip ios-cmd" data-cmd="show ip interface brief">show ip interface brief</button>
          <button class="chip ios-cmd" data-cmd="copy running-config startup-config">copy running-config startup-config</button>
          <button class="chip ios-cmd" data-cmd="ping 192.168.1.1">ping 192.168.1.1</button>
        </div>

        <div class="terminal" id="ios-terminal">
          <div class="terminal-output" id="ios-output">
            <div>Cisco IOS Simulator · Escribe <code>help</code> para ver comandos.</div>
          </div>
          <div class="terminal-input-line">
            <span id="ios-prompt">Switch&gt;</span>
            <input type="text" id="ios-input" autocomplete="off" placeholder="Escribe un comando..." />
          </div>
        </div>
      </div>
    </section>

    <!-- DISEÑO DE SOFTWARE: 1. FUNDAMENTOS E ISO -->
    <section id="sec-calidad-fund" class="section">
      <div class="section-header">
        <h2>Calidad del Software · Fundamentos e ISO</h2>
        <label class="done-check"><input type="checkbox" data-module="calidad" /> Completado</label>
      </div>

      <div class="key-idea" style="margin-bottom: 18px;">
        <strong>Idea central:</strong> La calidad no es solo ausencia de errores; es el grado en que un software cumple requisitos
        <em>explícitos e implícitos</em> en un contexto de uso, integrando desempeño, seguridad, usabilidad, servicio al cliente y ética.
      </div>

      <div class="grid-cards two-cols">
        <div class="card">
          <h4>Producto vs. Proceso &amp; QA vs. QC</h4>
          <ul>
            <li><strong>Producto vs. Proceso:</strong> El <em>producto</em> es el sistema entregado; el <em>proceso</em> son las prácticas para construirlo y mejorarlo.</li>
            <li><strong>QA (Aseguramiento):</strong> Preventivo, enfocado en los <em>procesos</em>.</li>
            <li><strong>QC (Control):</strong> Detectivo, evalúa el <em>producto</em> (las pruebas forman parte de QC).</li>
          </ul>
        </div>
        <div class="card">
          <h4>Normas ISO Clave</h4>
          <ul>
            <li><strong>ISO/IEC 25010 (SQuaRE):</strong> Define atributos medibles para evaluar la calidad del producto.</li>
            <li><strong>ISO 9001:</strong> Regula sistemas de gestión de calidad de la organización (procesos), pero no certifica que una app esté libre de defectos.</li>
          </ul>
        </div>
      </div>

      <!-- Pirámide de pruebas interactiva -->
      <div class="interactive-box mt-lg">
        <h3>Pirámide de Pruebas Interactiva</h3>
        <p>Haz clic en cada nivel para ver su enfoque (se complementan entre sí; ninguna garantiza por sí sola ausencia de fallos).</p>
        <div class="pyramid-stack">
          <button class="pyramid-level top" data-pyr="aceptacion">Aceptación / Sistema</button>
          <button class="pyramid-level mid" data-pyr="integracion">Integración</button>
          <button class="pyramid-level base active" data-pyr="unitarias">Unitarias</button>
        </div>
        <div id="pyramid-detail" class="result-panel"></div>
      </div>

      <!-- Explorador ISO 25010 -->
      <div class="interactive-box mt-lg">
        <h3>Factores de Calidad (ISO/IEC 25010)</h3>
        <div class="preset-chips" id="quality-factor-chips"></div>
        <div id="quality-factor-detail" class="result-panel"></div>
      </div>
    </section>

    <!-- DISEÑO DE SOFTWARE: 2. MÉTRICAS Y RIESGOS -->
    <section id="sec-calidad-metricas" class="section">
      <div class="section-header">
        <h2>Calidad del Software · Métricas, Costos y Riesgos</h2>
      </div>

      <div class="grid-cards two-cols">
        <div class="card">
          <h4>4 Categorías de Costos de Calidad</h4>
          <ul>
            <li><strong>1. Prevención:</strong> Capacitación y estándares.</li>
            <li><strong>2. Evaluación:</strong> Revisiones, auditorías y pruebas.</li>
            <li><strong>3. Fallas internas:</strong> Defectos corregidos antes de entregar.</li>
            <li><strong>4. Fallas externas:</strong> Errores en producción (los más costosos).</li>
          </ul>
        </div>
        <div class="card">
          <h4>Revisiones Estáticas &amp; Trazabilidad</h4>
          <ul>
            <li><strong>Informales:</strong> Lectura cruzada rápida entre pares; económicas, poca evidencia si no se registran.</li>
            <li><strong>Formales:</strong> Planificadas con roles (moderador, relator), criterios y seguimiento hasta cierre.</li>
            <li><strong>Registro:</strong> Documentar ID, fecha, versión, severidad, responsable, estado y evidencia.</li>
          </ul>
        </div>
      </div>

      <div class="interactive-box mt-lg">
        <h3>Calculadora de Métricas de Calidad</h3>
        <p>Toda métrica requiere <em>fórmula, unidad, fuente, periodo y objetivo</em>.</p>
        <div class="subnet-form">
          <div class="form-group">
            <label for="m-defects">Defectos</label>
            <input type="number" id="m-defects" value="12" min="0" />
          </div>
          <div class="form-group">
            <label for="m-kloc">Tamaño (KLOC)</label>
            <input type="number" id="m-kloc" value="4" min="0.1" step="0.5" />
          </div>
          <div class="form-group">
            <label for="m-reopened">Reabiertas</label>
            <input type="number" id="m-reopened" value="2" min="0" />
          </div>
          <div class="form-group">
            <label for="m-closed">Cerradas</label>
            <input type="number" id="m-closed" value="20" min="1" />
          </div>
          <div class="form-group">
            <label for="m-passed">Pruebas OK</label>
            <input type="number" id="m-passed" value="45" min="0" />
          </div>
          <div class="form-group">
            <label for="m-exec">Ejecutadas</label>
            <input type="number" id="m-exec" value="50" min="1" />
          </div>
          <button id="calc-metrics-btn" class="btn-primary">Calcular</button>
        </div>
        <div id="metrics-result" class="steps-grid mt-md"></div>
      </div>

      <div class="interactive-box mt-lg">
        <h3>Evaluador de Riesgos (Probabilidad × Impacto)</h3>
        <div class="subnet-form">
          <div class="form-group">
            <label for="risk-prob">Probabilidad (1–5)</label>
            <input type="number" id="risk-prob" min="1" max="5" value="3" />
          </div>
          <div class="form-group">
            <label for="risk-imp">Impacto (1–5)</label>
            <input type="number" id="risk-imp" min="1" max="5" value="4" />
          </div>
          <button id="risk-calc-btn" class="btn-primary">Evaluar</button>
        </div>
        <div id="risk-result" class="result-panel"></div>
      </div>
    </section>

    <!-- DISEÑO DE SOFTWARE: 3. QA Y VERIFICACIÓN -->
    <section id="sec-calidad-qa" class="section">
      <div class="section-header">
        <h2>Calidad del Software · QA y Verificación</h2>
      </div>

      <div class="interactive-box">
        <h3>Ciclo Continuo de QA (Haz clic en cada etapa)</h3>
        <div class="qa-cycle-row" id="qa-cycle-row">
          <button class="qa-step-btn active" data-qa="planificar">1. Planificar</button>
          <button class="qa-step-btn" data-qa="estandares">2. Estándares</button>
          <button class="qa-step-btn" data-qa="revisar">3. Revisar y probar</button>
          <button class="qa-step-btn" data-qa="medir">4. Medir</button>
          <button class="qa-step-btn" data-qa="mejorar">5. Mejorar</button>
        </div>
        <div id="qa-cycle-detail" class="result-panel"></div>
      </div>

      <div class="grid-cards two-cols mt-lg">
        <div class="mini-card">
          <strong>Meta vs. Criterio de Aceptación</strong>
          <p><b>Meta:</b> Resultado deseado (ej. «acceso seguro»).<br /><b>Criterio:</b> Concreto y verificable (ej. «bloquear tras 5 intentos fallidos»).</p>
        </div>
        <div class="mini-card">
          <strong>Estándar vs. Procedimiento</strong>
          <p><b>Estándar:</b> Criterios y buenas prácticas.<br /><b>Procedimiento:</b> Pasos, responsables y evidencias consistentes.</p>
        </div>
        <div class="mini-card">
          <strong>Método, Técnica y Control</strong>
          <p><b>Método:</b> Revisión por pares.<br /><b>Técnica:</b> Checklist.<br /><b>Control:</b> No publicar con defectos críticos.</p>
        </div>
        <div class="mini-card">
          <strong>Aseguramiento Estadístico</strong>
          <p>Histogramas, diagramas de Pareto y gráficos de control para detectar variaciones y causas raíz.</p>
        </div>
      </div>

      <div class="card mt-lg">
        <h4>Procedimiento Práctico de Verificación (5 Pasos)</h4>
        <ul class="checklist">
          <li><label><input type="checkbox" /> <strong>1. Elegir</strong> el requisito y su criterio de aceptación.</label></li>
          <li><label><input type="checkbox" /> <strong>2. Preparar</strong> los datos de prueba y el ambiente.</label></li>
          <li><label><input type="checkbox" /> <strong>3. Ejecutar</strong> la revisión o prueba definida.</label></li>
          <li><label><input type="checkbox" /> <strong>4. Registrar</strong> el resultado obtenido y su evidencia.</label></li>
          <li><label><input type="checkbox" /> <strong>5. Corregir y repetir</strong> la verificación hasta cumplir el criterio.</label></li>
        </ul>
      </div>
    </section>

    <!-- DISEÑO DE SOFTWARE: 4. SERVICIO Y ÉTICA -->
    <section id="sec-calidad-etica" class="section">
      <div class="section-header">
        <h2>Calidad del Software · Servicio al Cliente y Ética</h2>
      </div>

      <div class="grid-cards two-cols">
        <div class="card">
          <h4>Servicio Profesional</h4>
          <p>Acompañamiento antes, durante y después de la entrega. Basado en escucha activa, empatía, honestidad (no prometer fechas sin verificar capacidad), acuerdos por escrito, priorización por impacto/urgencia y explicar fallas sin tecnicismos.</p>
        </div>
        <div class="card">
          <h4>Negociación y Cultura de Paz</h4>
          <p>Decisiones basadas en evidencia, evaluar alternativas y resolver desacuerdos sin agresión buscando acuerdos viables (ej. proponer entregas por etapas ante plazos irreales).</p>
        </div>
        <div class="card">
          <h4>Civismo Digital y Pensamiento Crítico</h4>
          <p>Uso responsable de la tecnología, contrastar fuentes, reconocer sesgos y cuestionar decisiones técnicas (ej. evitar pedir datos personales innecesarios en formularios).</p>
        </div>
        <div class="card">
          <h4>Responsabilidad Social</h4>
          <p>Privacidad, inclusión, accesibilidad e impacto ambiental.<br /><strong>Conclusión clave:</strong> Un sistema que funciona técnicamente, pero discrimina usuarios o expone datos privados, <em>no es un sistema de calidad</em>.</p>
        </div>
      </div>
    </section>

    <!-- PRÁCTICAS Y EVALUACIÓN INTEGRAL -->
    <section id="sec-practica" class="section">
      <div class="section-header">
        <h2>Prácticas y Evaluación Integral</h2>
        <label class="done-check"><input type="checkbox" data-module="practica" /> Completado</label>
      </div>

      <div class="interactive-box">
        <h3>Prácticas de Subneteo (1 a 4)</h3>
        <div id="practices-container"></div>
      </div>

      <div class="interactive-box mt-lg">
        <h3>Evaluación de Salida (Soporte TI + Diseño de Software)</h3>
        <div id="quiz-container"></div>
        <div class="quiz-actions mt-md">
          <button id="quiz-submit" class="btn-primary">Calificar Evaluación</button>
          <span id="quiz-score" class="score-badge"></span>
        </div>
      </div>
    </section>

    <!-- APARTADO DE CRÉDITOS -->
    <section id="sec-creditos" class="section">
      <div class="section-header">
        <h2>Créditos del Proyecto</h2>
      </div>

      <div class="hero-card">
        <h3>IPEC de Santo Domingo de Heredia</h3>
        <p>Instituto Profesional de Educación Comunitaria · Desarrollo Web &amp; Soporte TI</p>
        <div class="key-idea">
          <strong>Autores:</strong> Santiago Ramírez &amp; Camila Garay
        </div>
      </div>

      <div class="grid-cards two-cols mt-lg">
        <div class="card">
          <h4>Autores e Institución</h4>
          <ul>
            <li><strong>Integrantes:</strong> Santiago Ramírez y Camila Garay</li>
            <li><strong>Institución:</strong> IPEC de Santo Domingo de Heredia</li>
            <li><strong>Áreas cubiertas:</strong> Soporte TI (Redes y Subneteo IPv4) y Diseño de Software (Calidad del Software)</li>
          </ul>
        </div>
        <div class="card">
          <h4>Día y Hora</h4>
          <ul>
            <li><strong>Fecha actual:</strong> <span id="credits-date">—</span></li>
            <li><strong>Hora actual:</strong> <span id="credits-time">—</span></li>
            <li><strong>Elaboración base:</strong> 17 de noviembre de 2026, 7:07 p. m.</li>
          </ul>
        </div>
      </div>

      <div class="card mt-lg">
        <h4>Fuentes de Material Didáctico</h4>
        <ul>
          <li>IPEC Santo Domingo · <em>Subneteo IPv4: Desde Cero</em></li>
          <li>Cisco Networking Academy · <em>Conceptos Básicos de Redes</em></li>
          <li>Unidad Didáctica · <em>Calidad del Software</em></li>
        </ul>
      </div>
    </section>
  </main>
  </div>

  <script src="/js/data.js"></script>
  <script src="/js/interactive.js"></script>
</body>
</html>

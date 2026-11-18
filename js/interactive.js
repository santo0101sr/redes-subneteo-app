document.addEventListener("DOMContentLoaded", () => {
  const DATA = window.APP_DATA;

  // =========================================================
  // 0. MODO CLARO / OSCURO Y MENÚ LATERAL MÓVIL
  // =========================================================
  const THEME_KEY = "ipec_theme_v1";
  const themeBtn = document.getElementById("theme-toggle");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menu-toggle");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "dark" ? "☀️ Claro" : "🌙 Oscuro";
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(localStorage.getItem(THEME_KEY) || "light");
  themeBtn.addEventListener("click", () => {
    const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  if (menuToggle) {
    menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  // =========================================================
  // 1. SWITCH DE ÁREA (SOPORTE = AZUL | DISEÑO = VERDE)
  // =========================================================
  const areaSwitchBtns = document.querySelectorAll(".area-switch-btn");
  const tabsBar = document.getElementById("tabs-bar");
  const sections = document.querySelectorAll(".section");
  const topbarTitle = document.getElementById("topbar-title");
  const topbarAreaLabel = document.getElementById("topbar-area-label");
  let currentArea = "soporte";

  function goToSection(secId) {
    sections.forEach((sec) => sec.classList.remove("active"));
    const target = document.getElementById(`sec-${secId}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const isActive = btn.dataset.section === secId;
      btn.classList.toggle("active", isActive);
      if (isActive && topbarTitle) topbarTitle.textContent = btn.textContent.trim();
    });
    sidebar.classList.remove("open");
  }

  function renderTabsForArea(area, initialSectionId) {
    currentArea = area;
    document.body.setAttribute("data-active-area", area);
    if (topbarAreaLabel) {
      topbarAreaLabel.textContent = area === "soporte" ? "Área: Soporte TI (Azul)" : "Área: Diseño de Software (Verde)";
    }

    areaSwitchBtns.forEach((b) => {
      const isActive = b.dataset.area === area;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });

    const tabs = DATA.areaTabs[area] || [];
    tabsBar.innerHTML = "";
    tabs.forEach((t, idx) => {
      const btn = document.createElement("button");
      btn.className = `tab-btn ${idx === 0 ? "active" : ""}`;
      btn.dataset.section = t.id;
      btn.textContent = t.label;
      btn.addEventListener("click", () => goToSection(t.id));
      tabsBar.appendChild(btn);
    });

    goToSection(initialSectionId || (tabs[0] && tabs[0].id));
  }

  areaSwitchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.area !== currentArea) {
        renderTabsForArea(btn.dataset.area);
      }
    });
  });

  document.querySelectorAll("[data-goto]").forEach((card) => {
    card.addEventListener("click", () => goToSection(card.dataset.goto));
  });

  renderTabsForArea("soporte", "inicio-soporte");

  const creditsBtn = document.getElementById("credits-btn");
  if (creditsBtn) {
    creditsBtn.addEventListener("click", () => goToSection("creditos"));
  }

  function updateCreditsClock() {
    const dateEl = document.getElementById("credits-date");
    const timeEl = document.getElementById("credits-time");
    if (!dateEl || !timeEl) return;
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("es-CR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    timeEl.textContent = now.toLocaleTimeString("es-CR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  updateCreditsClock();
  setInterval(updateCreditsClock, 1000);

  // =========================================================
  // 2. PROGRESO (localStorage)
  // =========================================================
  const STORAGE_KEY = "ipec_redes_progress_v1";
  const moduleChecks = document.querySelectorAll(".done-check input[data-module]");

  function updateProgressUI() {
    const total = moduleChecks.length;
    const done = Array.from(moduleChecks).filter((c) => c.checked).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById("progress-percent").textContent = `${pct}%`;
    document.getElementById("progress-fill").style.width = `${pct}%`;
  }

  function loadProgress() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    moduleChecks.forEach((chk) => {
      chk.checked = Boolean(saved[chk.dataset.module]);
    });
    updateProgressUI();
  }

  moduleChecks.forEach((chk) => {
    chk.addEventListener("change", () => {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      saved[chk.dataset.module] = chk.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      updateProgressUI();
    });
  });

  document.getElementById("reset-progress").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    moduleChecks.forEach((c) => (c.checked = false));
    updateProgressUI();
  });

  loadProgress();

  // =========================================================
  // 3. FLASHCARDS Y SIMULADOR OSI vs TCP/IP
  // =========================================================
  const flashcardsGrid = document.getElementById("flashcards-grid");
  if (flashcardsGrid && DATA.flashcards) {
    DATA.flashcards.forEach((fc) => {
      const card = document.createElement("div");
      card.className = "flashcard";
      let flipped = false;
      const renderCard = () => {
        card.classList.toggle("flipped", flipped);
        card.innerHTML = flipped
          ? `<div>${fc.back}</div><span class="flashcard-hint">Clic para volver</span>`
          : `<strong>${fc.front}</strong><span class="flashcard-hint">Clic para ver definición</span>`;
      };
      card.addEventListener("click", () => {
        flipped = !flipped;
        renderCard();
      });
      renderCard();
      flashcardsGrid.appendChild(card);
    });
  }

  const osiStack = document.getElementById("osi-stack");
  const osiDetail = document.getElementById("osi-detail");
  DATA.osiLayers.forEach((layer) => {
    const btn = document.createElement("button");
    btn.className = "osi-layer-btn";
    btn.innerHTML = `<span><strong>Capa ${layer.num}:</strong> ${layer.osi}</span><span>PDU: ${layer.pdu}</span>`;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".osi-layer-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      osiDetail.innerHTML = `
        <h4>Capa ${layer.num} · ${layer.osi}</h4>
        <p><strong>Equivalente TCP/IP:</strong> ${layer.tcpip}</p>
        <p><strong>PDU (Unidad de datos):</strong> <code>${layer.pdu}</code></p>
        <p><strong>Función principal:</strong> ${layer.desc}</p>
        <p><strong>En el encapsulamiento:</strong> ${layer.encap}</p>
      `;
    });
    osiStack.appendChild(btn);
  });

  // =========================================================
  // 4. INSPECTOR INTERACTIVO DE IPv4
  // =========================================================
  const ipInput = document.getElementById("ip-inspector-input");
  const ipResult = document.getElementById("ip-inspector-result");

  function analyzeIP(ipStr) {
    const parts = ipStr.trim().split(".");
    if (parts.length !== 4 || parts.some((p) => p === "" || isNaN(p) || +p < 0 || +p > 255)) {
      ipResult.innerHTML = `<span class="feedback-err">Dirección IPv4 inválida. Usa 4 octetos entre 0 y 255.</span>`;
      return;
    }

    const octs = parts.map(Number);
    const [o1, o2] = octs;
    let clase = "";
    let mask = "No aplica";
    let tipo = "Pública (enrutable si está asignada)";

    if (o1 === 0) {
      clase = "Especial (0.0.0.0/8)";
      tipo = "Dirección no especificada / ruta por defecto";
    } else if (o1 >= 1 && o1 <= 126) {
      clase = "Clase A (1–126)";
      mask = "255.0.0.0 (/8)";
      if (o1 === 10) tipo = "Privada RFC 1918 (10.0.0.0/8)";
    } else if (o1 === 127) {
      clase = "Especial (127.0.0.0/8)";
      tipo = "Loopback (pruebas locales del equipo)";
    } else if (o1 >= 128 && o1 <= 191) {
      clase = "Clase B (128–191)";
      mask = "255.255.0.0 (/16)";
      if (o1 === 172 && o2 >= 16 && o2 <= 31) tipo = "Privada RFC 1918 (172.16.0.0/12)";
      else if (o1 === 169 && o2 === 254) tipo = "APIPA / Link-local (169.254.0.0/16, falla DHCP)";
    } else if (o1 >= 192 && o1 <= 223) {
      clase = "Clase C (192–223)";
      mask = "255.255.255.0 (/24)";
      if (o1 === 192 && o2 === 168) tipo = "Privada RFC 1918 (192.168.0.0/16)";
    } else if (o1 >= 224 && o1 <= 239) {
      clase = "Clase D (224–239)";
      tipo = "Multicast (tráfico a grupos)";
    } else {
      clase = "Clase E (240–255)";
      tipo = o1 === 255 && octs.every((x) => x === 255)
        ? "Broadcast limitado (255.255.255.255)"
        : "Reservada / Uso experimental";
    }

    const binStr = octs.map((o) => o.toString(2).padStart(8, "0")).join(".");
    ipResult.innerHTML = `
      <p><strong>Octetos:</strong> ${octs.map((o, i) => `O${i + 1}: <code>${o}</code>`).join(" · ")}</p>
      <p><strong>Binario (32 bits):</strong> <code>${binStr}</code></p>
      <p><strong>Clase histórica:</strong> ${clase} | <strong>Máscara histórica:</strong> ${mask}</p>
      <p><strong>Clasificación:</strong> ${tipo}</p>
    `;
  }

  document.getElementById("ip-inspector-btn").addEventListener("click", () => analyzeIP(ipInput.value));
  document.querySelectorAll("#sec-clases .chip").forEach((c) => {
    c.addEventListener("click", () => {
      ipInput.value = c.dataset.ip;
      analyzeIP(c.dataset.ip);
    });
  });
  analyzeIP(ipInput.value);

  // =========================================================
  // 5. TABLERO BINARIO DE 8 BITS Y EXPLORADOR CIDR
  // =========================================================
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  let bits = [1, 1, 0, 0, 0, 0, 0, 0];
  const bitBoard = document.getElementById("bit-board");
  const decInput = document.getElementById("decimal-input");
  const bitEquation = document.getElementById("bit-equation");

  function renderBits() {
    bitBoard.innerHTML = "";
    let sum = 0;
    const activeWeights = [];

    bits.forEach((b, idx) => {
      if (b === 1) {
        sum += weights[idx];
        activeWeights.push(weights[idx]);
      }
      const cell = document.createElement("div");
      cell.className = `bit-cell ${b ? "on" : ""}`;
      cell.innerHTML = `<span class="bit-weight">${weights[idx]}</span><span class="bit-val">${b}</span>`;
      cell.addEventListener("click", () => {
        bits[idx] = bits[idx] ? 0 : 1;
        renderBits();
      });
      bitBoard.appendChild(cell);
    });

    decInput.value = sum;
    bitEquation.textContent = activeWeights.length ? `${activeWeights.join(" + ")} = ${sum}` : "0 = 0";
  }

  function setDecimal(val) {
    const n = Math.max(0, Math.min(255, parseInt(val, 10) || 0));
    bits = n.toString(2).padStart(8, "0").split("").map(Number);
    renderBits();
  }

  decInput.addEventListener("input", () => setDecimal(decInput.value));
  document.querySelectorAll(".bit-preset").forEach((btn) => {
    btn.addEventListener("click", () => setDecimal(btn.dataset.val));
  });
  renderBits();

  const cidrSlider = document.getElementById("cidr-slider");
  const cidrDisplay = document.getElementById("cidr-display");
  const cidrResult = document.getElementById("cidr-result");

  function renderCIDR(prefix) {
    cidrDisplay.textContent = `/${prefix}`;
    const hostBits = 32 - prefix;
    const lastOctetVal = 256 - Math.pow(2, 8 - (prefix - 24));
    const totalDirs = Math.pow(2, hostBits);
    const usableHosts = totalDirs - 2;
    const salto = 256 - lastOctetVal;

    cidrResult.innerHTML = `
      <p><strong>Máscara decimal:</strong> <code>255.255.255.${lastOctetVal}</code></p>
      <p><strong>Bits de red:</strong> ${prefix} | <strong>Bits de host:</strong> 32 − ${prefix} = ${hostBits}</p>
      <p><strong>Salto en el 4.º octeto:</strong> 256 − ${lastOctetVal} = ${salto}</p>
      <p><strong>Hosts utilizables:</strong> 2<sup>${hostBits}</sup> − 2 = <strong>${usableHosts}</strong> (de ${totalDirs} direcciones totales)</p>
    `;
  }

  cidrSlider.addEventListener("input", () => renderCIDR(Number(cidrSlider.value)));
  renderCIDR(Number(cidrSlider.value));

  // =========================================================
  // 6. CALCULADORA DE SUBNETEO (6 PASOS) + BARRA VISUAL
  // =========================================================
  const subIp = document.getElementById("sub-ip");
  const subPrefix = document.getElementById("sub-prefix");
  const subMode = document.getElementById("sub-mode");
  const subTarget = document.getElementById("sub-target");
  const subTargetLabel = document.getElementById("sub-target-label");
  const visualBar = document.getElementById("subnet-visual-bar");
  const stepsContainer = document.getElementById("subnet-steps");
  const tableWrap = document.getElementById("subnet-table-wrap");

  subMode.addEventListener("change", () => {
    subTargetLabel.textContent =
      subMode.value === "subnets" ? "Subredes requeridas" : "Hosts necesarios por subred";
  });

  function ipToInt(octs) {
    return ((octs[0] << 24) >>> 0) + (octs[1] << 16) + (octs[2] << 8) + octs[3];
  }

  function intToIp(intVal) {
    return [(intVal >>> 24) & 255, (intVal >>> 16) & 255, (intVal >>> 8) & 255, intVal & 255].join(".");
  }

  function prefixToMaskInt(prefix) {
    return prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  }

  function calculateSubnetting() {
    const parts = subIp.value.trim().split(".").map(Number);
    if (parts.length !== 4 || parts.some((n) => isNaN(n) || n < 0 || n > 255)) {
      stepsContainer.innerHTML = `<div class="step-box feedback-err">IP inicial inválida.</div>`;
      visualBar.innerHTML = "";
      tableWrap.innerHTML = "";
      return;
    }

    const basePrefix = Number(subPrefix.value);
    const target = Math.max(1, Number(subTarget.value) || 1);
    const mode = subMode.value;
    const baseHostBits = 32 - basePrefix;

    let borrowedBits = 0;
    let newPrefix = basePrefix;

    if (mode === "subnets") {
      while (Math.pow(2, borrowedBits) < target) borrowedBits++;
      newPrefix = basePrefix + borrowedBits;
    } else {
      let neededHostBits = 2;
      while (Math.pow(2, neededHostBits) - 2 < target) neededHostBits++;
      newPrefix = 32 - neededHostBits;
      borrowedBits = newPrefix - basePrefix;
    }

    if (newPrefix > 30 || borrowedBits < 0) {
      stepsContainer.innerHTML = `<div class="step-box feedback-err">No es posible dividir /${basePrefix} con ese requerimiento (prefijo /${newPrefix} fuera de rango /8–/30).</div>`;
      visualBar.innerHTML = "";
      tableWrap.innerHTML = "";
      return;
    }

    const newHostBits = 32 - newPrefix;
    const totalSubnets = Math.pow(2, borrowedBits);
    const blockSize = Math.pow(2, newHostBits);
    const usableHosts = blockSize - 2;
    const maskStr = intToIp(prefixToMaskInt(newPrefix));
    const maskOcts = maskStr.split(".").map(Number);
    const jumpOctetIdx = Math.min(3, Math.floor((newPrefix - 1) / 8));
    const jumpValue = 256 - maskOcts[jumpOctetIdx];
    const networkBaseInt = (ipToInt(parts) & prefixToMaskInt(basePrefix)) >>> 0;

    stepsContainer.innerHTML = `
      <div class="step-box"><strong>PASO 1. Bloque inicial</strong>${intToIp(networkBaseInt)}/${basePrefix} (${baseHostBits} bits de host)</div>
      <div class="step-box"><strong>PASO 2. Bits prestados</strong>${borrowedBits} bit(s) → ${totalSubnets} subredes</div>
      <div class="step-box"><strong>PASO 3. Nuevo prefijo</strong>/${newPrefix} → <code>${maskStr}</code></div>
      <div class="step-box"><strong>PASO 4. Salto de red</strong>256 − ${maskOcts[jumpOctetIdx]} = <strong>${jumpValue}</strong> (${jumpOctetIdx + 1}.º octeto)</div>
      <div class="step-box"><strong>PASO 5. Direcciones/subred</strong>${blockSize} direcciones totales</div>
      <div class="step-box"><strong>PASO 6. Hosts utilizables</strong>2<sup>${newHostBits}</sup> − 2 = <strong>${usableHosts}</strong> hosts</div>
    `;

    // Barra visual proporcional (hasta 8 bloques visibles)
    const maxVisual = Math.min(totalSubnets, 8);
    let visualHtml = "";
    for (let i = 0; i < maxVisual; i++) {
      const netInt = (networkBaseInt + i * blockSize) >>> 0;
      const bcastInt = (netInt + blockSize - 1) >>> 0;
      visualHtml += `
        <div class="subnet-block">
          <strong>Subred ${i + 1}</strong><br />
          <code>${intToIp(netInt)}</code><br />
          <small>hasta ${intToIp(bcastInt)}</small>
        </div>
      `;
    }
    visualBar.innerHTML = visualHtml;

    const maxRows = Math.min(totalSubnets, 32);
    let rowsHtml = "";
    for (let i = 0; i < maxRows; i++) {
      const netInt = (networkBaseInt + i * blockSize) >>> 0;
      const bcastInt = (netInt + blockSize - 1) >>> 0;
      rowsHtml += `
        <tr>
          <td>Subred ${i + 1}</td>
          <td><code>${intToIp(netInt)}/${newPrefix}</code></td>
          <td><code>${intToIp((netInt + 1) >>> 0)}</code> – <code>${intToIp((bcastInt - 1) >>> 0)}</code></td>
          <td><code>${intToIp(bcastInt)}</code></td>
        </tr>
      `;
    }

    tableWrap.innerHTML = `
      <table>
        <thead><tr><th>#</th><th>Red</th><th>Hosts Utilizables</th><th>Broadcast</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  document.getElementById("sub-calc-btn").addEventListener("click", calculateSubnetting);
  document.querySelectorAll(".sub-preset").forEach((btn) => {
    btn.addEventListener("click", () => {
      subIp.value = btn.dataset.ip;
      subPrefix.value = btn.dataset.pre;
      subMode.value = btn.dataset.mode;
      subTarget.value = btn.dataset.val;
      subTargetLabel.textContent =
        subMode.value === "subnets" ? "Subredes requeridas" : "Hosts necesarios por subred";
      calculateSubnetting();
    });
  });
  calculateSubnetting();

  // =========================================================
  // 7. CONSOLA CISCO IOS
  // =========================================================
  const iosOutput = document.getElementById("ios-output");
  const iosPrompt = document.getElementById("ios-prompt");
  const iosInput = document.getElementById("ios-input");
  let iosMode = "user";
  let g01Up = false;

  function updatePrompt() {
    const prompts = { user: "Switch>", priv: "Switch#", config: "Switch(config)#", if: "Switch(config-if)#" };
    iosPrompt.textContent = prompts[iosMode];
  }

  function printIOS(text) {
    const line = document.createElement("div");
    line.textContent = text;
    iosOutput.appendChild(line);
    iosOutput.scrollTop = iosOutput.scrollHeight;
  }

  function runIOSCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;
    printIOS(`${iosPrompt.textContent} ${cmd}`);
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      printIOS("Comandos: enable, configure terminal, interface g0/1, no shutdown, exit, show ip interface brief, copy running-config startup-config, ping <ip>, clear");
    } else if (lower === "clear") {
      iosOutput.innerHTML = "";
    } else if (lower === "enable" && iosMode === "user") {
      iosMode = "priv";
    } else if ((lower === "configure terminal" || lower === "conf t") && iosMode === "priv") {
      iosMode = "config";
    } else if (lower === "interface g0/1" && iosMode === "config") {
      iosMode = "if";
    } else if (lower === "no shutdown" && iosMode === "if") {
      g01Up = true;
      printIOS("%LINK-5-CHANGED: Interface GigabitEthernet0/1, changed state to up");
    } else if (lower === "exit") {
      if (iosMode === "if") iosMode = "config";
      else if (iosMode === "config") iosMode = "priv";
      else if (iosMode === "priv") iosMode = "user";
    } else if (lower === "show ip interface brief" && iosMode !== "user") {
      printIOS("Interface              IP-Address      OK? Method Status                Protocol");
      printIOS(`GigabitEthernet0/1     192.168.1.2     YES manual ${g01Up ? "up                    up" : "administratively down down"}`);
      printIOS("Vlan1                  192.168.1.1     YES manual up                    up");
    } else if (lower === "copy running-config startup-config" && iosMode === "priv") {
      printIOS("Destination filename [startup-config]? [OK]");
    } else if (lower.startsWith("ping ")) {
      const target = cmd.split(/\s+/)[1] || "192.168.1.1";
      printIOS(`Sending 5, 100-byte ICMP Echos to ${target}: !!!!! (Success rate is 100%)`);
    } else {
      printIOS("% Invalid input or wrong mode. Usa 'help' o 'enable -> configure terminal'.");
    }
    updatePrompt();
  }

  iosInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      runIOSCommand(iosInput.value);
      iosInput.value = "";
    }
  });

  document.querySelectorAll(".ios-cmd").forEach((btn) => {
    btn.addEventListener("click", () => runIOSCommand(btn.dataset.cmd));
  });

  // =========================================================
  // 8. DISEÑO DE SOFTWARE: CALIDAD DEL SOFTWARE
  // =========================================================
  // Pirámide de Pruebas
  const pyrBtns = document.querySelectorAll(".pyramid-level");
  const pyrDetail = document.getElementById("pyramid-detail");
  if (pyrDetail && DATA.pyramidLevels) {
    pyrDetail.textContent = DATA.pyramidLevels.unitarias;
    pyrBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        pyrBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        pyrDetail.textContent = DATA.pyramidLevels[btn.dataset.pyr];
      });
    });
  }

  // Explorador ISO/IEC 25010
  const factorChips = document.getElementById("quality-factor-chips");
  const factorDetail = document.getElementById("quality-factor-detail");
  if (factorChips && DATA.qualityFactors) {
    DATA.qualityFactors.forEach((f, idx) => {
      const chip = document.createElement("button");
      chip.className = `chip ${idx === 0 ? "active" : ""}`;
      chip.textContent = f.name;
      chip.addEventListener("click", () => {
        factorChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        factorDetail.innerHTML = `<strong>${f.name}:</strong> ${f.summary}`;
      });
      factorChips.appendChild(chip);
      if (idx === 0) factorDetail.innerHTML = `<strong>${f.name}:</strong> ${f.summary}`;
    });
  }

  // Ciclo continuo de QA
  const qaBtns = document.querySelectorAll(".qa-step-btn");
  const qaDetail = document.getElementById("qa-cycle-detail");
  if (qaDetail && DATA.qaCycleSteps) {
    qaDetail.textContent = DATA.qaCycleSteps.planificar;
    qaBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        qaBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        qaDetail.textContent = DATA.qaCycleSteps[btn.dataset.qa];
      });
    });
  }

  // Calculadora de Métricas
  function calcQualityMetrics() {
    const defects = Math.max(0, Number(document.getElementById("m-defects").value) || 0);
    const kloc = Math.max(0.1, Number(document.getElementById("m-kloc").value) || 1);
    const reopened = Math.max(0, Number(document.getElementById("m-reopened").value) || 0);
    const closed = Math.max(1, Number(document.getElementById("m-closed").value) || 1);
    const passed = Math.max(0, Number(document.getElementById("m-passed").value) || 0);
    const exec = Math.max(1, Number(document.getElementById("m-exec").value) || 1);

    document.getElementById("metrics-result").innerHTML = `
      <div class="step-box"><strong>Densidad de defectos</strong>${(defects / kloc).toFixed(2)} defectos / KLOC</div>
      <div class="step-box"><strong>Tasa de reapertura</strong>${((reopened / closed) * 100).toFixed(1)}% (${reopened}/${closed})</div>
      <div class="step-box"><strong>Tasa de aprobación</strong>${((passed / exec) * 100).toFixed(1)}% (${passed}/${exec})</div>
    `;
  }

  const calcMetricsBtn = document.getElementById("calc-metrics-btn");
  if (calcMetricsBtn) {
    calcMetricsBtn.addEventListener("click", calcQualityMetrics);
    calcQualityMetrics();
  }

  // Evaluador de Matriz de Riesgos
  function calcRisk() {
    const p = Math.min(5, Math.max(1, Number(document.getElementById("risk-prob").value) || 1));
    const i = Math.min(5, Math.max(1, Number(document.getElementById("risk-imp").value) || 1));
    const score = p * i;
    let level = "Bajo", cls = "feedback-ok", action = "Monitoreo rutinario.";
    if (score >= 15) {
      level = "Crítico / Alto"; cls = "feedback-err"; action = "Requiere medida preventiva inmediata y plan de recuperación.";
    } else if (score >= 8) {
      level = "Medio"; cls = "feedback-warn"; action = "Definir mitigación y seguimiento en revisiones.";
    }
    document.getElementById("risk-result").innerHTML =
      `<strong>Nivel de riesgo:</strong> <span class="${cls}">${score} / 25 (${level})</span> — ${action}`;
  }

  const riskCalcBtn = document.getElementById("risk-calc-btn");
  if (riskCalcBtn) {
    riskCalcBtn.addEventListener("click", calcRisk);
    calcRisk();
  }

  // =========================================================
  // 9. PRÁCTICAS Y QUIZ
  // =========================================================
  const practicesContainer = document.getElementById("practices-container");
  DATA.practices.forEach((p) => {
    const div = document.createElement("div");
    div.className = "practice-item";
    div.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.prompt}</p>
      <div class="input-row">
        <input type="text" id="input-${p.id}" placeholder="${p.placeholder}" />
        <button class="btn-primary" id="btn-${p.id}">Comprobar</button>
        <button class="chip" id="sol-${p.id}">Ver solución</button>
      </div>
      <div id="fb-${p.id}" class="mt-md"></div>
    `;
    practicesContainer.appendChild(div);

    document.getElementById(`btn-${p.id}`).addEventListener("click", () => {
      const val = document.getElementById(`input-${p.id}`).value;
      const fb = document.getElementById(`fb-${p.id}`);
      fb.innerHTML = p.check(val)
        ? `<span class="feedback-ok">✔ ¡Correcto!</span> ${p.solution}`
        : `<span class="feedback-err">✘ Revisa tu cálculo o haz clic en "Ver solución".</span>`;
    });

    document.getElementById(`sol-${p.id}`).addEventListener("click", () => {
      document.getElementById(`fb-${p.id}`).innerHTML = `<strong>Solución:</strong> ${p.solution}`;
    });
  });

  const quizContainer = document.getElementById("quiz-container");
  DATA.quizQuestions.forEach((item, qIdx) => {
    const div = document.createElement("div");
    div.className = "quiz-item";
    const optsHtml = item.options
      .map((opt, oIdx) => `<label><input type="radio" name="q-${qIdx}" value="${oIdx}" /> ${opt}</label>`)
      .join("");
    div.innerHTML = `<strong>${item.q}</strong><div class="quiz-options">${optsHtml}</div><div id="qfb-${qIdx}" class="mt-md"></div>`;
    quizContainer.appendChild(div);
  });

  document.getElementById("quiz-submit").addEventListener("click", () => {
    let score = 0;
    DATA.quizQuestions.forEach((item, qIdx) => {
      const selected = document.querySelector(`input[name="q-${qIdx}"]:checked`);
      const fb = document.getElementById(`qfb-${qIdx}`);
      if (selected && Number(selected.value) === item.answer) {
        score++;
        fb.innerHTML = `<span class="feedback-ok">✔ Correcto</span>`;
      } else {
        fb.innerHTML = `<span class="feedback-err">✘ Respuesta correcta: ${item.options[item.answer]}</span>`;
      }
    });
    document.getElementById("quiz-score").textContent = `Puntaje: ${score} / ${DATA.quizQuestions.length}`;
  });
});

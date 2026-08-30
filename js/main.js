/**
 * Fortnite Rewards - Logic
 * Strategic flow to maximize ad impressions and engagement
 */

(function() {
    "use strict";

    // --- Configuration ---
    const MOCK_CODES = [
        { code: "FN-BATTLE-2026", prize: "Skins pack (Limitado)" },
        { code: "VBUCKS-FREE-99", prize: "500 Pavos" },
        { code: "FORT-GLOW-UP", prize: "Accesorio de Espalda" },
        { code: "EPIC-WINNER-X", prize: "Gesto de Victoria" }
    ];

    const LOADING_MESSAGES = [
        "Accediendo a la API de Epic Games...",
        "Validando hash del código...",
        "Comprobando disponibilidad regional...",
        "Sincronizando con el servidor de recompensas...",
        "Generando token de canje..."
    ];

    // --- State ---
    const state = {
        platform: null,
        region: null,
        currentStep: 1
    };

    // --- DOM Elements ---
    const elements = {
        steps: document.querySelectorAll(".step-container"),
        options: document.querySelectorAll(".option-card"),
        codeInput: document.getElementById("code-input"),
        btnVerify: document.getElementById("btn-verify"),
        loadingZone: document.getElementById("loading-zone"),
        progressFill: document.getElementById("progress-fill"),
        loadingText: document.getElementById("loading-text"),
        verifyResult: document.getElementById("verify-result"),
        resultAd: document.getElementById("result-ad"),
        codeList: document.getElementById("code-list")
    };

    // --- Core Logic ---

    function showStep(stepNumber) {
        elements.steps.forEach(step => step.classList.remove("active"));
        document.getElementById(`step-${stepNumber}`).classList.add("active");
        state.currentStep = stepNumber;
        window.scrollTo(0, 0);
    }

    function handleOptionClick(e) {
        const card = e.currentTarget;
        const val = card.dataset.val;

        // Highlight selection
        const parent = card.parentElement;
        parent.querySelectorAll(".option-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");

        // Set state
        if (state.currentStep === 1) state.platform = val;
        if (state.currentStep === 2) state.region = val;

        // Advance step after a short delay (feels more natural)
        setTimeout(() => {
            if (state.currentStep < 3) {
                showStep(state.currentStep + 1);
            }
        }, 400);
    }

    async function verifyCode() {
        const code = elements.codeInput.value.trim();
        if (!code) {
            alert("Por favor, introduce un código válido.");
            return;
        }

        // UI Reset
        elements.verifyResult.classList.add("hidden");
        elements.resultAd.classList.add("hidden");
        elements.loadingZone.style.display = "block";
        elements.btnVerify.disabled = true;

        // Simulation Loop
        let progress = 0;
        let msgIndex = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 5;
            if (progress > 100) progress = 100;

            elements.progressFill.style.width = `${progress}%`;

            if (progress > (100 / LOADING_MESSAGES.length) * msgIndex) {
                elements.loadingText.innerText = LOADING_MESSAGES[msgIndex];
                msgIndex++;
            }

            if (progress === 100) {
                clearInterval(interval);
                finalizeVerification(code);
            }
        }, 100);
    }

    function finalizeVerification(code) {
        elements.loadingZone.style.display = "none";
        elements.btnVerify.disabled = false;
        elements.verifyResult.classList.remove("hidden");

        // Show the result ad (Key monetization point!)
        elements.resultAd.classList.remove("hidden");

        // Simulate a random result (most are "inactive" to encourage more searches)
        const isSuccess = Math.random() > 0.8;

        if (isSuccess) {
            elements.verifyResult.innerHTML = `
                <div style="color: #4ade80;">
                    ✅ ¡CÓDIGO ACTIVO! <br>
                    <span style="font-size: 0.9rem; color: var(--text-muted);">Canjéalo ahora mismo en la web oficial de Epic Games.</span>
                </div>`;
        } else {
            elements.verifyResult.innerHTML = `
                <div style="color: #f87171;">
                    ❌ CÓDIGO EXPIRADO O INVÁLIDO <br>
                    <span style="font-size: 0.9rem; color: var(--text-muted);">Prueba con uno de los códigos de la lista inferior.</span>
                </div>`;
        }
    }

    function renderCodeList() {
        elements.codeList.innerHTML = "";
        MOCK_CODES.forEach(item => {
            const div = document.createElement("div");
            div.className = "code-item";
            div.innerHTML = `
                <div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${item.prize}</div>
                    <div class="code-value">${item.code}</div>
                </div>
                <button class="btn-copy">Copiar</button>
            `;

            div.querySelector(".btn-copy").onclick = () => {
                navigator.clipboard.writeText(item.code);
                div.querySelector(".btn-copy").innerText = "¡Copiado!";
                setTimeout(() => div.querySelector(".btn-copy").innerText = "Copiar", 2000);
            };

            elements.codeList.appendChild(div);
        });
    }

    // --- Initialization ---
    function init() {
        elements.options.forEach(opt => opt.addEventListener("click", handleOptionClick));
        elements.btnVerify.addEventListener("click", verifyCode);

        renderCodeList();
    }

    window.addEventListener("DOMContentLoaded", init);
})();

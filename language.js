/* =========================
   WALLETWISE LANGUAGE + CURRENCY
   English = GBP | Romanian = RON
========================= */

(function () {
    "use strict";

    const LANGUAGE_KEY = "walletWiseLanguage";
    const RATE_KEY = "walletWiseGBPtoRONRate";
    const RATE_DATE_KEY = "walletWiseExchangeRateDate";

    let language = localStorage.getItem(LANGUAGE_KEY) || "en";
    let gbpToRonRate = Number(localStorage.getItem(RATE_KEY)) || 0;
    let rateDate = localStorage.getItem(RATE_DATE_KEY) || "";

    const translations = {
        "This will update your balance and spending totals.": "Acest lucru îți va actualiza soldul și totalul cheltuielilor.",
        "Manage your money, one day at a time.": "GESTIONEAZĂ-ȚI BANII, ZI DE ZI.",
        "Welcome back": "BINE AI REVENIT",
        "Log in to manage your money.": "Autentifică-te pentru a-ți gestiona banii.",
        "Email address": "Adresă de e-mail",
        "Enter your full name": "Introdu numele complet",
        "Email Address": "Adresă de e-mail",
        "Create a password": "Creează o parolă",
        "Enter your password again": "Introdu parola din nou",
        "Enter your email": "Introdu adresa de e-mail",
        "Start your journey with WalletWise": "Începe-ți viața cu WalletWise" ,
        "Enter your password": "Introdu parola",
        "Log In": "Autentificare",
        "LOGIN": "AUTENTIFICARE",
        "Sign up": "Creează cont",
        "Don't have an account?": "Nu ai un cont?",
        "Password": "Parolă",
        "Welcome Back": "Bine ai revenit",
        "Create Account": "Creează un cont",
        "Sign Up": "Înregistrează-te",
        "Log In": "Autentificare",
        "Logout": "Deconectare",
        "Log Out": "Deconectare",
        "Name": "Nume",
        "Full Name": "Numele complet",
        "Email": "E-mail",
        "Password": "Parolă",
        "Confirm Password": "Confirmă parola",
        "Don't have an account?": "Nu ai un cont?",
        "Already have an account?": "Ai deja un cont?",
        "Dashboard": "Panou de control",
        "Welcome to WalletWise": "Bine ai venit la WalletWise",
        "Welcome to your personal finance space.": "Bine ai venit in spațiul tău financiar",
        "Available Balance": "Soldul valabil",
        "Your Dashboard": "Panoul tău de control",
        "Your Balance": "Soldul tău",
        "Monthly Budget": "Buget lunar",
        "See how your expenses are divided between categories.": "Vezi cum sunt împărțite cheltuielile tale pe categorii.",
        "Add an expense to start tracking your spending.": "Adaugă o cheltuială pentru a începe să-ți urmărești cheltuielile.",
        "Filter by category": "Filtrează după categorie",
        "Monthly budget (£)": "Buget lunar (RON)",
        "Save Budget":"Salvează-ți bugetul",
        "of recorded expenses": "a cheltuielilor înregistrate",
        "Money spent": "Bani cheltuiți",
        "jan":"ian",
        "may":"mai",
        "jun":"iun",
        "jul":"iul",
        "nov":"noi",
        "No transactions found in this category.":"Nu au fost găsite tranzacții în această categorie.",
        "Not set":"Nesetat",
        "Bills":"Facturi",
        "Groceries":"Produse alimentare",
        "Entertainment":"Divertisment",
        "Shopping":"Cumpărături",
        "Health":"Sănătate",
        "Salary":"Salariu",
        "Gift":"Cadou",
        "Other":"Altele",
        "Education":"Educație",
        "e.g. Weekly groceries": "de ex. Cumpărăturile săptămânale",
        "Amount (£)": "Sumă (RON)",
        "Transaction type": "Tip de tranzacție",
        "Add Transaction": "Adaugă tranzacție",
        "Enter your budget": "Introdu-ți budgetul",
        "Total Spent": "Total cheltuit",
        "Enter amount": "Introdu o sumă",
        "Spending by Category": "Cheltuieli pe categorii",
        "Transaction History": "Istoricul tranzacțiilor",
        "Set Your Monthly Budget": "Setează bugetul lunar",
        "Add a Transaction": "Adaugă o tranzacție",
        "Set Budget": "Setează bugetul",
        "Transaction Name": "Numele tranzacției",
        "Description": "Descriere",
        "Amount": "Sumă",
        "Category": "Categorie",
        "Type": "Tip",
        "Expense": "Cheltuială",
        "Income": "Venit",
        "Money received": "Bani primiți",
        "Money spent": "Bani cheltuiți",
        "Groceries": "Cumpărături alimentare",
        "Transport": "Transport",
        "Bills": "Facturi",
        "Entertainment": "Divertisment",
        "Shopping": "Cumpărături",
        "Health": "Sănătate",
        "Education": "Educație",
        "Salary": "Salariu",
        "Gift": "Cadou",
        "Other": "Altele",
        "All categories": "Toate categoriile",
        "All": "Toate",
        "Delete": "Șterge",
        "Not set": "Nesetat",
        "No transactions yet. Add your first transaction to get started!":
            "Nu există încă tranzacții. Adaugă prima tranzacție pentru a începe!",
        "No transactions found in this category.":
            "Nu s-au găsit tranzacții în această categorie.",
        "No spending recorded yet.": "Nu există încă cheltuieli înregistrate.",
        "Date not recorded": "Dată neînregistrată",
        "Save": "Salvează",
        "Cancel": "Anulează",
        "Language": "Limbă",
        "Currency": "Monedă",
        "English": "Engleză",
        "Romanian": "Română",
        "Forgot password?": "",
        "Reset your password": "",
        "Enter your email to recieve a password reset link.":"",
        "Email address":"",
        "Enter your email":"",
        "Send reset link":"",
        "New password":"",
        "Enter a new password":"",
        "Update password":"",
        "Back to login":"",
        "":"",
        "Exchange rate": "Curs de schimb",
        "Loading exchange rate…": "Se încarcă rata de schimb…",
        "Exchange rate unavailable": "Curs de schimb indisponibil",
        "Passwords do not match. Please try again!":
            "Parolele nu coincid. Încearcă din nou!",
        "Demo account created! You can now log in.":
            "Contul demonstrativ a fost creat! Acum te poți autentifica.",
        "Please enter a transaction description.":
            "Introdu o descriere a tranzacției.",
        "Please enter an amount greater than £0.":
            "Introdu o sumă mai mare decât 0.",
        "Please enter a monthly budget greater than £0.":
            "Introdu un buget lunar mai mare decât 0.",
        "Your monthly budget has been saved!":
            "Bugetul lunar a fost salvat!",
        "Money received added successfully!":
            "Venitul a fost adăugat cu succes!",
        "Expense added successfully!":
            "Cheltuiala a fost adăugată cu succes!"
    };

    function translateText(text) {
        const trimmed = text.trim();
        if (!trimmed) return text;

        if (language === "en") return text;

        if (translations[trimmed]) {
            return text.replace(trimmed, translations[trimmed]);
        }

        // Translate common labels inside dynamic transaction descriptions.
        let result = text;
        const phrases = [
            ["Money received", "Bani primiți"],
            ["Money spent", "Bani cheltuiți"],
            ["of monthly budget", "din bugetul lunar"],
            ["of recorded expenses", "din cheltuielile înregistrate"],
            ["No transactions yet.", "Nu există încă tranzacții."],
            ["Add your first transaction to get started!",
                "Adaugă prima tranzacție pentru a începe!"]
        ];

        for (const [english, romanian] of phrases) {
            result = result.replaceAll(english, romanian);
        }

        return result;
    }

    function translatePage() {
        document.documentElement.lang = language === "ro" ? "ro" : "en";

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            if (!node.parentElement.closest("script, style, .language-control")) {
                const original = node.nodeValue;
                const englishText = node.dataset?.englishText;

                // Keep the original English text so switching back works.
                if (!node.__walletWiseEnglish) {
                    node.__walletWiseEnglish = original;
                }

                const source = node.__walletWiseEnglish;
                node.nodeValue = language === "en"
                    ? source
                    : translateText(source);
            }
        });

        document.querySelectorAll("input[placeholder], textarea[placeholder]")
            .forEach(function (element) {
                if (!element.dataset.englishPlaceholder) {
                    element.dataset.englishPlaceholder = element.placeholder;
                }

                element.placeholder = language === "en"
                    ? element.dataset.englishPlaceholder
                    : translateText(element.dataset.englishPlaceholder);
            });

        document.querySelectorAll("[aria-label]").forEach(function (element) {
            if (!element.dataset.englishAriaLabel) {
                element.dataset.englishAriaLabel = element.getAttribute("aria-label");
            }

            element.setAttribute(
                "aria-label",
                language === "en"
                    ? element.dataset.englishAriaLabel
                    : translateText(element.dataset.englishAriaLabel)
            );
        });

        const selector = document.getElementById("walletwise-language");
        if (selector) selector.value = language;

        updateCurrencyNote();
    }

    function formatMoney(amount) {
        const numericAmount = Number(amount) || 0;
        const isRomanian = language === "ro";

        const displayedAmount = isRomanian
            ? numericAmount * (gbpToRonRate || 1)
            : numericAmount;

        return new Intl.NumberFormat(
            isRomanian ? "ro-RO" : "en-GB",
            {
                style: "currency",
                currency: isRomanian ? "RON" : "GBP"
            }
        ).format(displayedAmount);
    }

    // Form amounts are entered in the currency currently selected.
    // The website stores every amount internally in GBP.
    function toBaseGBP(amount) {
        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount)) return NaN;

        if (language === "ro") {
            if (!gbpToRonRate) {
                throw new Error("The RON exchange rate has not loaded yet.");
            }
            return numericAmount / gbpToRonRate;
        }

        return numericAmount;
    }

    function updateCurrencyNote() {
        const note = document.getElementById("walletwise-currency-note");
        if (!note) return;

        if (!gbpToRonRate) {
            note.textContent = language === "ro"
                ? "Se încarcă rata de schimb GBP–RON…"
                : "Loading GBP–RON exchange rate…";
            return;
        }

        note.textContent = language === "ro"
            ? `1 GBP = ${gbpToRonRate.toFixed(4)} RON · Rata: ${rateDate || "ultima disponibilă"}`
            : `1 GBP = ${gbpToRonRate.toFixed(4)} RON · Rate date: ${rateDate || "latest available"}`;
    }

    async function loadExchangeRate() {
        try {
            // Frankfurter provides daily reference exchange rates.
            const response = await fetch(
                "https://api.frankfurter.dev/v1/latest?base=GBP&symbols=RON"
            );

            if (!response.ok) throw new Error("Exchange rate request failed.");

            const data = await response.json();
            const rate = Number(data.rates && data.rates.RON);

            if (!Number.isFinite(rate) || rate <= 0) {
                throw new Error("Invalid exchange rate.");
            }

            gbpToRonRate = rate;
            rateDate = data.date || "";

            localStorage.setItem(RATE_KEY, String(gbpToRonRate));
            localStorage.setItem(RATE_DATE_KEY, rateDate);

            updateCurrencyNote();
            window.dispatchEvent(new CustomEvent("walletwise:currencychange"));
        } catch (error) {
            console.warn("WalletWise could not refresh the exchange rate.", error);
            updateCurrencyNote();
        }
    }

    function setLanguage(nextLanguage) {
        language = nextLanguage === "ro" ? "ro" : "en";
        localStorage.setItem(LANGUAGE_KEY, language);
        translatePage();
        window.dispatchEvent(new CustomEvent("walletwise:currencychange"));
    }

    function addLanguageControl() {
        if (document.getElementById("walletwise-language")) return;

        const control = document.createElement("div");
        control.className = "language-control";
        control.innerHTML = `
            <label for="walletwise-language">Language / Limbă</label>
            <select id="walletwise-language">
                <option value="en">English · GBP (£)</option>
                <option value="ro">Română · RON (lei)</option>
            </select>
            <small id="walletwise-currency-note" aria-live="polite"></small>
        `;

        // Keep the selector visible without changing the page layout.
        Object.assign(control.style, {
            position: "fixed",
            top: "12px",
            right: "12px",
            zIndex: "9999",
            width: "min(220px, calc(100vw - 24px))",
            padding: "10px",
            background: "#FFFDFA",
            border: "1px solid #DDD5C8",
            borderRadius: "10px",
            boxShadow: "0 4px 14px rgba(60, 50, 35, 0.08)",
            color: "#63553c",
            fontFamily: "Lato, sans-serif"
        });

        const label = control.querySelector("label");
        Object.assign(label.style, {
            display: "block",
            marginBottom: "5px",
            color: "#706246",
            fontSize: "12px",
            fontWeight: "700"
        });

        const select = control.querySelector("select");
        Object.assign(select.style, {
            width: "100%",
            padding: "7px",
            border: "1px solid #DDD5C8",
            borderRadius: "6px",
            background: "#F5F0E8",
            color: "#63553c"
        });

        const note = control.querySelector("small");
        Object.assign(note.style, {
            display: "block",
            marginTop: "5px",
            fontSize: "10px",
            lineHeight: "1.4"
        });

        document.body.appendChild(control);

        select.value = language;
        select.addEventListener("change", function () {
            setLanguage(select.value);
        });
    }

    window.WalletWiseI18n = {
        formatMoney,
        toBaseGBP,
        getLanguage: () => language,
        getRate: () => gbpToRonRate,
        setLanguage,
        translateText
    };

    document.addEventListener("DOMContentLoaded", function () {
        addLanguageControl();
        translatePage();
        loadExchangeRate();

    });
})();

const originalWalletWiseAlert = window.alert.bind(window);
window.alert = function (message) {
    const translated = window.WalletWiseI18n
        ? window.WalletWiseI18n.translateText(String(message))
        : String(message);

    originalWalletWiseAlert(translated);
};

const originalWalletWiseConfirm = window.confirm.bind(window);
window.confirm = function (message) {
    const translated = window.WalletWiseI18n
        ? window.WalletWiseI18n.translateText(String(message))
        : String(message);

    return originalWalletWiseConfirm(translated);
};
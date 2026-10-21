/* =========================
   ACCOUNT CREATION
========================= */

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!name || !email || !password) {
            alert("Please complete all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again!");
            return;
        }

        if (password.length < 8) {
            alert("Your password must be at least 8 characters long.");
            return;
        }

        if (!window.supabase || !window.supabaseClient) {
            alert("Connection error. Please check your Supabase setup.");
            return;
        }

        const submitButton = signupForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) submitButton.disabled = true;

        try {
            const { data, error } =
                await window.supabaseClient.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        emailRedirectTo:
                            "https://alexandrabanciu11.github.io/wallet-wise/",
                        data: {
                            full_name: name
                        }
                    }
                });

            if (error) throw error;

            if (data.session) {
                alert("Account created successfully! You can now use WalletWise.");
                window.location.href = "dashboard.html";
            } else {
                alert(
                    "Account created! Please check your email to confirm your account, then log in."
                );
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Could not create your account: " + error.message);
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}


/* =========================
   LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!window.supabaseClient) {
            alert("Connection error. Please check your Supabase setup.");
            return;
        }

        const submitButton = loginForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) submitButton.disabled = true;

        try {
            const { error } =
                await window.supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) throw error;

            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Login error:", error);
            alert(
                "Login failed. Check your email and password, and confirm your email if required."
            );
        } finally {
            if (submitButton) submitButton.disabled = false;
        }
    });
}



/* =========================
   DASHBOARD AND TRANSACTIONS
========================= */

const budgetForm = document.getElementById("budget-form");
const transactionForm = document.getElementById("transaction-form");

if (budgetForm && transactionForm) {

    const balanceDisplay = document.getElementById("balance");
    const budgetDisplay = document.getElementById("budget");
    const spentDisplay = document.getElementById("spent");

    const transactionList = document.getElementById("transaction-list");
    const emptyMessage = document.getElementById("empty-message");

    const categorySummary = document.getElementById("category-summary");
    const categoryEmptyMessage = document.getElementById(
        "category-empty-message"
    );

    const transactionFilter = document.getElementById(
        "transaction-filter"
    );

    const budgetInput = document.getElementById("budget-input");
    const transactionName = document.getElementById("transaction-name");
    const transactionAmount = document.getElementById("transaction-amount");

    const transactionCategory = document.getElementById(
        "transaction-category"
    );

    const transactionType = document.getElementById("transaction-type");


    // Safely load saved demo data
    function loadArray(key) {
        try {
            const saved = JSON.parse(sessionStorage.getItem(key) || "[]");
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    }

    let transactions = loadArray("transactions");

    let monthlyBudget = Number(
        sessionStorage.getItem("monthlyBudget") || 0
    );

    if (!Number.isFinite(monthlyBudget) || monthlyBudget < 0) {
        monthlyBudget = 0;
    }


    // Migrate older transactions to include categories and IDs
    transactions = transactions.map(function(transaction, index) {
        return {
            ...transaction,
            id: transaction.id || ("legacy-" + index),
            category: transaction.category || "Other",
            type: transaction.type === "income" ? "income" : "expense",
            amount: Number(transaction.amount) || 0,
            name: String(transaction.name || "Untitled transaction")
        };
    });

    sessionStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    const categories = [
        "Groceries",
        "Transport",
        "Bills",
        "Entertainment",
        "Shopping",
        "Health",
        "Education",
        "Salary",
        "Gift",
        "Other"
    ];


    function formatMoney(amount) {
        return window.WalletWiseI18n
            ? window.WalletWiseI18n.formatMoney(amount)
            : new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP"
            }).format(Number(amount) || 0);
    }


    // Translate a category for display only.
    // Keep the saved category value in English for filters and data.
    function displayCategory(category) {
        return window.WalletWiseI18n
            ? window.WalletWiseI18n.translateText(category)
            : category;
    }


    function saveTransactions() {
        sessionStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }


    function formatDate(dateString) {
        if (!dateString) {
            return "Date not recorded";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return "Date not recorded";
        }

        return date.toLocaleDateString(
            window.WalletWiseI18n?.getLanguage() === "ro"
                ? "ro-RO"
                : "en-GB",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    }


    /* =========================
       UPDATE BALANCE AND TOTALS
    ========================= */

    function updateDashboard() {
        let balance = 0;
        let totalSpent = 0;

        const spendingByCategory = {};

        transactions.forEach(function(transaction) {
            const amount = Number(transaction.amount);

            if (!Number.isFinite(amount) || amount <= 0) {
                return;
            }

            if (transaction.type === "income") {
                balance += amount;
            } else {
                balance -= amount;
                totalSpent += amount;

                const category = categories.includes(transaction.category)
                    ? transaction.category
                    : "Other";

                spendingByCategory[category] =
                    (spendingByCategory[category] || 0) + amount;
            }
        });

        balanceDisplay.textContent = formatMoney(balance);
        spentDisplay.textContent = formatMoney(totalSpent);

        budgetDisplay.textContent = monthlyBudget > 0
            ? formatMoney(monthlyBudget)
            : (window.WalletWiseI18n
                ?window.WalletWiseI18n.translateText("Not set")
            : "Not set");

        renderTransactions();
        renderCategorySummary(spendingByCategory);
    }


    /* =========================
       RENDER TRANSACTION HISTORY
    ========================= */

    function renderTransactions() {
        transactionList.replaceChildren();

        const filter = transactionFilter.value;

        const filteredTransactions = [...transactions]
            .filter(function(transaction) {
                return filter === "all" ||
                    transaction.category === filter;
            })
            .reverse();

        emptyMessage.hidden = filteredTransactions.length > 0;

        if (transactions.length > 0 && filteredTransactions.length === 0) {
            emptyMessage.textContent =
                "No transactions found in this category.";
            emptyMessage.hidden = false;
        } else {
            emptyMessage.textContent =
                "No transactions yet. Add your first transaction to get started!";
        }

        filteredTransactions.forEach(function(transaction) {
            const item = document.createElement("li");
            item.className = "transaction-item";

            const info = document.createElement("div");
            info.className = "transaction-info";

            const description = document.createElement("strong");
            description.textContent = transaction.name;

            const details = document.createElement("small");
            details.className = "transaction-meta";

            details.textContent =
                displayCategory(transaction.category) + " · " +
                (transaction.type === "income"
                    ? (window.WalletWiseI18n
                        ? window.WalletWiseI18n.translateText("Money received")
                        : "Money received")
                    : (window.WalletWiseI18n
                        ? window.WalletWiseI18n.translateText("Money spent")
                        : "Money spent")) +
                " · " + formatDate(transaction.date);

            const actions = document.createElement("div");
            actions.className = "transaction-actions";

            const amount = document.createElement("span");
            amount.className = "transaction-amount";

            const sign = transaction.type === "income" ? "+" : "−";
            amount.textContent = sign + formatMoney(transaction.amount);

            if (transaction.type === "income") {
                amount.classList.add("income-amount");
            } else {
                amount.classList.add("expense-amount");
            }

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-transaction-button";

            deleteButton.textContent = window.WalletWiseI18n
                ? window.WalletWiseI18n.translateText("Delete")
                : "Delete";

            deleteButton.setAttribute(
                "aria-label",
                "Delete transaction: " + transaction.name
            );

            deleteButton.addEventListener("click", function() {
                const confirmed = window.confirm(
                    (window.WalletWiseI18n
                        ? window.WalletWiseI18n.translateText("Delete")
                        : "Delete") +
                    ' "' + transaction.name + '"? ' +
                    (window.WalletWiseI18n
                        ? window.WalletWiseI18n.translateText(
                            "This will update your balance and spending totals."
                        )
                        : "This will update your balance and spending totals.")
                );

                if (!confirmed) {
                    return;
                }

                transactions = transactions.filter(function(item) {
                    return item.id !== transaction.id;
                });

                saveTransactions();
                updateDashboard();
            });

            info.appendChild(description);
            info.appendChild(details);

            actions.appendChild(amount);
            actions.appendChild(deleteButton);

            item.appendChild(info);
            item.appendChild(actions);

            transactionList.appendChild(item);
        });
    }


    /* =========================
       SPENDING BY CATEGORY
    ========================= */

    function renderCategorySummary(spendingByCategory) {
        categorySummary.replaceChildren();

        const entries = Object.entries(spendingByCategory)
            .sort(function(a, b) {
                return b[1] - a[1];
            });

        categoryEmptyMessage.hidden = entries.length > 0;

        entries.forEach(function(entry) {
            const category = entry[0];
            const amount = entry[1];

            const item = document.createElement("li");
            item.className = "category-summary-item";

            const name = document.createElement("span");
            name.className = "category-summary-name";
            name.textContent = displayCategory(category);

            const value = document.createElement("strong");
            value.className = "category-summary-amount";
            value.textContent = formatMoney(amount);

            const percentage = monthlyBudget > 0
                ? (amount / monthlyBudget) * 100
                : null;

            const progressTrack = document.createElement("div");
            progressTrack.className = "category-progress-track";
            progressTrack.setAttribute("aria-hidden", "true");

            const progressBar = document.createElement("div");
            progressBar.className = "category-progress-bar";

            // When a budget is set, show the category's share of it.
            // Otherwise, show its share of all recorded expenses.
            const totalSpent = Object.values(spendingByCategory)
                .reduce((sum, value) => sum + value, 0);

            const barPercentage = monthlyBudget > 0
                ? Math.min(percentage, 100)
                : (totalSpent > 0 ? (amount / totalSpent) * 100 : 0);

            progressBar.style.width = barPercentage + "%";

            progressTrack.appendChild(progressBar);

            const note = document.createElement("small");
            note.className = "category-summary-note";

            if (monthlyBudget > 0) {
                note.textContent =
                    percentage.toFixed(1) + "% of monthly budget";
            } else {
                note.textContent =
                    (totalSpent > 0
                        ? (amount / totalSpent * 100).toFixed(1)
                        : "0.0") + "% " +
                        (window.WalletWiseI18n
                            ? window.WalletWiseI18n.translateText("of recorded expenses")
                            : "of recorded expenses");
            }

            item.appendChild(name);
            item.appendChild(value);
            item.appendChild(progressTrack);
            item.appendChild(note);

            categorySummary.appendChild(item);
        });
    }


    /* =========================
       SAVE MONTHLY BUDGET
    ========================= */

    budgetForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let newBudget;

        try {
            newBudget = window.WalletWiseI18n
                ? window.WalletWiseI18n.toBaseGBP(Number(budgetInput.value))
                : Number(budgetInput.value);
        } catch (error) {
            alert("Exchange rate is not ready yet. Please try again in a moment.");
            return;
        }

        if (!Number.isFinite(newBudget) || newBudget <= 0) {
            alert("Please enter a monthly budget greater than £0.");
            return;
        }

        monthlyBudget = newBudget;

        sessionStorage.setItem(
            "monthlyBudget",
            String(monthlyBudget)
        );

        updateDashboard();
        budgetForm.reset();

        alert("Your monthly budget has been saved!");
    });


    /* =========================
       ADD A TRANSACTION
    ========================= */

    transactionForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = transactionName.value.trim();
        let amount;

        try {
            amount = window.WalletWiseI18n
                ? window.WalletWiseI18n.toBaseGBP(Number(transactionAmount.value))
                : Number(transactionAmount.value);
        } catch (error) {
            alert("Exchange rate is not ready yet. Please try again in a moment.");
            return;
        }

        const type = transactionType.value;
        const category = transactionCategory.value;

        if (!name) {
            alert("Please enter a transaction description.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please enter an amount greater than £0.");
            return;
        }

        if (type !== "expense" && type !== "income") {
            alert("Please select a valid transaction type.");
            return;
        }

        if (!categories.includes(category)) {
            alert("Please select a valid category.");
            return;
        }

        transactions.push({
            id: Date.now().toString() + "-" +
                Math.random().toString(16).slice(2),
            name: name,
            amount: amount,
            type: type,
            category: category,
            date: new Date().toISOString()
        });

        saveTransactions();

        // Reset the form fields after adding a transaction.
        transactionName.value = "";
        transactionAmount.value = "";

        transactionType.value = "expense";
        transactionCategory.value = "Other";

        // Update the visible custom category dropdown.
        const categoryText = document.getElementById(
            "category-select-value"
        );

        if (categoryText) {
            categoryText.textContent = displayCategory("Other");
        }

        document.querySelectorAll(
            "#category-select .custom-select-option"
        ).forEach(function(option) {
            option.setAttribute(
                "aria-selected",
                String(option.dataset.value === "Other")
            );
        });

        updateDashboard();

        alert(
            type === "income"
                ? "Money received added successfully!"
                : "Expense added successfully!"
        );
    });


    /* =========================
       FILTER TRANSACTIONS
    ========================= */

    transactionFilter.addEventListener("change", function() {
        renderTransactions();
    });

    // Refresh totals and amounts when the currency or language changes.
    window.addEventListener("walletwise:currencychange", updateDashboard);

    // Display existing data on page load.
    updateDashboard();
}


/* =========================
   CUSTOM CATEGORY DROPDOWN
========================= */

document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById("category-select");

    if (!dropdown) {
        return;
    }

    const trigger = document.getElementById("category-select-button");
    const menu = document.getElementById("category-options");
    const valueDisplay = document.getElementById("category-select-value");
    const hiddenInput = document.getElementById("transaction-category");

    if (!trigger || !menu || !valueDisplay || !hiddenInput) {
        console.error(
            "WalletWise: A category dropdown element is missing."
        );
        return;
    }

    const options = Array.from(
        dropdown.querySelectorAll(".custom-select-option")
    );

    if (options.length === 0) {
        console.error(
            "WalletWise: No category dropdown options were found."
        );
        return;
    }

    const savedIndex = options.findIndex(function(option) {
        return option.dataset.value === hiddenInput.value;
    });

    let selectedIndex = savedIndex >= 0
        ? savedIndex
        : options.findIndex(function(option) {
            return option.dataset.value === "Other";
        });

    if (selectedIndex < 0) {
        selectedIndex = 0;
    }

    function closeMenu(returnFocus = false) {
        menu.hidden = true;
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");

        if (returnFocus) {
            trigger.focus();
        }
    }

    function openMenu(index = selectedIndex) {
        menu.hidden = false;
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");

        options[index].focus();
    }

    function selectOption(index) {
        selectedIndex = index;

        const option = options[index];

        // Keep the underlying category value unchanged.
        hiddenInput.value = option.dataset.value;

        valueDisplay.textContent = window.WalletWiseI18n
            ? window.WalletWiseI18n.translateText(option.dataset.value)
            : option.textContent.trim();

        options.forEach(function(item, i) {
            item.setAttribute(
                "aria-selected",
                String(i === selectedIndex)
            );
        });

        closeMenu(true);
    }

    trigger.addEventListener("click", function() {
        if (menu.hidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    trigger.addEventListener("keydown", function(event) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu(selectedIndex);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(options.length - 1);
        } else if (event.key === "Escape") {
            closeMenu();
        }
    });

    options.forEach(function(option, index) {
        option.addEventListener("click", function() {
            selectOption(index);
        });

        option.addEventListener("keydown", function(event) {
            let nextIndex = index;

            if (event.key === "ArrowDown") {
                nextIndex = (index + 1) % options.length;
            } else if (event.key === "ArrowUp") {
                nextIndex = (index - 1 + options.length) % options.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = options.length - 1;
            } else if (event.key === "Escape") {
                event.preventDefault();
                closeMenu(true);
                return;
            } else if (event.key === "Tab") {
                closeMenu();
                return;
            } else {
                return;
            }

            event.preventDefault();
            options[nextIndex].focus();
        });
    });

    document.addEventListener("click", function(event) {
        if (!dropdown.contains(event.target) && !menu.hidden) {
            closeMenu();
        }
    });

    options.forEach(function(option, index) {
        option.setAttribute(
            "aria-selected",
            String(index === selectedIndex)
        );
    });

    valueDisplay.textContent = window.WalletWiseI18n
        ? window.WalletWiseI18n.translateText(
            options[selectedIndex].dataset.value
        )
        : options[selectedIndex].textContent.trim();
});

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            const { error } =
                await window.supabaseClient.auth.signOut();

            if (error) {
                console.error("Logout error:", error);
                alert("Could not log out. Please try again.");
                return;
            }

            window.location.href = "index.html";
        });
    }
});


const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const swapBtn = document.getElementById("swap-btn");
const convertBtn = document.getElementById("convert-btn");
const resultAmount = document.getElementById("result-amount");
const resultRate = document.getElementById("result-rate");

const countryMap = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  BRL: "br",
  CAD: "ca",
  AUD: "au",
  CHF: "ch",
  CNY: "cn",
  INR: "in",
};

function updateFlag(select, flagImg) {
  const code = select.value;
  const country = code.slice(0, 2).toLowerCase();
  flagImg.src = `https://flagcdn.com/w40/${country}.png`;
  flagImg.alt = `${code} flag`;
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
}

function setLoading(isLoading) {
  convertBtn.disabled = isLoading;
  convertBtn.classList.toggle("loading", isLoading);
}

function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (Number.isNaN(amount) || amount < 0) {
    resultAmount.textContent = "—";
    resultRate.textContent = "Digite um valor válido.";
    return;
  }

  setLoading(true);
  resultRate.textContent = "Converting…";

  
  const apiKey = "45d7d4f6ddb6e330d60cbc46"

  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rate = data.conversion_rates[to];
    const converted = amount * rate;

    resultAmount.textContent = formatCurrency(converted, to);
    resultRate.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;

  })
  .catch(error => {
    console.error("Error fetching exchange rate:", error);
    resultRate.textContent = "Erro ao converter.";
  })
  .finally(() => {
    setLoading(false);
  });

  
}

fromSelect.addEventListener("change", () => updateFlag(fromSelect, fromFlag));
toSelect.addEventListener("change", () => updateFlag(toSelect, toFlag));

swapBtn.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);

  resultAmount.textContent = "—";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  convert();
});

amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    convert();
  }
});

updateFlag(fromSelect, fromFlag);
updateFlag(toSelect, toFlag);

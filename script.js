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
  const country = code.slice(0, 2).toUpperCase();
  flagImg.src = `https://flagsapi.com/${country}/flat/64.png`;
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

  // INSERIR API
  setTimeout(() => {
    const converted = amount; // placeholder value
    resultAmount.textContent = formatCurrency(converted, to);
    resultRate.textContent = `1 ${from} = 1.0000 ${to}`;
    setLoading(false);
  }, 400);
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

// Simpele winkelmand-logica voor Noma's Pizza

const orderList = document.getElementById('order-list');
const totalPriceEl = document.getElementById('total-price');
const dealInfoEl = document.getElementById('deal-info');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

function updateUI() {
  orderList.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} – €${item.price}`;
    li.className = 'order-item';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.className = 'btn-remove';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      updateUI();
    };

    li.appendChild(removeBtn);
    orderList.appendChild(li);
  });

  const count = cart.length;
  let total = cart.reduce((sum, item) => sum + item.price, 0);

  // Deal: 3 pizza's voor €15
  if (count >= 3) {
    const setsOfThree = Math.floor(count / 3);
    const rest = count % 3;
    total = setsOfThree * 15 + rest * 5;
    dealInfoEl.textContent = `Deal actief: ${setsOfThree}× (3 pizza's voor €15)`;
    dealInfoEl.classList.add('deal-active');
  } else {
    dealInfoEl.textContent = `Deal: 3 pizza's voor €15`;
    dealInfoEl.classList.remove('deal-active');
  }

  totalPriceEl.textContent = `€${total}`;
}

document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.card');
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    cart.push({ name, price });
    updateUI();
  });
});

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Je hebt nog geen pizza’s gekozen.');
      return;
    }
    alert('Bedankt voor je bestelling bij Noma’s Pizza! 🍕');
    cart = [];
    updateUI();
  });
}
// ----------------------
// ADMIN PANEL
// ----------------------

const ADMIN_SECRET = "noma123"; // jouw geheime code

const adminLogin = document.getElementById("admin-login");
const adminPanel = document.getElementById("admin-panel");
const adminEnter = document.getElementById("admin-enter");
const adminCode = document.getElementById("admin-code");
const adminError = document.getElementById("admin-error");
const pizzaEditor = document.getElementById("pizza-editor");
const saveAdmin = document.getElementById("save-admin");

// Pizza data (kan worden aangepast)
let pizzaData = [
  { name: "Shoarma", price: 5, desc: "Rijke shoarma, knoflooksaus, rode ui." },
  { name: "Margherita", price: 5, desc: "Tomatensaus, mozzarella, basilicum." },
  { name: "Tonijn", price: 5, desc: "Tonijn, rode ui, olijven." }
];

// Admin login
if (adminEnter) {
  adminEnter.addEventListener("click", () => {
    if (adminCode.value === ADMIN_SECRET) {
      adminLogin.classList.add("hidden");
      adminPanel.classList.remove("hidden");
      loadEditor();
    } else {
      adminError.textContent = "Foute code";
    }
  });
}

// Editor laden
function loadEditor() {
  pizzaEditor.innerHTML = "";

  pizzaData.forEach((pizza, index) => {
    const div = document.createElement("div");
    div.className = "admin-item";

    div.innerHTML = `
      <h3>${pizza.name}</h3>
      <label>Naam: <input type="text" value="${pizza.name}" data-field="name" data-index="${index}"></label>
      <label>Prijs: <input type="number" value="${pizza.price}" data-field="price" data-index="${index}"></label>
      <label>Beschrijving: <input type="text" value="${pizza.desc}" data-field="desc" data-index="${index}"></label>
    `;

    pizzaEditor.appendChild(div);
  });
}

// Opslaan
if (saveAdmin) {
  saveAdmin.addEventListener("click", () => {
    const inputs = pizzaEditor.querySelectorAll("input");

    inputs.forEach(input => {
      const index = input.dataset.index;
      const field = input.dataset.field;
      pizzaData[index][field] = input.value;
    });

    alert("Pizza’s succesvol bijgewerkt!");
  });
}

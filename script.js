function getInitialDate() {
  let tituloHeader = document.getElementById("titulo-header");
  const fecha = new Date();
  const nombreMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  tituloHeader.innerHTML = `Presupuesto de ${nombreMeses[fecha.getMonth()]} ${fecha.getFullYear()}`
}

getInitialDate();

// Declaración de variables
let totalIngresos = 0;
let totalEgresos = 0;
let porcentajeDeGastos = 0;
let tabActiva = "Ingresos";

let ingresos = [];

// Cambiando de pestaña
const tabIngresos = document.getElementById("tab-ingresos");
const tabEgresos = document.getElementById("tab-egresos");

function obtenerEstado() {
  obtenerIngresos();
  if (tabActiva === "Ingresos") {
    tabIngresos.style.background = "black";
    tabIngresos.style.color = "white";

    tabEgresos.style.background = "#e5e7eb";
    tabEgresos.style.color = "black";
  } else {
    tabEgresos.style.background = "black";
    tabEgresos.style.color = "white";

    tabIngresos.style.background = "#e5e7eb";
    tabIngresos.style.color = "black";
  }
}

obtenerEstado()

tabIngresos.addEventListener("click", () => {
  tabActiva = "Ingresos";
  obtenerEstado();
});

tabEgresos.addEventListener("click", () => {
  tabActiva = "Egresos";
  obtenerEstado();
});

// Obteniendo datos
function obtenerIngresos() {
  const ingresosLista = document.getElementById("lista");
  let lista = "";
  let ingresosFiltrados = ingresos.filter((el) => {
    return el.tipo === tabActiva
  });

  ingresosFiltrados.forEach((el) => {
    lista += `
    <div class="border p-3 flex justify-between">
            <span> ${el.descripcion} </span>
            <span>+${el.monto}</span>
    </div>
    `
  });

  ingresosLista.innerHTML = lista
}

obtenerIngresos();

// Obtener elementos de html
const ingresoTipo = document.getElementById('ingreso-tipo');
const ingresoDescripcion = document.getElementById("descripcion");
const ingresoMonto = document.getElementById("monto");
const btnAgregar = document.getElementById("agregar");

btnAgregar.addEventListener("click", () => {
  agregar();
})

function agregar() {
  let valores = {
    tipo: '',
    descripcion: '',
    monto: ''
  };

  valores.tipo = ingresoTipo.options[ingresoTipo.selectedIndex].text;
  valores.descripcion = ingresoDescripcion.value;
  valores.monto = parseInt(ingresoMonto.value);

  ingresos.push(valores);
  obtenerIngresos();
  obtenerHeaderValores();

  ingresoDescripcion.value = "";
  ingresoMonto.value = "";
}

function obtenerHeaderValores() {
  const totalIngresos = document.getElementById("total-ingresos");
  const totalEgresos = document.getElementById("total-egresos");

  let ingresosFiltrados = ingresos.filter((el) => {
    return el.tipo === "Ingresos"
  });

  let egresosFiltrados = ingresos.filter((el) => {
    return el.tipo === "Egresos"
  });

  const totalIng = (ingresosFiltrados.length >= 1 ? ingresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0)
  const totalEgr = (egresosFiltrados.length >= 1 ? egresosFiltrados.map(({ monto }) => monto).reduce((a, b) => a + b) : 0);

  totalIngresos.innerHTML = "+" + totalIng;
  totalEgresos.innerHTML = "+" + totalEgr;

  obtenerPorcentajeGastos(totalIng, totalEgr);
};

obtenerHeaderValores();

function obtenerPorcentajeGastos(a, b) {
  const porcentajeGastos = document.getElementById("porcentaje-gastos");
  const restante = document.getElementById("restante");

  porcentajeGastos.innerHTML = `%${(b * 100 / a ).toFixed(2)}`;
  restante.innerHTML = `+${a - b}`;
};
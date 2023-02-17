"use strict";

let catalogo = new Catalogo();
let categorias = [];
let oGestor = new Gestor();

const selectCategoria = document.getElementsByName("categorias")[0]; // Guardamos la select de categorias
const selectProductos = document.getElementsByName("productos")[0]; // Guardamos la select de productos
const mesas = document.querySelectorAll('h1 > span'); // Guardar los elementos que conforman las mesas
let panelCuenta = document.getElementById("cuenta"); // Guardar el panel donde se escribe la cuenta
const tecladoNumerico = document.getElementById("teclado");

// Eventos
document.addEventListener("DOMContentLoaded", iniciaPrograma);
document.getElementById("mesas").addEventListener("click", mesaSeleccionada);
tecladoNumerico.addEventListener("click", anadeProducto);

function iniciaPrograma()
{
 
  categorias = ["Bebidas", "Tostadas", "Bollería"];

  catalogo.addProducto(1, "Café con leche", 0.95, 0);
  catalogo.addProducto(2, "Té", 1.05, 0);
  catalogo.addProducto(3, "Cola-cao", 1.35, 0);
  catalogo.addProducto(4, "Chocolate a la taza", 1.95, 0);
  catalogo.addProducto(5, "Media con aceite", 1.25, 1);
  catalogo.addProducto(6, "Entera con aceite", 1.95, 1);
  catalogo.addProducto(7, "Media con aceite y jamón", 1.95, 1);
  catalogo.addProducto(8, "Entera con aceite y jamón", 2.85, 1);
  catalogo.addProducto(9, "Media con mantequilla", 1.15, 1);
  catalogo.addProducto(10, "Entera con mantequilla", 1.75, 1);
  catalogo.addProducto(11, "Media con manteca colorá", 1.45, 1);
  catalogo.addProducto(12, "Entera con manteca colorá", 2.15, 1);
  catalogo.addProducto(13, "Croissant", 0.95, 2);
  catalogo.addProducto(14, "Napolitana de chocolate", 1.45, 2);
  catalogo.addProducto(15, "Caracola de crema", 1.65, 2);
  catalogo.addProducto(16, "Caña de chocolate", 1.35, 2);

  cargaCategorias();
  cargaProductos();
  preparaMesas();
  iniciaCuenta();

}

function cargaCategorias()
{ 
  for(let i = 0; i < categorias.length; i++) // Recorremos las categorias y creamos los elementos option para introducirlos.
  {
    let option = document.createElement("OPTION");
    option.text = categorias[i];
    option.value = i; // esta es la id de la categoria que coincide con el index del array
    selectCategoria.append(option);
  }

  selectCategoria.addEventListener("change", cargaProductos); // Cada vez que cambiemos de categoría debemos cambiar el combo de productos.
}

function cargaProductos()
{  
  let idCategoriaSeleccionada = document.getElementsByName("categorias")[0].value; // Guardamos el id de la categoría seleccionada
  // Llamamos al método del catálogo que devuelve un array de productos de la categoría seleccionada
  let productosDeCategoria = catalogo.obtieneProductosCategoria(idCategoriaSeleccionada); 
  
  selectProductos.innerHTML = ""; // Limpiamos el combo de productos que hubiera antes

  for(let i = 0; i < productosDeCategoria.length; i++) // Lo rellenamos con la nueva tanda de productos
  {
    let option = document.createElement("OPTION");
    option.text = productosDeCategoria[i].nombreProducto;
    option.value = productosDeCategoria[i].idProducto;
    selectProductos.append(option);
  }
}

function preparaMesas()
{
  for(let mesa of mesas)
  {
    mesa.classList.add('libre'); // Añadir la clase libre para que adquiera el color pedido
  }
}

function iniciaCuenta()
{
  oGestor.mesaActual = mesas[0].innerHTML; // Guardar el valor de la mesa actual, la primera
  panelCuenta.innerHTML = "<h1>Cuenta</h1><h2>Mesa " + oGestor.mesaActual + "</h2>"; // Añadir la información
  
}

function mesaSeleccionada(event)
{
  let mesaSeleccionada = event.target;

  if(mesaSeleccionada.tagName == 'SPAN')
  {
    // Si estamos aqui es porque se ha seleccionado una mesa
    oGestor.mesaActual = mesaSeleccionada.innerHTML;
    muestraCuenta();
  }
  
}

function muestraCuenta()
{
  // Esta función es invocada cada vez que se pulsa el botón de una mesa. 
  // Muestra la cuenta de dicha mesa en el panel "Cuenta"
  panelCuenta.innerHTML = "";
  panelCuenta.innerHTML = "<h1>Cuenta</h1><h2>Mesa " + oGestor.mesaActual + "</h2>"; // Cabecera del panel

  if(oGestor.hayCuenta(oGestor.mesaActual))
  {
    let cuentaMesa = oGestor.recuperaCuenta(oGestor.mesaActual); // Guardamos la cuenta de la mesa
    
    if(cuentaMesa.lineasDeCuenta.length > 0) // si tiene líneas, mostramos la tabla
    {
      // Botón de pagar
      let total = 0;
      let botonPagar = document.createElement("button");
      botonPagar.textContent = "PAGAR Y LIBERAR MESA";
      botonPagar.classList.add("boton");

      // Tabla cuenta
      let tablaCuenta = document.createElement("table");
      let thead = document.createElement("thead");
      let contenidoTh = ["Modificar", "Uds.", "Id", "Producto", "Precio"]; // Contenido del head de la tabla
      for(let i = 0; i < contenidoTh.length; i++)
      {
        // Crear el head de la tabla y su contenido
        let th = document.createElement("th");
        let txtTh = document.createTextNode(contenidoTh[i]);
        th.append(txtTh);
        thead.append(th);
      }
      
      tablaCuenta.append(thead);
      
      // Para el contenido de la tabla hay que saber cuántas filas hay. 
      // El número coincide con el número de líneas de la cuenta.

      for(let j = 0; j < cuentaMesa.lineasDeCuenta.length; j++)
      {
        let tr = document.createElement("tr");
        for(let x = 0; x < contenidoTh.length; x++) // Insertar tantas celdas como sea necesario
        {
          tr.insertCell();
        }

        // Crear los botones de la columna modificar y agregar toda la información necesaria
        let botonSuma = document.createElement("button");
        let botonResta = document.createElement("button");

        botonSuma.setAttribute("id", "suma");
        botonResta.setAttribute("id", "resta");

        botonSuma.innerHTML = "+";
        botonResta.innerHTML = "-";

        botonSuma.classList.add("modificador");
        botonResta.classList.add("modificador");

        botonSuma.addEventListener("click", modificaUnidades);
        botonResta.addEventListener("click", modificaUnidades);

        // Añadir el contenido de las diferentes columnas
        tr.cells[0].append(botonSuma);
        tr.cells[0].append(botonResta);
        tr.cells[1].append(cuentaMesa.lineasDeCuenta[j].unidades);
        tr.cells[2].append(cuentaMesa.lineasDeCuenta[j].idProducto);

        let idSeleccionado = cuentaMesa.lineasDeCuenta[j].idProducto;
        let productoSeleccionado;
        // Guarda el producto seleccionado

        for(let producto of catalogo.productos)
        {
          if(producto.idProducto == idSeleccionado)
          {
            productoSeleccionado = producto;
          }
        }

        // Insertar los datos en sus correspondientes celdas
        tr.cells[3].append(productoSeleccionado.nombreProducto);
        tr.cells[4].append(productoSeleccionado.precioUnidad);

        
        total += cuentaMesa.lineasDeCuenta[j].unidades * productoSeleccionado.precioUnidad;
        // Añadir a la tabla la fila creada
        tablaCuenta.append(tr);
        console.log(cuentaMesa.lineasDeCuenta[j].unidades * productoSeleccionado.precioUnidad);
      }

      panelCuenta.innerHTML += "<h1>Total: " + total.toFixed(2) + " €</h1>";
      panelCuenta.append(botonPagar);
      botonPagar.addEventListener("click", liberaMesa);
      panelCuenta.append(tablaCuenta);

    }
  }
}

function anadeProducto(event)
{
  let unidades = event.target;
  if(unidades.classList.contains('tecla')) // Nos aseguramos de que se ha pulsado una tecla numérica
  {
    // Guardamos el id del producto seleccionado
    let idProducto = document.getElementsByName("productos")[0].value;
    // Mirar si en el Gestor hay una cuenta de la mesa seleccionada
    let mesa = oGestor.mesaActual;
    let hayCuenta = oGestor.hayCuenta(mesa);

    if(hayCuenta)
    {
      // Recuperar  la cuenta de la mesa
      let cuentaMesa = oGestor.recuperaCuenta(mesa);
      // Mirar si hay una línea ya creada del producto seleccionado
      let existeLinea = oGestor.recuperaLinea(cuentaMesa, idProducto);
      if(existeLinea)
      {
        // si existe la línea hay que decirle al usuario que no puede añadirla otra vez
        // y sugerir que use los botones de modificación
        alert("Ya existe una línea de cuenta con ese producto.\nUtilice los botones de modificación del panel de cuenta");
      }
      else
      { 
        // si no existe la línea, hay que añadirla.
        // Necesitamos las unidades y el id del producto para hacer una nueva línea de cuenta
        let linea = new LineaCuenta(idProducto, unidades.value);
        // Añadimos la nueva línea a la cuenta de la mesa
        cuentaMesa.anadeLinea(linea);
      }
      
    }
    else // En caso de que no hubiera una cuenta de la mesa seleccionada
    {
      // Hay que crear una cuenta y una nueva línea
      let nuevaCuenta = new Cuenta(mesa);
      let nuevaLinea = new LineaCuenta(idProducto, unidades.value);
      // Añadir la nueva línea a la cuenta y dicha cuenta al gestor
      nuevaCuenta.anadeLinea(nuevaLinea);  
      oGestor.anadeCuenta(nuevaCuenta);
    }

    // Marcar la mesa como ocupada
    let mesaACambiar;
    for(let mesa of mesas)
    {
      if(mesa.innerHTML == oGestor.mesaActual)
      {
        mesaACambiar = mesa;
      }
    }

    mesaACambiar.classList.remove("libre");
    mesaACambiar.classList.add("ocupada");

    muestraCuenta(); // Llamamos al método que permite ver la tabla actualizada en el panel "Cuenta"
    
  }
}

function modificaUnidades(event)
{
  // Guardamos el valor del id del producto del cual hemos seleccionado el modificador de unidades
  let idProducto = event.target.parentNode.nextSibling.nextSibling.innerHTML;
  // Buscamos la línea que contiene dicho producto
  let cuentaActual = oGestor.recuperaCuenta(oGestor.mesaActual);
  let linea = oGestor.recuperaLinea(cuentaActual, idProducto);
  
  // comprobamos qué es lo que se ha pulsado: sumar o restar unidades
  if(event.target.getAttribute("id") == "suma") 
  {
    linea.unidades = Number(linea.unidades) + 1;
  }
  else
  {
    if(linea.unidades > 0)
    {
      linea.unidades = Number(linea.unidades) - 1;
    }
    
    if(linea.unidades == 0) 
    {
      let respuesta = confirm("¿Desea eliminar el producto?");
      if(respuesta)
      {
        oGestor.eliminaLinea(cuentaActual, linea);
      }
      else
      {
        linea.unidades = 1; // Mantener las unidades a 1
      }    
    }  
  }
  muestraCuenta(); 
}

function liberaMesa()
{
  let cuentaActual = oGestor.recuperaCuenta(oGestor.mesaActual);
  oGestor.eliminaCuenta(cuentaActual);
  for(let mesa of mesas)
  {
    if(mesa.innerHTML == oGestor.mesaActual)
    {
      mesa.classList.remove("ocupada");
      mesa.classList.add("libre");
    }
  }

  muestraCuenta();
}


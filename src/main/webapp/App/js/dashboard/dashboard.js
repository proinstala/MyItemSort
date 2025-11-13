
import { solicitudGet, solicitudPut, getDatosForm, addRowSelected, fillInputSelect, cargarInputSelect, observeRowSelectedChange, deleteRowSelectedTable } from '../comunes.mjs?v=20241021_184300';
import { mostrarMensaje, mostrarMensajeError, mostrarMensajeOpcion } from '../alertasSweetAlert2.mjs';
import { pintarGraficoEmplazamientos } from '../funcionesEcharts.mjs';
import { DEFAULT_IMG, DISPONIBILIDAD } from '../constantes.mjs';

const idContenedorAlmacenes = "#contendor__almacenes";
const idContenedroArticulos = "#contendor__articulos";
const idFormBusquedaArticulo = "#frmBuscarArticulo";
const idBtnBuscar = "#btnBuscar";
const idBtnDetalle = "#btnDetalle";
const idForm = "#frmBuscarArticulo";
const idInputIdAlmacen = "#almacen";

let listaAlmacenes = [];

document.addEventListener("DOMContentLoaded", function () {
    const btnBuscar = document.querySelector(idBtnBuscar);
    const btnDetalle = document.querySelector(idBtnDetalle);
    const contenedorAlmacenes = document.querySelector(idContenedorAlmacenes);
    const contenedorArticulos = document.querySelector(idContenedroArticulos);
    
    validarFormulario(idForm);
    cargarDatosIniciales();
    
    btnDetalle.addEventListener('click', () => {
        const idAlmacen = contenedorAlmacenes.getAttribute('data-cardselected'); 
        const idArticulo = contenedorArticulos.getAttribute('data-cardselected'); 
        window.location.href = (`articulo/articulos/detalle/${idArticulo}`);
    });
});

async function cargarDatosIniciales() {
    listaAlmacenes = await getAlmacenes();

    if(!listaAlmacenes || listaAlmacenes.length === 0) {
        mostrarMensaje("No hay almacenes disponibles.");
        return;
    }
    
    crearCardsAlmacenes();
}

function crearCardsAlmacenes() {
    
    const contenedorAlmacenes = document.querySelector(idContenedorAlmacenes);

    let cardsAlmacenes = listaAlmacenes.map( almacen => {
        return `<div class="card__almacen" id=${almacen.id} title="${almacen.descripcion ? almacen.descripcion : ""}">
                    <div>
                        <h5 class="card__almacen--titulo">${almacen.nombre}</h5>
                    </div>
                    <div class="card__almacen--datos">
                        <p class="card__almacen--datos--descripcion negrita">${almacen.descripcion}</p>
                        <p><span class="negrita">Localidad:</span> ${almacen.direccion.localidad.nombre}</p>
                        <p><span class="negrita">Provincia:</span> ${almacen.direccion.localidad.provincia.nombre}</p>
                    </div> 
                </div>`; 
    }).join('');
    
    contenedorAlmacenes.innerHTML = cardsAlmacenes;
    const cards = contenedorAlmacenes.querySelectorAll('.card__almacen');
    
    cards.forEach(card => {
       card.addEventListener('click', (event) => {
           const card = event.currentTarget;
           const idAlmacen = contenedorAlmacenes.getAttribute('data-cardselected');
           if(card.id !== idAlmacen) {
                contenedorAlmacenes.setAttribute('data-cardselected', card.id);
                cards.forEach(row => row.classList.remove("seleccionado"));
                card.classList.add("seleccionado");
                
                const inputAlmacen = document.querySelector(idInputIdAlmacen);
                inputAlmacen.value = card.id;
                
                resertArticulos();
                
                getAlmacen(card.id);
           }
           
       }); 
    });
    
    if (cards.length > 0) {
        cards[0].click();
    }
}


function getAlmacenes() {
    const url = `api/almacen/almacenes`;
    return solicitudGet(url, "", false)
                .then(response => {
                    if (response.isError === 1) {
                        mostrarMensajeError("Se ha producido un error", response.result);
                    } else {
                        const almacenes = response.data;
                        return almacenes;
                    }
                })
                .catch(error => {
                    // Maneja el error aquí
                    console.error("Error:", error);
                    mostrarMensajeError("Error", "No se ha podido realizar la acción por un error en el servidor.");
                });
}

function getAlmacen(idAlmacen) {
    solicitudGet(`api/almacen/almacen?idAlmacen=${idAlmacen}`, "", false)
            .then(response => {
                if (response.isError === 1) {
                    mostrarMensajeError("Se ha producido un error", response.result);
                } else {
                    const almacen = response.data;
                    fillFielsAlmacen(almacen);
                }
            })
            .catch(error => {
                // Maneja el error aquí
                console.error("Error:", error);
                mostrarMensajeError("Error", "No se ha podido realizar la acción por un error en el servidor.");
            });
}

function fillFielsAlmacen(almacen) {
    console.log(almacen);
    pintarGraficoEmplazamientos(almacen.listaEmplazamientos);
    const btnBuscarArticulos = document.querySelector(idBtnBuscar);

    setTimeout(() => {
        btnBuscarArticulos.click();
    }, 1000);
    
}

function validarFormulario(idForm) {
    $(idForm).validate({
        rules: {
            nombre: {
                required: false,
                maxlength: 100
            }
        },//Fin de reglas ----------------
        messages: {
            nombre: {
                maxlength: "Longitud máx 100 caracteres."
            }
        },//Fin de msg  ------------------

        submitHandler: function () {
            const formData = getDatosForm(idForm);
            const url = `api/articulo/find_articulos?${formData}`;

            solicitudGet(url, "", false)
                .then(response => {
                    if (response.isError === 1) {
                        mostrarMensajeError("Se ha producido un error", response.result);
                    } else {
                        fillContenedorArticulos(response.data);
                    }
                })
                .catch(error => {
                    // Maneja el error aquí
                    console.error("Error:", error);
                    mostrarMensajeError("Error", "No se ha podido realizar la acción por un error en el servidor.");
                });
        },
        //Función error de respuesta
        errorPlacement: function (error, element) {
            error.insertAfter(element); // Esto colocará el mensaje de error después del elemento con error
        }
    });//Fin Validate
}

function fillContenedorArticulos(articulos) {
    console.log(articulos);
    
    const contenedorArticulos = document.querySelector(idContenedroArticulos);
    
    let cardsArticulos = articulos.map( articulo => {
        return `<div class="card__articulo" id=${articulo.id} title="${articulo.descripcion ? articulo.descripcion : ""}">
                    <div class="card__articulo--superior">
                        <div class="card__articulo--imagen">
                            <img src=${articulo.imagen ? articulo.imagen : "App/img/defaultArticulo.svg"} alt="Imagen Artículo"/>
                        </div>
                        <div class="card__articulo--datos">
                            <p><span class="negrita">Ref: ${articulo.referencia}</span></p>
                            <p><span class="negrita">Marca: ${articulo.marca.nombre}</span></p>
                            <p><span class="negrita">Stock: ${articulo.stockActual}</span></p>
                        </div>
                    </div>
                    <div>${articulo.nombre}</div>
                </div>`; 
    }).join('');
   
    contenedorArticulos.innerHTML = cardsArticulos;
     
    const cards = contenedorArticulos.querySelectorAll('.card__articulo');
    
    //poner evento a las tarjetas para que habilite el boton de detalle y marque la tajeta como seleccionada.
    
    //hacer
    
    cards.forEach(card => {
       card.addEventListener('click', (event) => {
           const card = event.currentTarget;
           const idArticulo = contenedorArticulos.getAttribute('data-cardselected');
           if(card.id !== idArticulo) {
                contenedorArticulos.setAttribute('data-cardselected', card.id);
                cards.forEach(row => row.classList.remove("seleccionado"));
                card.classList.add("seleccionado");
                habilitarDetalleArticulo(true);
           }
           
       }); 
    });
}

function resertArticulos() {
    const contenedorArticulos = document.querySelector(idContenedroArticulos);
    contenedorArticulos.innerHTML = "";
    contenedorArticulos.setAttribute('data-cardselected', "-1");
    habilitarDetalleArticulo(false);
}

function habilitarDetalleArticulo(hayCambios) {
    $(idBtnDetalle).prop('disabled', !hayCambios);
}
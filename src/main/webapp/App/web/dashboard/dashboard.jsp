
<link href="App/css/dashboard/dashboard.css?v=<%=AppSettings.APP_VERSION_CSS%>" rel="stylesheet" type="text/css"/>
<link href="App/css/formulario.css?v=<%=AppSettings.APP_VERSION_CSS%>" rel="stylesheet" type="text/css"/>
<link href="App/css/tabla.css?v=<%=AppSettings.APP_VERSION_CSS%>" rel="stylesheet" type="text/css"/>

<div class="contenedor__general">
    <div class="contenedor">

        <%@ include file="../shared/cabecera.jsp" %>
        <div class="main">
            <div class="contenedor__grid--2f">
                <div class="contenedor__grid--2c">
                    <div class="seccion">
                        <h3 class="titulo--seccion">Almacenes</h3>
                        
                        <div id="contendor__almacenes" class="contenedor__cards" data-cardselected="-1">
                        </div>
                        
                    </div>
                    
                    <div class="seccion">
                        <div id="graficoEmplazamientos">

                        </div>
                    </div>
                    
                </div>
               
                <div class="seccion">
                    <div class="contenedor__formulario formulario--4_filas" id="form_busqueda">

                        <div class="">
                            <div>
                                <h3 class="titulo--seccion">Artículos</h3>
                            </div>
                            
                        </div>

                        <div class="">
                            <form class="formulario" name="frmBuscarArticulo" id="frmBuscarArticulo">
                                <input type="hidden" name="almacen" id="almacen" value="">

                                <div class="form__input">
                                    <input type="text" name="nombre" id="nombre">
                                    <label for="nombre">Nombre</label>
                                </div>

                                <div class="form__input">
                                    <input type="text" name="descripcion" id="descripcion">
                                    <label for="descripcion">Descripción</label>
                                </div>

                                <div class="form__input">
                                    <input type="text" name="referencia" id="referencia">
                                    <label for="referencia">Referencia</label>
                                </div>

                                <div class="form__input">
                                    <select name="marca" id="marca">
                                    </select>
                                    <label for="marca">Marca</label>
                                </div>

                            </form>
                        </div>

                        <div class="contenedor__tabla--botones">

                            <div class="form__btn_circle">
                                <button form="frmBuscarArticulo" id="btnBuscar" title="Buscar" type="submit"><i class="las la-search"></i></button>
                            </div>
                            
                            <div class="form__btn_circle">
                                <button id="btnDetalle" title="Detalle" disabled><i class="las la-info"></i></button>
                            </div>
                        </div>

                        <div id="contendor__articulos" class="contenedor__cards" data-cardselected="-1">
                            
                        </div>

                    </div> <!-- Fin contenedor__formulario -->
                </div>
            </div>
        </div>

        <div class="barra__inferior">
            <p>MyItemSort</p>
        </div>

    </div>
</div>
        
<script src="App/js/lib/echarts.js" type="text/javascript"></script>
<script src="App/js/funcionesEcharts.mjs" type="module" defer></script>

<script src="App/js/dashboard/dashboard.js?v=<%=AppSettings.APP_VERSION_JS%>" type="module" defer></script>





<%@page import="io.proinstala.myitemsort.shared.consts.urls.enums.UrlIdentidad"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<jsp:include page="/App/web/shared/head.jsp" >
    <jsp:param name="titleweb" value="MyItemSort - Login" />
</jsp:include>

    <link rel="stylesheet" href="App/css/identidad/login.css?v=<%=AppSettings.APP_VERSION_CSS%>">
    <link href="App/css/formulario.css?v=<%=AppSettings.APP_VERSION_CSS%>" rel="stylesheet" type="text/css"/>
    

    <div class="contenedor__general--login">
        <div class="login">
            <!-- Parte izquierda -->
            <form class="login__izquierda" name="frmLogin" id="frmLogin" >
                <h1>Login</h1>
                <img src="App/img/defaultUser.svg" alt="logo usuario">

                <div class="form__input login__input">
                    <input class="input-underline" type="text" name="nombreUsuario" id="nombreUsuario" placeholder="Introduce tu nombre de usuario">
                    <label for="nombreUsuario">Usuario</label>
                </div>
                <div class="form__input login__input">
                    <input class="input-underline" type="password" name="passwordUsuario" id="passwordUsuario" placeholder="Introduce tu password">
                    <label for="passwordUsuario">Password Usuario</label>
                </div>
                <div class="form__input login__input">
                    <button id="btnEntrar" type="submit" disabled>ENTRAR</button>
                </div>
            </form>

            <!-- Parte derecha -->
            <div class="login__derecha">
                <h1>Bienvenido</h1>
                <p>Organiza, cataloga y encuentra tus artí­culos de manera rápida y eficiente.</p>
                <div class="login__logo">
                    <img src="App/img/logo_mis_3.png" alt="logo app">
                </div>

                <div class="login__enlaces">
                    <a class="login__enlaces-enlace" href="<%=UrlIdentidad.REGISTRAR.getUri()%>">Crear usuario</a>
                    
                </div>
            </div>

        </div>
    </div>

    <script src="App/js/comunes.mjs?v=<%=AppSettings.APP_VERSION_JS%>" type="module"></script>
    <script src="App/js/identidad/identidadUserlogin.js?v=<%=AppSettings.APP_VERSION_JS%>" type="module"></script>

<%@ include file="/App/web/shared/foot.jsp" %>

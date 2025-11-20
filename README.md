# **MyItemSort**

MyItemSort es una aplicación web diseñada para **gestionar, organizar y controlar el stock** de artículos, ideal para uso personal o para pequeñas empresas que necesitan una solución ligera, moderna y fácil de usar.

## 🚀 Características principales

- **Gestión de artículos** con campos personalizables.
- **Organización por categorías** o criterios definidos por el usuario.
- **Interfaz simple y ágil**, pensada para uso diario.
- **Desarrollado en Java 21** para aprovechar un rendimiento moderno.
- **Compatible con Apache Tomcat 10.1.25**.
- **Construido con Apache Maven** para mantener un proyecto ordenado y modular.

## 🧰 Tecnologías utilizadas

- Java 21  
- Apache Tomcat 10.1.25  
- Apache Maven  
- JSP / Servlets *(si aplica)*  
- MySQL


## 🗃️ Base de datos

En la sección **Releases** encontrarás los archivos SQL necesarios para configurar la base de datos:

- **`myItemSort.sql`** — Script con la creación de tablas.  
- **`DatosIniciales.sql`** — Datos mínimos necesarios para el funcionamiento.  
- **`datosDemo.sql`** — Datos de demostración opcionales.

### 📌 Importación recomendada

1. Crear una base de datos vacía en MySQL.  
2. Ejecutar los scripts en este orden:

   1. myItemSort.sql
   2. DatosIniciales.sql
   3. datosDemo.sql  (opcional. son datos de prueba.) 

Es obligatorio que MySQL tenga configurado: lower_case_table_names = 1
Debe colocarse en el archivo de configuración de MySQL (`my.cnf` o `my.ini`)

### 👤 Usuario de conexión

La aplicación se conecta a MySQL usando un usuario específico que debe crearse previamente.
nombre de usuario: myitemsort
password de usuario: 1234

## 📦 Instalación y ejecución

Ir a la sección Releases del repositorio y descargar el archivo .war de la versión publicada.

Copiar el archivo .war en el directorio webapps/ de tu instalación de Apache Tomcat.

Iniciar Tomcat (o reiniciarlo si ya estaba en ejecución).

Tomcat desplegará automáticamente la aplicación.

## 📄 Licencia

Este proyecto está licenciado bajo Creative Commons CC-BY-SA-4.0.

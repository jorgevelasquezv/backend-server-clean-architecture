# Backend en NodeJS con Express y TypeScript usando Clean Architecture

## Descripción

Este proyecto es un backend desarrollado en NodeJS utilizando Express y TypeScript. La arquitectura del proyecto sigue los principios de Clean Architecture y utiliza el patrón de diseño Adaptador para desacoplar las dependencias y facilitar la escalabilidad y mantenibilidad del código.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
backend-server/
├── database/
│   ├── models/
│   │   ├── doctor.model.ts
│   │   ├── hospital.model.ts
│   │   └── user.model.ts
│   └── mongo-database.ts
├── public/
│   └── index.html
├── src/
│   ├── application/
│   │   ├── config/
│   │   │   ├── bcrypt.adapter.ts
│   │   │   ├── bcrypt.adapter.test.ts
│   │   │   ├── envs.ts
│   │   │   ├── envs.test.ts
│   │   │   ├── index.ts
│   │   │   ├── jwt.adapter.ts
│   │   │   └── jwt.adapter.test.ts
│   │   ├── middlewares/
│   │   │   ├── global-error-handler.middleware.ts
│   │   │   └── global-error-handler.middleware.test.ts
│   │   ├── server/
│   │   │   ├── routes.ts
│   │   │   ├── server.test.ts
│   │   │   └── server.ts
│   │   └── app.ts
│   ├── domain/
│   │   ├── model/
│   │   │   ├── auth/
│   │   │   │   ├── auth.model.ts
│   │   │   │   ├── gateway/
│   │   │   │   │   └── auth.gateway.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── login.model.ts
│   │   │   ├── doctor/
│   │   │   │   ├── create-doctor-request.model.ts
│   │   │   │   ├── doctor.model.ts
│   │   │   │   ├── gateway/
│   │   │   │   │   └── doctor.gateway.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── update-doctor-request.model.ts
│   │   │   ├── exceptions/
│   │   │   │   ├── bussines.exception.ts
│   │   │   │   └── technical.exception.ts
│   │   │   ├── hospital/
│   │   │   │   ├── gateway/
│   │   │   │   │   └── hospital-gateway.ts
│   │   │   │   ├── hospital.model.ts
│   │   │   │   └── index.ts
│   │   │   ├── user/
│   │   │   │   ├── gateway/
│   │   │   │   │   └── user.gateway.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── user.model.ts
│   │   └── usecases/
│   │       ├── auth/
│   │       │   └── auth.usecase.ts
│   │       ├── doctor/
│   │       │   └── doctor.usecases.ts
│   │       ├── hospital/
│   │       │   └── hospital.usecase.ts
│   │       └── user/
│   │           └── user.usecase.ts
│   ├── infrastructure/
│   │   ├── adapters/
│   │   │   ├── auth/
│   │   │   │   └── auth-adapter.mongo.ts
│   │   │   ├── doctor/
│   │   │   │   ├── doctor-adapter.mongo.ts
│   │   │   │   └── dto/
│   │   │   │       └── create-doctor.dto.ts
│   │   │   ├── hospital/
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-hospital.dto.ts
│   │   │   │   │   └── update-hospital.dto.ts
│   │   │   │   └── hospital-adapter.mongo.ts
│   │   │   └── user/
│   │   │       ├── dto/
│   │   │       │   ├── create-user.dto.ts
│   │   │       │   ├── index.ts
│   │   │       │   ├── login-user.dto.ts
│   │   │       │   └── update-user.dto.ts
│   │   │       └── user-adapter.mongo.ts
│   │   ├── entry-point/
│   │   │   ├── auth/
│   │   │   │   ├── controller.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── routes.ts
│   │   │   ├── doctor/
│   │   │   │   ├── controller.ts
│   │   │   │   └── routes.ts
│   │   │   ├── hospital/
│   │   │   │   ├── controller.ts
│   │   │   │   └── routes.ts
│   │   │   └── user/
│   │   │       ├── controller.ts
│   │   │       └── routes.ts
│   │   └── middlewares/
│   │       ├── valid-id.middleware.ts
│   │       └── valid-jwt.middleware.ts
├── .env.template
├── .gitignore
├── nodemon.json
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

## Tecnologías Utilizadas

- **NodeJS**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir aplicaciones web y APIs.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Mongoose**: ODM para MongoDB.
- **Jest**: Framework de pruebas para JavaScript.
- **Supertest**: Biblioteca para pruebas de integración de APIs.

## Arquitectura

### Clean Architecture

La Clean Architecture se basa en la separación de responsabilidades en diferentes capas, lo que facilita la mantenibilidad y escalabilidad del código. Las capas principales son:

1. **Domain**: Contiene la lógica de negocio y las entidades del dominio.
2. **Application**: Contiene los casos de uso y la lógica de aplicación.
3. **Infrastructure**: Contiene las implementaciones de los adaptadores y los Entry Point donde se encuentran los controladores y las rutas de la API.

### Patrón Adaptador

El patrón Adaptador se utiliza para desacoplar la lógica de negocio de la infraestructura. Esto permite cambiar la implementación de la infraestructura sin afectar la lógica de negocio.

## Configuración del Proyecto

### Variables de Entorno

El proyecto utiliza variables de entorno para configurar diferentes aspectos de la aplicación. Las variables de entorno se definen en el archivo

.env.template

:

```template
PORT=3001
DB_HOST=mongodb+srv://<user>:<password>@gestiondinero.kvajf.mongodb.net/
DB_NAME=hospitaldb
PUBLIC_PATH=public
JWT_SECRET=secret_para_jwt
JWT_EXPIRES=1d
```

### Instalación de Dependencias

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

### Scripts de NPM

- **`npm run build`**: Compila el código TypeScript y genera los archivos en la carpeta dist.
- **`npm run start`**: Compila el código y luego inicia el servidor.
- **`npm run dev`**: Inicia el servidor en modo desarrollo utilizando `nodemon`.
- **`npm run test`**: Ejecuta las pruebas utilizando jest.
- **`npm run test:watch`**: Ejecuta las pruebas en modo watch.
- **`npm run test:cov`**: Ejecuta las pruebas y genera un reporte de cobertura.

## Ejecución del Proyecto

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Para ejecutar el proyecto en modo producción, utiliza el siguiente comando:

```bash
npm run start
```

## Pruebas

El proyecto utiliza jest y `supertest` para realizar pruebas unitarias y de integración. Las pruebas se encuentran en la carpeta src junto a los archivos que prueban.

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
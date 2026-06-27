## Descripción del Proyecto (Arquitectura de Microservicios en la Nube)

Este proyecto consiste en una arquitectura distribuida basada en **microservicios**, diseñada para ser altamente escalable, tolerante a fallos y desplegada íntegramente en la nube de **AWS (Amazon Web Services)**. Cada componente ha sido desarrollado de forma independiente y desacoplada para optimizar el rendimiento y facilitar el mantenimiento del sistema.

### Arquitectura y Servicios AWS Implementados:

* **Distribución y Frontend (S3 + CloudFront):** El frontend está alojado de forma estática en **Amazon S3** y se distribuye globalmente mediante la CDN de **CloudFront**, garantizando tiempos de carga mínimos a nivel mundial y seguridad integrada con HTTPS.
* **Orquestación de Microservicios (ECS & ECR):** Cada microservicio está dockerizado de manera independiente. Las imágenes de los contenedores se gestionan de forma segura en **Amazon ECR** (Elastic Container Registry) y son ejecutadas y orquestadas por **Amazon ECS** (Elastic Container Service), permitiendo escalar horizontalmente cada microservicio de forma autónoma según su demanda.
* **Persistencia de Datos (Amazon RDS):** Uso de una base de datos relacional administrada para asegurar la integridad, alta disponibilidad y un correcto aislamiento de datos conforme a las buenas prácticas de sistemas distribuidos.
* **Optimización y Rendimiento (Amazon ElastiCache):** Implementación de una capa de caché en memoria para reducir la latencia en la comunicación entre servicios y acelerar significativamente las consultas más recurrentes a la base de datos.
* **Seguridad y Roles (IAM Roles):** Toda la infraestructura y la comunicación interservicios está protegida bajo el principio de menor privilegio utilizando **IAM Roles**, asegurando que cada microservicio solo tenga acceso a los recursos de AWS estrictamente necesarios.

# Reto IBM | Sistema de elecciones en México - hackmx2021

# Suposiciones, puntos clave, objetivos y lo que esta fuera

Para reducir el alcance de nuestro proyecto, se establecieron límites de lo que queremos hacer. Al igual que lo que debe de tener obligatoriamente, como aquello que no cubre nuestra propuesta.

## Suposiciones
* Se tienen recursos vastos para llevar a cabo el proyecto
  * Recursos siendo poder económico, capital humano, equipo de cómputo
* Se tiene accesos a datos relacionados del Instituto Nacional Electoral (INE)
* Los datos deben quedarse en territorio nacional
* Los votos deben ser secretos, pero la cantidad de votos no

## Puntos clave
* Seguridad debe ser la prioridad mayor
  * Esto es en todos los puntos y conexiones entre los mismos del sistema
* Transparencia es algo a promover para los ciudadanos

## Objetivos

En general, el objetivo es proponer un sistema viable. Con sistema no nos referimos a uno computacional, si no al conjunto de actores y sus interacciones relacionadas con las elecciones como toda una unidad. Y con viable no queremos decir un producto viable mínimo (MVP en sus siglas en inglés), que en nuestra opinión se queda corto de lo que sería requisito para su implementación real. Preferimos utilizar el termino simple adorable completo (SLC en sus siglas en inglés). Es decir, que este no tenga que ir sumando funcionalidades, si no que todo este completamente funcional.

El sistema debe poder ser replicable en distintas regiones del país. Aunque conocemos las limitaciones, y en ciertas áreas reconocemos que la implementación no podría ser posible, teniendo que recurrir a otro tipo de sistema (como el que actualmente existe).


## Fuera del alcance
* Datos biométricos, especialmente reconocimiento facial
* Faltas a la integridad humana tales como la extorsión o el soborno, o prácticas no éticas en el ejercicio del servicio público

# Diagramas
Para poder visualizar el sistema sin entrar en detalles, tenemos los siguientes diagramas.
Estos representan la arquitectura propuesta por nuestro equipo. Algunas de las partes no se implementan por falta de tiempo.

## Arquitectura
### Panorama General
![Alt text](docs/diagrams/architecture_1.png?raw=true)
### Blockchain
![Alt text](docs/diagrams/architecture_2.png?raw=true)

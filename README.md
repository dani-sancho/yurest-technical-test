# YurestTechnicalTest

## Librerías usadas

- TailwindCss - Para estilos. Me evitó crear los estilos a mano y aproveché ese tiempo en otras partes del desarrollo.
- json-server - Para la API mock. He instalado una versión anterior a la beta dado que las nuevas no aceptan id´s numéricos, solo strings.

## Trade offs

- Traducciones y textos hard-coded en componentes de la vista. No me gusta que un componente tenga más de una responsabilidad, y en este caso los textos los he dejado a mano por agilizar el desarrollo, aunque lo ideal sería separarlos en un sistema de i18n.
- Habría sido más limpio usar una librería de componentes como angular material por ejemplo, pero me ha dado respeto el posible consumo de tiempo a la hora de instalar/configurar/estilar los componentes, y he optado por hacerlo todo con tailwind a mano. Hay algunas partes que deberían estar como componentes (ejemplo: los inputs de formulario), pero ha sido la misma razón: no saber cuánto me ib a consumir de tiempo.
- Ha faltado añadir ordenación y un poco más de cariño al responsive.
- Namings de variables, hay algunas que son una letra o algo muy acortado, no me gusta acortar tanto y que exista screaming.
- No he podido probar la instalación de Docker debido a que justo cuando he ido a instalarlo, había una actualización de windows... Lo probaré luego de la entrega, espero que haya funcionado todo.
- He desarrollado la arquitectura clean code y, aunque lo tenía todo preparado para usar los use-cases, me he liado a arreglar ciertos comportamientos que me han comido demasiado tiempo y al final las llamadas no pasan por ahí. En una implementación real no habría ninguna llamada de presentation hacia ningún lado que no pasara por use-case, y aquí al final no ha sido así, aunque la estructura está lista para hacerse. El cambio sería cambiar las llamadas de los get/put, etc de presentation/* a cada use-case, y así evitar el acoplamiento que ha resultado.

## Desarrollo

- He optado por json-server por ser algo bastante cercano a una implementación real.
- Asimismo, como he optado por la clean architecture, el pasar del mock a un endpoint real en mongo por ejemplo, sólo haría falta modificar la capa data/database.
- Aunque el número de datos es muy bajo, he visto oportuno añadir paginación y ordenamientos de cara a una posible escalabilidad.

## ¿Qué mejoraría de cara a una implementación real?

- Revisar a fondo todos los estilos e implementaciones, ya que he tenido que recortar tiempos implementando un refactor con la IA al diseño, y no me gusta depender ciegamente en ello.
- Implementar testings.
- Implementer un environment para producción, con su api-rest real, y base de datos.
- Implementar paginación.
- Implementar dark mode.
- Mejorar usabilidad, SEO y accesibilidad. El cursor-pointer en todo lo clicable por ejemplo, me ha faltado por añadir en varios sitios.
- Poner comentarios explicativos estilo JSDOC.
- Mejorar namings en variables y métodos. He pecado un poco de ir corriendo y he acortado muchas nomenclaturas.
- Mejorar las tablas de la base de datos. No usaría nombre de clientes, sino una tabla clientes, lo mismo para otros campos del estilo.

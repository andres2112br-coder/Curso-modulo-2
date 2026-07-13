# Fundamentos de HTML y CSS

Cuatro páginas web que recorren los fundamentos del desarrollo front-end: estructura semántica, hojas de estilo externas y adaptación a distintos tamaños de pantalla.

## Contenido

| Página | Concepto |
|---|---|
| `ejercicio1.html` | Estructura básica de un documento HTML5 |
| `ejercicio2.html` | Etiquetas de contenido: encabezados, párrafos, listas |
| `ejercicio3.html` | Enlaces, imágenes y atributos |
| `ejercicio4.html` | Hoja de estilos externa enlazada con `<link>` |

## Decisiones de diseño

- **CSS en archivo externo, no en línea.** Separar estructura (HTML) de presentación (CSS) permite cambiar el aspecto de todas las páginas editando un solo archivo.
- **`<meta name="viewport">`** en todas las páginas → base para que se vean correctamente en móvil.
- **`<!DOCTYPE html>` y `lang="es"`** → documento HTML5 válido y accesible para lectores de pantalla y buscadores.

## Cómo verlo

Abre cualquiera de los archivos `.html` en el navegador. No requiere servidor.

```bash
# O con un servidor local:
python -m http.server 8000
```

## Próximos pasos

- [ ] Media queries para diseño responsive real
- [ ] Flexbox y CSS Grid para la maquetación
- [ ] Formulario con validación

## Qué aprendí

La diferencia entre marcar el *contenido* y describir su *apariencia*, y por qué mezclarlos (con estilos en línea) hace que un sitio sea imposible de mantener en cuanto pasa de tres páginas.

## Tecnologías

`HTML5` · `CSS3` · `Hojas de estilo externas`

---
Andrés Barros · Estudiante de Ingeniería de Sistemas

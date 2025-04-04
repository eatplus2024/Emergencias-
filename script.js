// script.js - Aplicación de Números de Emergencia
// -----------------------------------------------
// Este script genera una lista de números de emergencia
// con botones para llamar y compartir.
//
// INSTRUCCIONES PARA GITHUB:
// 1. Sube estos archivos (index.html, styles.css, script.js) a tu repositorio
// 2. Activa GitHub Pages en la configuración del repositorio
// 3. Selecciona la rama principal como fuente
// 4. Tu sitio estará disponible en https://[tu-usuario].github.io/[nombre-repo]
//
// PERSONALIZACIÓN:
// Puedes modificar la lista de contactos de emergencia editando
// el array 'contacts' a continuación.

document.addEventListener("DOMContentLoaded", () => {
  // Lista de contactos de emergencia
  // Modifica esta lista según tus necesidades
  const contacts = [
    {
      name: "Emergencias",
      number: "911",
      description: "Número general de emergencias",
    },
    {
      name: "Bomberos",
      number: "100",
      description: "Servicio de bomberos",
    },
    {
      name: "Policía",
      number: "101",
      description: "Policía nacional",
    },
    {
      name: "Ambulancia",
      number: "107",
      description: "Servicio médico de emergencia",
    },
    {
      name: "Defensa Civil",
      number: "103",
      description: "Protección civil",
    },
    {
      name: "Violencia de Género",
      number: "144",
      description: "Línea de ayuda contra violencia de género",
    },
  ]

  const emergencyContactsContainer = document.getElementById("emergency-contacts")

  // Generar HTML para cada contacto
  contacts.forEach((contact, index) => {
    const contactElement = document.createElement("div")
    contactElement.className = "contact"

    contactElement.innerHTML = `
            <div class="contact-name">${contact.name}</div>
            <div class="contact-number">${contact.number}</div>
            <div class="contact-description">${contact.description}</div>
            <div class="buttons">
                <a href="tel:${contact.number}" class="btn btn-call">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Llamar
                </a>
                <button class="btn btn-share" data-contact='${JSON.stringify(contact)}'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    Compartir
                </button>
            </div>
        `

    // Añadir divisor entre contactos (excepto el último)
    if (index < contacts.length - 1) {
      const divider = document.createElement("div")
      divider.className = "divider"
      contactElement.appendChild(divider)
    }

    emergencyContactsContainer.appendChild(contactElement)
  })

  // Configurar funcionalidad de compartir
  document.querySelectorAll(".btn-share").forEach((button) => {
    button.addEventListener("click", async function () {
      const contact = JSON.parse(this.getAttribute("data-contact"))

      const shareData = {
        title: "Número de Emergencia",
        text: `${contact.name}: ${contact.number} - ${contact.description}`,
        url: window.location.href,
      }

      try {
        if (navigator.share) {
          // Usar Web Share API si está disponible
          await navigator.share(shareData)
        } else {
          // Alternativa: compartir vía WhatsApp
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text)}`
          window.open(whatsappUrl, "_blank")
        }
      } catch (error) {
        console.error("Error al compartir:", error)
        alert("No se pudo compartir. Intenta copiar manualmente el número.")
      }
    })
  })

  // Instrucciones en la consola para desarrolladores
  console.log(
    "%c Números de Emergencia - Instrucciones de Uso %c\n" +
      "------------------------------------------------\n" +
      "1. Para añadir nuevos números, edita el array 'contacts' en script.js\n" +
      "2. Para cambiar estilos, modifica el archivo styles.css\n" +
      "3. Para alojar en GitHub Pages:\n" +
      "   - Sube estos archivos a un repositorio\n" +
      "   - Activa GitHub Pages en la configuración\n" +
      "   - Tu sitio estará disponible en https://[usuario].github.io/[repo]",
    "background: #f44336; color: white; font-size: 14px; padding: 5px;",
    "font-size: 12px;",
  )
})


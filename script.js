document.addEventListener("DOMContentLoaded", () => {
  const contacts = [
    {
      id: 1,
      name: "Emergencias",
      number: "911",
      description: "Número general de emergencias",
    },
    {
      id: 2,
      name: "Bomberos",
      number: "100",
      description: "Servicio de bomberos",
    },
    {
      id: 3,
      name: "Policía",
      number: "101",
      description: "Policía nacional",
    },
    {
      id: 4,
      name: "Ambulancia",
      number: "107",
      description: "Servicio médico de emergencia",
    },
    {
      id: 5,
      name: "Defensa Civil",
      number: "103",
      description: "Protección civil",
    },
    {
      id: 6,
      name: "Violencia de Género",
      number: "144",
      description: "Línea de ayuda contra violencia de género",
    },
  ]

  const emergencyContactsContainer = document.getElementById("emergency-contacts")

  // Render emergency contacts
  contacts.forEach((contact) => {
    const contactCard = createContactCard(contact)
    emergencyContactsContainer.appendChild(contactCard)
  })

  // Function to create a contact card
  function createContactCard(contact) {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
            <div class="card-header">
                <div class="card-title">${contact.name}</div>
            </div>
            <div class="card-content">
                <div class="number">${contact.number}</div>
                <div class="description">${contact.description}</div>
            </div>
            <div class="card-footer">
                <button class="btn btn-call" data-number="${contact.number}">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Llamar
                </button>
                <button class="btn btn-share" data-contact='${JSON.stringify(contact)}'>
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    return card
  }

  // Add event listeners for call buttons
  document.querySelectorAll(".btn-call").forEach((button) => {
    button.addEventListener("click", function () {
      const number = this.getAttribute("data-number")
      window.location.href = `tel:${number}`
    })
  })

  // Add event listeners for share buttons
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
          await navigator.share(shareData)
        } else {
          // Fallback for browsers that don't support Web Share API
          // WhatsApp specific sharing
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text)}`
          window.open(whatsappUrl, "_blank")
        }
      } catch (error) {
        console.error("Error sharing:", error)
      }
    })
  })
})


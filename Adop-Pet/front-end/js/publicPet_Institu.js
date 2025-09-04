document.addEventListener("DOMContentLoaded", () => {
  const API_CONFIG = {
    baseURL: "http://adop-pet.com",
    endpoints: {
      addPet: "/api/institution/add_pet.php",
    },
  }

  const addPetForm = document.getElementById("addPetForm")
  const photoInput = document.getElementById("photos")
  const photoPreview = document.getElementById("photoPreview")
  const addVaccineBtn = document.getElementById("addVaccineBtn")
  const vaccineContainer = document.getElementById("vaccineContainer")
  const formMessage = document.getElementById("formMessage")
  const submitBtn = document.getElementById("submitBtn")

  photoInput.addEventListener("change", () => {
    photoPreview.innerHTML = ""
    const files = Array.from(photoInput.files)

    if (files.length > 5) {
      showMessage("Máximo 5 fotos permitidas", "error")
      photoInput.value = ""
      return
    }

    files.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imgContainer = document.createElement("div")
        imgContainer.style.position = "relative"

        const img = document.createElement("img")
        img.src = e.target.result
        img.style.transition = "transform 0.3s ease"

        const removeBtn = document.createElement("button")
        removeBtn.innerHTML = "×"
        removeBtn.style.cssText = `
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: #ef4444;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    font-weight: bold;
                `

        removeBtn.onclick = () => {
          imgContainer.remove()
          // Remove file from input (simplified approach)
        }

        imgContainer.appendChild(img)
        imgContainer.appendChild(removeBtn)
        photoPreview.appendChild(imgContainer)
      }
      reader.readAsDataURL(file)
    })
  })

  addVaccineBtn.addEventListener("click", () => {
    const vaccineRow = document.createElement("div")
    vaccineRow.className = "vaccine-row"
    vaccineRow.innerHTML = `
            <div class="form-group">
                <label>Nombre de la vacuna</label>
                <input type="text" class="vaccine-name" placeholder="Ej: Rabia, Parvovirus" required>
            </div>
            <div class="form-group">
                <label>Fecha de aplicación</label>
                <input type="date" class="vaccine-date" required>
            </div>
            <button type="button" class="remove-btn">
                <i class="fas fa-trash"></i>
            </button>
        `
    vaccineContainer.appendChild(vaccineRow)

    // Add animation
    vaccineRow.style.opacity = "0"
    vaccineRow.style.transform = "translateY(-20px)"
    setTimeout(() => {
      vaccineRow.style.transition = "all 0.3s ease"
      vaccineRow.style.opacity = "1"
      vaccineRow.style.transform = "translateY(0)"
    }, 10)
  })

  vaccineContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn") || e.target.closest(".remove-btn")) {
      const row = e.target.closest(".vaccine-row")
      row.style.transition = "all 0.3s ease"
      row.style.opacity = "0"
      row.style.transform = "translateX(-100%)"
      setTimeout(() => row.remove(), 300)
    }
  })

  addPetForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setLoadingState(true)

    // ... existing code for form data collection ...

    const vaccines = []
    document.querySelectorAll(".vaccine-row").forEach((row) => {
      const name = row.querySelector(".vaccine-name").value
      const date = row.querySelector(".vaccine-date").value
      if (name && date) {
        vaccines.push({ name, date })
      }
    })

    const userData = JSON.parse(localStorage.getItem("userData"))
    if (!userData || !userData.id) {
      showMessage("Error: No se pudo identificar la institución. Por favor, inicia sesión de nuevo.", "error")
      setLoadingState(false)
      return
    }

    const formData = new FormData(addPetForm)
    formData.append("institutionId", userData.id)
    formData.append("vaccines", JSON.stringify(vaccines))

    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.addPet}`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Ocurrió un error.")
      }

      showMessage("¡Mascota registrada con éxito! 🎉", "success")
      resetForm()
    } catch (error) {
      showMessage(`Error: ${error.message}`, "error")
    } finally {
      setLoadingState(false)
    }
  })

  function validateForm() {
    const requiredFields = addPetForm.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ef4444"
        isValid = false
      } else {
        field.style.borderColor = "#d1d5db"
      }
    })

    if (!isValid) {
      showMessage("Por favor, completa todos los campos obligatorios", "error")
    }

    return isValid
  }

  function setLoadingState(loading) {
    submitBtn.disabled = loading
    if (loading) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...'
    } else {
      submitBtn.innerHTML = '<i class="fas fa-heart"></i> Registrar Mascota'
    }
  }

  function showMessage(message, type) {
    formMessage.textContent = message
    formMessage.className = `form-message ${type}`
    formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  function resetForm() {
    addPetForm.reset()
    photoPreview.innerHTML = ""
    vaccineContainer.innerHTML = ""
    formMessage.textContent = ""
    formMessage.className = "form-message"
  }
})

function logout() {
  localStorage.removeItem("userData")
  localStorage.removeItem("userType")
  window.location.href = "/front-end/html/login.html"
}

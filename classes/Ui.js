import { eliminarCita, cargarEdicion } from '../js/funciones.js'
import { contenedorCitas } from '../js/selectores.js'

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div')
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'font-weight-bold')

    // agregar clase en base al tipo de error
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger')
    } else {
      divMensaje.classList.add('alert-success')
    }

    // mensaje de error
    divMensaje.textContent = mensaje

    // agregar al DOM
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

    // quitar la alerta luego de 5 segundos
    setTimeout(() => {
      divMensaje.remove()
    }, 5000)
  }
  imprimirCitas(citas) {
    this.limpiarHTML(contenedorCitas)
    citas.citas.forEach((cita) => {
      const { fecha, hora, id, mascota, propietario, sintomas, telefono } = cita
      const divContenedor = document.createElement('div')
      divContenedor.style = `
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.5em;
      padding: 1.5em;
      background: #ffffff;
      `
      divContenedor.innerHTML = `
      <h1><b>${mascota}</b></h1>
      <p><b>Propietario: </b> <span>${propietario}</span></p>
      <p><b>Teléfono: </b> <span>${telefono}</span></p> 
      <p><b>Fecha: </b> <span>${fecha}</span></p> 
      <p><b>Hora: </b> <span>${hora}</span></p> 
      <p><b>Sintomas: </b> <span>${sintomas}</span></p> 
      `

      // se agrega información de la cita
      contenedorCitas.appendChild(divContenedor)

      const contenedorBtns = document.createElement('div')
      contenedorBtns.className = 'contenedor-btns'
      contenedorBtns.style = `
        display: flex;
        column-gap: 0.5em;
      `

      // button delete cita
      const btnDelete = document.createElement('button')
      btnDelete.className = 'delete-cita'
      btnDelete.innerHTML = `Eliminar`
      btnDelete.style = `
       padding: .4em 1em;
       border: none;
       border-radius: 5em;
       font-weight: bold;
       font-size: .9em;
       background: #ff2360; 
       color: white;
       `
      btnDelete.onclick = () => eliminarCita(id)

      // // button editar cita
      const btnEdit = document.createElement('button')
      btnEdit.className = 'editar-cita'
      btnEdit.innerHTML = `Editar`
      btnEdit.style = `
        padding: .4em 1em;
        border: none;
        border-radius: 1.3em;
        font-weight: bold;
        font-size: .9em;
        background: #1d58ff;
        color: white;
        `
      btnEdit.onclick = () => cargarEdicion(cita)

      contenedorBtns.appendChild(btnDelete)
      contenedorBtns.appendChild(btnEdit)

      //  se agregan los btns
      divContenedor.appendChild(contenedorBtns)
    })
  }
  limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild)
    }
  }
}
export default UI

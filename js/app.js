// variables
const mascotaInput = document.getElementById('mascota')
const propietarioInput = document.getElementById('propietario')
const telefonoInput = document.getElementById('telefono')
const inputFecha = document.getElementById('fecha')
const horaInput = document.getElementById('hora')
const sintomasInput = document.getElementById('sintomas')

// UI

const formulario = document.getElementById('nueva-cita')
const contenedorCitas = document.getElementById('citas')

let editando

// clases

class Citas {
  constructor() {
    this.citas = []
  }
  agregarCita(citas) {
    this.citas = [...this.citas, citas]
  }
  eliminarCita(idCita) {
    this.citas = this.citas.filter(({ id }) => id != idCita)
  }
  editarCita(citaActualizada){
    console.log(citaActualizada)
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita)
  }
}

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

const ui = new UI()
const administrarCitas = new Citas()

//eventos
eventListeners()
function eventListeners() {
  mascotaInput.addEventListener('input', datosCitas)
  propietarioInput.addEventListener('input', datosCitas)
  telefonoInput.addEventListener('input', datosCitas)
  inputFecha.addEventListener('input', datosCitas)
  horaInput.addEventListener('input', datosCitas)
  sintomasInput.addEventListener('input', datosCitas)

  formulario.addEventListener('submit', nuevaCita)
}

const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
}

//funciones

function datosCitas(e) {
  citaObj[e.target.name] = e.target.value
}

// valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault()

  // extraer la informacion del objeto cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj

  // validar
  if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los cambios son obligatorios', 'error')
    return
  }

  if (editando) {
    ui.imprimirAlerta('Los cambios se han guardado correctamente')

    administrarCitas.editarCita({...citaObj})


    formulario.querySelector('button[type="submit"]').textContent = 'Crear cita'

    editando = false
  } else {
    citaObj.id = Date.now()
    // creando una cita
    administrarCitas.agregarCita({ ...citaObj })

    ui.imprimirAlerta('La cita se ha creado correctamente')
  }

  // reiniciar el objeto para la validación
  reiniciarObjeto()

  // reinicia el formulario
  formulario.reset()

  // mostrar el HTML de las citas

  ui.imprimirCitas(administrarCitas)
}

function reiniciarObjeto() {
  citaObj.mascota = ''
  citaObj.propietario = ''
  citaObj.telefono = ''
  citaObj.fecha = ''
  citaObj.hora = ''
  citaObj.sintomas = ''
}

function eliminarCita(id) {
  console.log(id)

  //llamamos la funcion que eliminara la cita

  administrarCitas.eliminarCita(id)

  //mostrar mensaje de cita eliminada
  ui.imprimirAlerta('Se ha eliminado la cita')

  //imprimir las citas nuevamente
  ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita) {
  // extraer la informacion del objeto cita

  const { fecha, hora, id, mascota, propietario, sintomas, telefono } = cita

  mascotaInput.value = mascota
  propietarioInput.value = propietario
  telefonoInput.value = telefono
  inputFecha.value = fecha
  horaInput.value = hora
  sintomasInput.value = sintomas
  citaObj.id = id

  citaObj.mascota = mascota
  citaObj.propietario = propietario
  citaObj.telefono = telefono
  citaObj.fecha = fecha
  citaObj.hora = hora
  citaObj.sintomas = sintomas
  citaObj.id = id

  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

  editando = true
}

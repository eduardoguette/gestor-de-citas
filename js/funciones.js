import Citas from '../classes/Citas.js'
import UI from '../classes/Ui.js'

import { mascotaInput, propietarioInput, telefonoInput, inputFecha, horaInput, sintomasInput, formulario } from './selectores.js'

const ui = new UI()
const administrarCitas = new Citas()

let editando
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
}
//funciones

export function datosCitas(e) {
  citaObj[e.target.name] = e.target.value
}

// valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
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

    administrarCitas.editarCita({ ...citaObj })

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

export function reiniciarObjeto() {
  citaObj.mascota = ''
  citaObj.propietario = ''
  citaObj.telefono = ''
  citaObj.fecha = ''
  citaObj.hora = ''
  citaObj.sintomas = ''
}

export function eliminarCita(id) {
  console.log(id)

  //llamamos la funcion que eliminara la cita

  administrarCitas.eliminarCita(id)

  //mostrar mensaje de cita eliminada
  ui.imprimirAlerta('Se ha eliminado la cita')

  //imprimir las citas nuevamente
  ui.imprimirCitas(administrarCitas)
}

export function cargarEdicion(cita) {
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

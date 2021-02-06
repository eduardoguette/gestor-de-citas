import { datosCitas, nuevaCita } from '../js/funciones.js'
import { mascotaInput, propietarioInput, telefonoInput, inputFecha, horaInput, formulario, sintomasInput } from '../js/selectores.js'

class App {
  constructor() {
    this.initApp()
  }
  initApp() {
    mascotaInput.addEventListener('input', datosCitas)
    propietarioInput.addEventListener('input', datosCitas)
    telefonoInput.addEventListener('input', datosCitas)
    inputFecha.addEventListener('input', datosCitas)
    horaInput.addEventListener('input', datosCitas)
    sintomasInput.addEventListener('input', datosCitas)
    // formulario para nuevas citas
    formulario.addEventListener('submit', nuevaCita)
  }
}

export default App

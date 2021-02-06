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
export default Citas;
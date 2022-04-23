import mongoose from 'mongoose'

const estudiantesEsquema = new mongoose.Schema({
  nombre: { type: String, require: true, max: 100 },
  apellido: { type: String, require: true, max: 100 },

  dni: { type: String, require: true, max: 100 },
})

export const modelsUsuarios = mongoose.model('usuarios', estudiantesEsquema)

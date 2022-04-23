import mongoose from 'mongoose'
import { modelsUsuarios } from './models/modelsUsuarios.js'

CRUD()
async function CRUD() {
  try {
    const URL =
      'mongodb+srv://agusnrossi:Tottenham31@cluster0.yrwhz.mongodb.net/ecommerce?retryWrites=true&w=majority'
    let rta = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('base de datos conectada')
    await modelsUsuarios.create({
      nombre: 'Federico',
      apellido: 'Perez',
      dni: '320118321',
    })
    console.log(await modelsUsuarios.find())
    console.log(await modelsUsuarios.estimatedDocumentCount())
  } catch (e) {
    console.log(e)
  }
}

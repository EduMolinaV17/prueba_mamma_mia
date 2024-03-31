import { createContext, useEffect, useState } from 'react'

export const PizzasContext = createContext()

const PizzasContextProvider = ({ children }) => {
  const [datosPizzas, setDatosPizzas] = useState([])
  const [totalPizzas, setTotalPizzas] = useState(0)
  const obtenerPizzas = async () => {
    const res = await fetch('/pizzas.json')
    const datos = await res.json()
    const nuevoDato = datos.map((pizza) => ({ ...pizza, cantidad: 0 }))
    setDatosPizzas(nuevoDato)
  }
  useEffect(() => {
    obtenerPizzas()
  }, [])
  const sumando = (id) => {
    const sumaPizza = datosPizzas.map((pizza) => {
      if (pizza.id === id) {
        return ({ ...pizza, cantidad: pizza.cantidad + 1 })
      }
      return pizza
    })
    setDatosPizzas(sumaPizza)
  }
  const restando = (id) => {
    const restaPizza = datosPizzas.map((pizza) => {
      if (pizza.id === id) {
        return ({ ...pizza, cantidad: pizza.cantidad - 1 })
      }
      return pizza
    })
    setDatosPizzas(restaPizza)
  }
  const calculando = (datosPizzas) => {
    let total = 0
    datosPizzas?.map((datoPizza) => {
      return (total = total + (datoPizza.price * datoPizza.cantidad))
    })
    setTotalPizzas(total.toLocaleString('es-CL'))
  }
  useEffect(() => {
    calculando(datosPizzas)
  }, [datosPizzas])
  const globalState = { datosPizzas, sumando, restando, totalPizzas }
  return (
    <PizzasContext.Provider value={globalState}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasContextProvider

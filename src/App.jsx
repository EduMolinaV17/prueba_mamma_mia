import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PizzasContextProvider from './context/PizzasContext'
import { Carrito, Home, NotFound, Pizza } from './views'
import Navegacion from './components/Navegacion'
const App = () => {
  return (
    <BrowserRouter>
      <>
        <PizzasContextProvider>
          <Navegacion />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pizza/:id' element={<Pizza />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </PizzasContextProvider>
      </>
    </BrowserRouter>
  )
}

export default App

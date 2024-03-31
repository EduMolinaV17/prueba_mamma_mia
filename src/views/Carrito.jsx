import { useContext } from 'react'
import { PizzasContext } from '../context/PizzasContext'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

const Carrito = () => {
  const { datosPizzas, sumando, restando, totalPizzas } = useContext(PizzasContext)
  const filtrandoPizzas = datosPizzas.filter((element) => element.cantidad > 0)
  const navigate = useNavigate()
  const verPizzaDetalles = (id) => {
    navigate(`/pizza/${id}`)
  }
  const handleHouse = () => {
    navigate('/')
  }
  const handleSuma = (id) => {
    sumando(id)
    toast.success('Pizza agregada al carrito', {
      position: 'top-right',
      duration: 1000,
      style: { backgroundColor: 'black', color: 'white' }
    })
  }
  const handleResta = (id) => {
    restando(id)
    toast.error('Pizza quitada del carrito', {
      position: 'top-right',
      duration: 1000,
      style: { backgroundColor: 'black', color: 'white' }
    })
  }
  const handlePagar = (pizzas) => {
    if (pizzas > 0) {
      Swal.fire({
        title: '¡Estás de suerte!',
        text: 'Tu pedido de hoy es gratis retirando en el local! 😋🍕',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    } else {
      Swal.fire({
        title: 'Debes agregar pizzas al carrito',
        text: 'Para agregar pizzas regresa al Home',
        icon: 'error',
        confirmButtonText: 'Volver al Home'
      }).then((result) => {
        if (result.isConfirmed) {
          handleHouse()
        }
      })
    }
  }
  return (
    <>
      <Container className='pt-5'>
        <h3>Detalles del Pedido</h3>
        <div className='d-flex justify-content-center'>
          <div className='m-3 border p-4' style={{ width: '100vw' }}>
            {filtrandoPizzas.map((filtroPizza) => (
              <div key={filtroPizza.id}>
                <div className='d-flex justify-content-between w-100'>
                  <div className='d-flex gap-2 justify-content-start align-items-center'>
                    <img src={filtroPizza.img} alt='' style={{ width: '180px', cursor: 'pointer', paddingLeft: '20px' }} onClick={() => verPizzaDetalles(filtroPizza.id)} />
                    <h6 className='m-0 text-capitalize'>{filtroPizza.name}</h6>
                  </div>
                  <Col md={6} className='d-flex justify-content-end align-items-center'>
                    <div className='text-end'>
                      <Row>
                        <Col>
                          <h5 className='text-dark'>Precio:</h5>
                        </Col>
                        <Col>
                          <h5 className='text-success'>${(filtroPizza.price * filtroPizza.cantidad).toLocaleString('es-CL')}</h5>
                        </Col>
                        <Col>
                          <section style={{ paddingRight: '20px' }} className='d-flex align-items-center justify-content-end'>
                            <Button variant='danger' onClick={() => handleResta(filtroPizza.id)}>-</Button>
                            <span className='mx-2'><h5>{filtroPizza.cantidad}</h5></span>
                            <Button onClick={() => handleSuma(filtroPizza.id)}>+</Button>
                            <Toaster />
                          </section>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </div>
                <hr />
              </div>
            ))}
            <h3>Total: ${totalPizzas}</h3>
            <Button className='btn btn-success' onClick={() => handlePagar(totalPizzas)}>Ir a Pagar</Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Carrito

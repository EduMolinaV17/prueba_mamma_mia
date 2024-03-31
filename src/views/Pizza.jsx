import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PizzasContext } from '../context/PizzasContext'
import { Button, Card, Container, Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

const Pizza = () => {
  const { datosPizzas, sumando } = useContext(PizzasContext)
  const { id } = useParams()
  const pizzaSeleccionada = datosPizzas.find((item) => item.id === id)
  const handleSuma = (id) => {
    sumando(id)
    toast.success('Pizza agregada al carrito', {
      position: 'top-right',
      duration: 1000,
      style: { backgroundColor: 'black', color: 'white' }
    })
  }
  if (!pizzaSeleccionada) {
    return (
      <>
        <Container className='pt-5 d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
          <Spinner animation='border" role="status'>
            <span className='visually-hidden'>Cargando Pizza...</span>
          </Spinner>
        </Container>
      </>
    )
  }

  return (
    <>
      <Container style={{ padding: '50px' }}>
        <Card className='card m-3'>
          <div className='row g-0'>
            <div className='col-md-4 d-flex justify-content-center'>
              <Card.Img src={pizzaSeleccionada.img} className='img-fluid rounded' alt={`Imagen de Pizza ${pizzaSeleccionada.name}`} />
            </div>
            <div className='col-md-8'>
              <Card.Body className='card-body'>
                <Card.Title className='card-title text-capitalize'>
                  {pizzaSeleccionada.name}
                </Card.Title>
                <hr />
                <p className='card-text'>{pizzaSeleccionada.desc}</p>
                <dl>
                  <dt>
                    <p>Ingredientes:</p>
                  </dt>
                  {pizzaSeleccionada.ingredients.map((item) => {
                    return (<dd key={item} className='text-capitalize'>🍕 {item}</dd>)
                  })}
                </dl>
                <div className='card-text d-flex justify-content-between'>
                  <h3>Precio: ${pizzaSeleccionada.price.toLocaleString('es-CL')}</h3>
                  <Button className='btn btn-danger' onClick={() => handleSuma(pizzaSeleccionada.id)}> Añadir 🛒</Button>
                  <Toaster />
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      </Container>
    </>
  )
}

export default Pizza

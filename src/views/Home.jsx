import { useContext } from 'react'
import { PizzasContext } from '../context/PizzasContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
  const { datosPizzas, sumando } = useContext(PizzasContext)
  const navigate = useNavigate()
  const handleClick = (e) => {
    navigate(`/pizza/${e.target.id}`)
  }
  const handleIncrement = () => {
    toast.success('Pizza agregada al carrito', {
      position: 'top-right',
      duration: 1000,
      style: { backgroundColor: 'black', color: 'white' }
    })
  }
  return (
    <>
      <section className='banner pt-5'>
        <h1>¡Pizería Mamma Mia!</h1>
        <h5>¡Tenemos las mejores pizzas que podrás encontrar!</h5>
        <hr style={{ color: 'white', width: '1000px', height: '80px' }} />
      </section>
      <div className='galeria container-fluid'>
        {datosPizzas.map((item) => {
          return (
            <Card key={item.id} className='card' style={{ width: '29rem' }}>
              <Card.Img src={item.img} alt={`Imagen de Pizza ${item.name}`} />
              <Card.Body className='card-body'>
                <Card.Title className='card-text text-capitalize'>
                  <strong>{item.name}</strong>
                </Card.Title>
                <hr />
                <dl>
                  <dt>
                    <p>Ingredientes:</p>
                  </dt>
                  {item.ingredients.map((i) => {
                    return (
                      <dd key={i} className='text-capitalize'>🍕 {i}</dd>
                    )
                  })}
                </dl>
                <hr />
                <h3 className='card-text text-center'>${item.price.toLocaleString('es-CL')}</h3>
                <section className='d-flex justify-content-around'>
                  <Button className='btn btn-info' onClick={handleClick} id={item.id}>
                    Ver Más 👀
                  </Button>
                  <Button className='btn btn-danger' onClick={() => { sumando(item.id); handleIncrement() }}>
                    Añadir 🛒
                  </Button>
                  <Toaster />
                </section>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default Home

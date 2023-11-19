import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'
import { clearCartItems } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  } = useSelector(state => state.cart)
  const user = useSelector(state => state.auth.userInfo._id)
  console.log(user)
  useEffect(() => {
    if (!shippingAddress.address) navigate('/shipping')
    if (!paymentMethod) navigate('/payment')
  }, [shippingAddress, paymentMethod, navigate])
  const placeOrderHandler = async () => {
    try {
      const order = await createOrder({
        user,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/orders/${order._id}`)
      console.log(order)
    } catch (err) {
      toast.error(error)
    }
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Payment Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Order Items:</strong>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>Order Summary</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
              {isLoading && <Loader />}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default PlaceOrderScreen

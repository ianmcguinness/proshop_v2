import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingAddress } = useSelector(state => state.cart)
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])
  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='PayPal or Credit Card'
              value={paymentMethod}
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
export default PaymentScreen

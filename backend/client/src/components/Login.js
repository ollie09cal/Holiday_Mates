import React from 'react'
import Form from 'react-bootstrap/Form'

const Login = () => {

  const handleSubmit = () => {

  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email address:</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <button onSubmit={handleSubmit}>Log me in</button>

        </Form>
      </div>
    </div>
  )
}

export default Login
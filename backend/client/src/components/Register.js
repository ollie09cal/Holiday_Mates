import React from 'react'
import Form from 'react-bootstrap/Form'

const Register = () => {

  const handleSubmit = () => {

  }

  return (
    <div className="register-container">
      <div className="register-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' placeholder='Username' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address:</Form.Label>
            <Form.Control type='email' placeholder='Email' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm your password:</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your Mates code:</Form.Label>
            <Form.Text>Choose your code to connect with your friends. 10-20 characters</Form.Text>
            <Form.Control type='text' placeholder='Mates Code' />
          </Form.Group>

          <Form.Group>
            <Form.Label>Upload your profile picture:</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <button onSubmit={handleSubmit}>Log me in</button>

        </Form>
      </div>
    </div>
  )
}

export default Register
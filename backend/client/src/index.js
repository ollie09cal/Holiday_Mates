import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'

// import 'dotenv/config' // only needs to be added if it doesn't already exist
// import path, { dirname } from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

ReactDOM.render(<App />, document.getElementById('root'))

// unnecessary comment
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import './styles/global.scss'

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error(`Root HTML element is missing!`)
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

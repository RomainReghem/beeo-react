import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import '@fontsource/merriweather/400.css'
import '@fontsource/merriweather-sans/800.css'
import '@fontsource/merriweather-sans/500.css'

const theme = extendTheme({
  fonts:{
    heading:`'Merriweather Sans', sans-serif`,
    body:`'Merriweather'`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'base', // Normally, it is "semibold"
      },
    }
  },
  colors: {    
    bee: {
      50: '#FBF2D4',
      100: '#F7E7AE',
      200: '#F3DD8B',
      300: '#F0D46C',
      400: '#EDCC4F',
      500: '#EAC435',
      600: '#E7BC1B',
      700: '#D3AB16',
      800: '#BE9A14',
      900: '#AB8A12',
    },
    fuzzy:
    {
      50: '#ffe9e9',
      100: '#efc7c8',
      200: '#dda3a6',
      300: '#cd7f84',
      400: '#bd5c61',
      500: '#a34248',
      600: '#803238',
      700: '#5d2427',
      800: '#391417',
      900: '#1b0305',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
)

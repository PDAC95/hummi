import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "swiper/css";
import "swiper/css/navigation";
import './assets/css/style.css'
import 'swiper/css/pagination';
import { RouterProvider } from 'react-router'
import FreshFlowRouter from './components/router/FreshFlowRouter'
import ContextProvider from './components/context/ContextProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={FreshFlowRouter} />
    </ContextProvider>
  </StrictMode>

)

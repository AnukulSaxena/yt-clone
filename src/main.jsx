import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { store } from './store/store.js'
import App from './App.jsx'
import { AuthLayout } from './Components/index.js'
import {
  Error,
  Home,
  Login,
  Dashboard,
  Channel,
  Video,
  Subscription
} from './Pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      },
      {
        path: "/dashboard",
        element: <AuthLayout>
          <Dashboard />
        </AuthLayout>
      },
      {
        path: "/channel",
        element: <AuthLayout>
          <Channel />
        </AuthLayout>
      },
      {
        path: "/video/:videoId/:ownerId",
        element: <AuthLayout>
          <Video />
        </AuthLayout>
      },
      {
        path: "/subscription",
        element: <AuthLayout>
          <Subscription />
        </AuthLayout>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
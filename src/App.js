import './App.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
          <Route index element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
    )
)

return (
  <RouterProvider router={router}>
      <Outlet/>
  </RouterProvider>
)
}

export default App;

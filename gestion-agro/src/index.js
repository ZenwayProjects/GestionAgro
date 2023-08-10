import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));



{/*
const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/login';
  } else {
    fetch('/api/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          window.location.href = '/login';
        }
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/login';
      });
  }
}, []);

if (!isAuthenticated) {
  // mientras se valida el token, se muestra un mensaje de "Cargando..."
  return <div>Cargando...</div>;
}

*/}

root.render(
  <React.StrictMode>
  <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


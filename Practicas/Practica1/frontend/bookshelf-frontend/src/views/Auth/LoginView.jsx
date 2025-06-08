// src/views/Auth/LoginView.jsx
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { loginUser } from "../../api/auth";

export default function LoginView() {
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    const res = await loginUser(form);

    // Guarda token y usuario si lo deseas
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    // Detecta si el rol viene como string o número
    let userRole = res.user?.rol;
    // Si el rol es numérico: 1=admin, 2=user (ajusta según tu base)
    if (userRole === "admin" || userRole === 1) {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return <AuthForm onSubmit={handleLogin} title="Iniciar Sesión" />;
}

import AuthForm from "../../components/AuthForm";
import { registerUser } from "../../api/auth";


export default function RegisterView() {
  return <AuthForm onSubmit={registerUser} title="Registrarse" isRegister />;
}

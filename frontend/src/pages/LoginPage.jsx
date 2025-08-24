import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, isAuthenticated, errors: loginErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/memberships");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (data) => {
    signIn(data);
  });

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/fondo2.jpg')" }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-black/50 backdrop-blur-md border border-emerald-500/20">
        <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
          Inicia Sesión
        </h1>

        {loginErrors.length > 0 && (
          <ul className="mb-4">
            {loginErrors.map((error, i) => (
              <li key={i} className="text-red-500 text-sm">
                {error}
              </li>
            ))}
          </ul>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <input
              className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="email"
              placeholder="Email"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              className="w-full bg-zinc-700/50 border border-zinc-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/25"
            type="submit"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

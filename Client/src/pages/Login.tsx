import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { ApiError } from "../api/apiClient";
import { CircleHelp } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          const destination = location.state?.from;
          const redirectTo = destination
            ? `${destination.pathname}${destination.search ?? ""}${destination.hash ?? ""}`
            : "/";

          navigate(redirectTo, { replace: true });
        },
      }
    );
  };

  const handleDemoLogin = () => {
    loginMutation.mutate(
      {
        email: "demo@example.com",
        password: "DemoPassword123!",
      },
      {
        onSuccess: () => navigate("/", { replace: true }),
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your Employee Manager account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {loginMutation.isError && (
            <p role="alert" className="text-sm text-red-600">
              {loginMutation.error instanceof ApiError
                ? loginMutation.error.message
                : "Unable to sign in. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loginMutation.isPending}
            className="w-full cursor-pointer rounded-lg border border-emerald-600 py-3 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-60"
          >
            Try Demo Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-emerald-600 hover:underline">
            Create account
          </Link>
        </p>
        <div className="group absolute right-4 top-4">
          <button type="button" aria-label="Demo credentials" className="cursor-help text-slate-400 hover:text-emerald-600">
            <CircleHelp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

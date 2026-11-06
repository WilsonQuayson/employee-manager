import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";
import { ApiError } from "../api/apiClient";

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    displayName: "",
    organizationName: "",
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    if (form.password.length < 8) {
      setValidationError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(form.password)) {
      setValidationError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(form.password)) {
      setValidationError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(form.password)) {
      setValidationError("Password must contain at least one number.");
      return;
    }

    if (!/[^a-zA-Z0-9]/.test(form.password)) {
      setValidationError("Password must contain at least one special character.");
      return;
    }

    try {
      await registerMutation.mutateAsync(form);
      navigate("/login", { replace: true });
    } catch {
      return;
    }
  };

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setValidationError("");
    registerMutation.reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Get started with Employee Manager
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {([
            { name: "displayName", label: "Full name", type: "text", placeholder: "John Doe" },
            { name: "organizationName", label: "Organization name", type: "text", placeholder: "Your company" },
            { name: "email", label: "Email address", type: "email", placeholder: "you@company.com" },
            { name: "password", label: "Password", type: "password", placeholder: "Create a password" },
          ] as const).map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                required
                maxLength={
                  field.name === "displayName" ? 100 :
                  field.name === "organizationName" ? 150 : undefined
                }
                minLength={field.name === "password" ? 8 : undefined}
                autoComplete={
                  field.name === "password" ? "new-password" :
                  field.name === "email" ? "email" :
                  field.name === "displayName" ? "name" : undefined
                }
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}

          <p className="text-xs text-slate-500">
            Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.
          </p>

          {(validationError || registerMutation.isError) && (
            <p role="alert" className="whitespace-pre-line text-sm text-red-600">
              {validationError ||
                (registerMutation.error instanceof ApiError
                  ? registerMutation.error.message
                  : "Unable to create account. Please try again.")}
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full cursor-pointer rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-emerald-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

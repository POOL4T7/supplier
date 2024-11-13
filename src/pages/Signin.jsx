import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormContainer from "../components/common/FormContainer";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form"
        style={{ maxWidth: "500px" }}
      >
        <h2>Login</h2>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;

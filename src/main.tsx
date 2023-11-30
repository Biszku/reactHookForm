import "./index.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactDOM from "react-dom";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Invalid name"),
    email: z.string().email(),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must mach",
    path: ["confirmPassword"],
  });

type TSignUpScheme = z.infer<typeof signUpSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpScheme>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpScheme) => alert(JSON.stringify(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input {...register("name")} />
      {errors.name && <p>{`${errors.name.message}`}</p>}
      <label>Email</label>
      <input {...register("email")} />
      {errors.email && <p>{`${errors.email.message}`}</p>}
      <label>Password</label>
      <input {...register("password")} type="password" />
      {errors.password && <p>{`${errors.password.message}`}</p>}
      <label>Confirm Password</label>
      <input {...register("confirmPassword")} type="password" />
      {errors.confirmPassword && <p>{`${errors.confirmPassword.message}`}</p>}
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

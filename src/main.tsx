import "./index.css";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });

  console.log(watch("example"));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <label>Example</label>
      <input {...register("example", { required: true, maxLength: 10 })} />
      {errors.example && <p>This field is required</p>}
      <label>ExampleRequired</label>
      <input
        {...register("exampleRequired", { required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

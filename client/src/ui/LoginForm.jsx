import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useLogIn } from "../features/authentication/useLogin";

const Form = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormRow = styled.div`
  width: fit-content;
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 20rem 20rem;
  gap: 1rem;
  position: relative;
  font-size: 1.2rem;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: grid;
    gap: 2rem;
    align-items: center;
  }
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
`;
const Input = styled.input`
  border: 1px solid var(--background-color-hover);
  background-color: var(--background-color-hover);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: #000;
  padding: 1.2rem 3.2rem;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function LoginForm() {
  //closeWindow come from Modla we pass to children in this case the choldren is SignUpForm

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { login, isPending } = useLogIn();
  function onSubmit(data) {
    //console.log(data);
    login(data, {
      onSettled: () => reset(),
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          autoComplete="username"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isPending}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="webPassword">webPassword</Label>
        <Input
          type="password"
          autoComplete="current-password"
          id="webPassword"
          {...register("webPassword", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isPending}
        />
        {errors?.webPassword?.message && (
          <Error>{errors.webPassword.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button vari="prim" size="med" disabled={isPending}>
          Submit
        </Button>
        <Button type="reset" size="small" vari="cancel" disabled={isPending}>
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;

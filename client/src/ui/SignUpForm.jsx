import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useSignUp } from "../features/authentication/useSignUp";

const Form = styled.form`
  padding: 2rem;
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
    display: flex;
    gap: 1.2rem;
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

function SignUpForm({ closeWindow }) {
  //closeWindow come from Modla we pass to children in this case the choldren is SignUpForm

  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signUp, isPending } = useSignUp();
  function onSubmit(data) {
    signUp(data, {
      onSettled: () => reset(),
    });
    closeWindow();
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
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
        <Label htmlFor="password">password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isPending}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
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

export default SignUpForm;

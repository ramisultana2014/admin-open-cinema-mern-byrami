import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { clearCart } from "../context/movieSlice";
import { useCreateOrder } from "../features/order/useCreateOrder";
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
const ButtonDelete = styled.button`
  border: 1px solid var(--color-red-800);
  padding: 0.5rem 1.5rem;
  border-radius: var(--border-radius-lg);
  color: var(--background-color-hover);
  transition: all 0.5s;

  &:hover {
    color: var(--color-red-800);
    transform: translateY(-3px);
    border: none;
  }
  &:active {
    transform: translateY(3px);
  }
`;
function OrderForm({ cart }) {
  const navigate = useNavigate();
  const { createOrder, isLoading } = useCreateOrder();
  const dispatch = useDispatch();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const totalOrderPrice = cart?.reduce(
    (acc, movie) => acc + movie.totaldayshowTimePrice,
    0
  );

  function onSubmit(data) {
    createOrder({
      ...data,
      cart,
      totalOrderPrice,
    });
    dispatch(clearCart());
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
            value: "rami@test.com",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="phoneNumber">phoneNumber</Label>
        <Input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "this field is required",
            value: 949574984,
            pattern: {
              value:
                /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
              message: "Not Valid",
            },
          })}
          disabled={isLoading}
        />
        {errors?.phoneNumber?.message && (
          <Error>{errors.phoneNumber.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="address">address</Label>
        <Input
          type="text"
          id="address"
          {...register("address", {
            required: "the address field is required",
            value: "dubai,jumaerah",
          })}
          disabled={isLoading}
        />
        {errors?.address?.message && <Error>{errors.address.message}</Error>}
      </FormRow>

      <FormRow>
        <button disabled={isLoading}>confirm</button>
        <ButtonDelete
          onClick={() => {
            dispatch(clearCart());
            navigate("/movieslist");
          }}
          type="reset"
          disabled={isLoading}
        >
          Cancel
        </ButtonDelete>
      </FormRow>
    </Form>
  );
}

export default OrderForm;

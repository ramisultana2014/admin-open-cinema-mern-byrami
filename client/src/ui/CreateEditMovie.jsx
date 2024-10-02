import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { fixedSeats } from "../helpers";
import { useUpdateMovie } from "../features/movies/useUpdateMovie";
const Form = styled.form`
  //padding: 2.4rem 4rem;

  /* background-color: var(--color-grey-0);
  //border: 3px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
  z-index: 999; */
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-auto-flow: row;
  text-align: center;
  row-gap: 3rem;
  justify-items: center;
`;
const FormRow = styled.div`
  /* width: fit-content;
  display: grid;
  align-items: center;
  grid-template-columns: 5rem 20rem 5rem;
  gap: 1rem;
  font-size: 1.4rem;
  padding: 1rem 0; */
  display: grid;
  grid-auto-flow: column;

  align-items: center;

  gap: 1rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
  @media screen and (max-width: 660px) {
    grid-auto-flow: unset;
    grid-template-columns: 1fr 1fr;
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  /* &:has(button) {
    display: flex;

    //justify-content: flex-end;
    gap: 1.2rem;
  } */
`;
const Input = styled.input`
  border: 1px solid var(--background-color-hover);
  background-color: var(--background-color-hover);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: #000;
  padding: 1.2rem 3.2rem;
  width: 20rem;
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateEditMovie({ closeWindow, movieToEdit = {} }) {
  //console.log(movieToEdit);
  const { updateMovie, isPending } = useUpdateMovie();
  const { _id: movieID, ...editValues } = movieToEdit;
  const isEditSession = Boolean(movieID);
  const { register, formState, handleSubmit, reset, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // UseFieldArray for managing showDays,manage array in data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "showDays", // Name must match your data structure
  });
  //console.log("fields", fields);
  function onSubmit(data) {
    //console.log("data", data);
    // Ensure each showDay has the desired availableSeats array
    const updatedShowDays = data.showDays.map((showDay) => ({
      ...showDay,
      availableSeats: [...fixedSeats],
    }));
    const updatedData = {
      ...data,
      showDays: updatedShowDays,
      movieImage1: undefined,
      movieImage2: undefined,
    };
    // console.log("updatedData", updatedData);
    updateMovie(
      { movieObj: { updatedData }, id: { movieID } },
      {
        onSuccess: () => {
          reset();
          closeWindow?.();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="title">title</Label>
        <Input
          type="text"
          id="title"
          {...register("title", { required: "this field is required" })}
          disabled={isPending}
        />
        {errors?.title?.message && <Error>{errors.title.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="price">price</Label>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "this filed is required",
          })}
          disabled={isPending}
        />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>
      {/* ShowDays array management */}
      {fields.map((objInShowDays, index) => (
        <FormRow key={objInShowDays.id}>
          <Label htmlFor={`showDays.${index}.day`}>Day</Label>
          {/* htmlFor and id are : name of the array in data which is showDays,  know showDays.index.<name of the field inside each item in the array like day, showTimes, dayShowTime>  */}
          <Input
            type="text"
            id={`showDays.${index}.day`}
            {...register(`showDays.${index}.day`, {
              required: "Day is required",
            })}
            defaultValue={objInShowDays.day}
            disabled={isPending}
          />
          <Label htmlFor={`showDays.${index}.showTimes`}>Show Times</Label>
          <Input
            type="text"
            id={`showDays.${index}.showTimes`}
            {...register(`showDays.${index}.showTimes`, {
              required: "Show time is required",
            })}
            defaultValue={objInShowDays.showTimes}
            disabled={isPending}
          />
          <Label htmlFor={`showDays.${index}.dayShowTime`}>Day Show Time</Label>
          <Input
            type="text"
            id={`showDays.${index}.dayShowTime`}
            {...register(`showDays.${index}.dayShowTime`, {
              required: "Day show time is required",
            })}
            defaultValue={objInShowDays.dayShowTime}
            disabled={isPending}
          />

          <Button
            vari="cancel"
            size="small"
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </FormRow>
      ))}

      <FormRow>
        <Button
          size="med"
          vari="prim"
          type="button"
          onClick={() =>
            append({
              day: "",
              showTimes: "",
              dayShowTime: "",
              availableSeats: [],
            })
          }
        >
          Add Show Day
        </Button>
      </FormRow>
      <FormRow>
        <Button disabled={isPending} size="med" vari="prim">
          Upload
        </Button>
        <Button
          disabled={isPending}
          type="reset"
          onClick={() => closeWindow?.()}
          vari="cancel"
          size="small"
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditMovie;

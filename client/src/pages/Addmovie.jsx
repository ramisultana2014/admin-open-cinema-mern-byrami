import { useCreateMovie } from "../features/movies/useCreateMovie";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../ui/Button";
import { fixedSeats } from "../helpers";

const Form = styled.form`
  height: 100vh;
  overflow-y: scroll;
  display: grid;
  grid-auto-flow: row;
  text-align: center;
  row-gap: 3rem;
  justify-items: start;
  background-color: var(--background-color-main);
  padding: 1rem;
`;
const FormRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: start;
  gap: 1rem;
  /*   
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  } */
  @media screen and (max-width: 660px) {
    grid-auto-flow: unset;
    grid-template-columns: 1fr 1fr;
  }
`;
const Input = styled.input`
  outline: 4px solid var(--background-color-hover);
  border: none;
  background-color: var(--background-color-hover);
  border-radius: var(--border-radius-sm);
  //box-shadow: var(--shadow-sm);
  color: #000;
  padding: 1.2rem 3.2rem;
  width: 29rem;
  height: 5rem;
  &:user-valid {
    outline-color: green;
  }
  &:user-invalid {
    outline-color: red;
  }
`;
const Input1 = styled.input`
  outline: 1px solid var(--background-color-hover);
  background-color: var(--background-color-hover);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: #000;
  width: 10rem;
  height: 4rem;
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function Addmovie() {
  const { createmovie, isPending } = useCreateMovie();
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { errors } = formState;
  // UseFieldArray for managing showDays,manage array in data
  const { fields, append, remove } = useFieldArray({
    control,
    name: "showDays", // Name must match your data structure
  });
  async function onSubmit(data) {
    //console.log("data", data);

    // Helper function to convert file to array buffer
    //convertFileToArray(file): This helper function reads the file as an ArrayBuffer, converts it to a Uint8Array, and then converts that into a regular JavaScript array using Array.from.
    const convertFileToArray = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      //When you use Array.from(new Uint8Array(arrayBuffer)), it converts the binary data from the ArrayBuffer into a regular JavaScript array, where each element represents one byte of the file. This is necessary because JSON serialization (used when sending data to the server) cannot handle Uint8Array directly.
      return Array.from(new Uint8Array(arrayBuffer));
    };
    const movieImage1File = data.movieImage1[0];
    const movieImage2File = data.movieImage2[0];
    // Convert the files to buffers
    const movieImage1Buffer = await convertFileToArray(movieImage1File);
    const movieImage2Buffer = await convertFileToArray(movieImage2File);
    // Ensure each showDay has the desired availableSeats array
    const updatedShowDays = data.showDays.map((showDay) => ({
      ...showDay,
      availableSeats: [...fixedSeats],
    }));
    const updatedData = {
      ...data,
      showDays: updatedShowDays,
      movieImage1: movieImage1Buffer,
      movieImage2: movieImage2Buffer,
      uploaded: "yes",
    };
    //console.log("updatedData", updatedData);
    createmovie(updatedData, {
      onSuccess: () => {
        reset();
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        {/* <Label htmlFor="title">title</Label> */}
        <Input
          type="text"
          id="title"
          required
          placeholder="title"
          {...register("title", { required: "this field is required" })}
          disabled={isPending}
        />
        {/* {errors?.title?.message && <Error>{errors.title.message}</Error>} */}
      </FormRow>
      <FormRow>
        <Input
          type="text"
          id="description"
          required
          placeholder="description"
          {...register("description", { required: " this filed is required" })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Input
          required
          id="initialRelease"
          type="text"
          placeholder="initialRelease"
          {...register("initialRelease")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Input
          required
          type="text"
          id="trailer"
          placeholder="trailer"
          {...register("trailer")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        <Input
          required
          type="text"
          id="duration"
          placeholder="duration"
          {...register("duration")}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Input
          required
          type="text"
          id="category"
          placeholder="category"
          {...register("category")}
          disabled={isPending}
        />
      </FormRow>
      <FormRow>
        {/* <Label htmlFor="price">price</Label> */}
        <Input
          type="number"
          id="price"
          required
          placeholder="price"
          {...register("price", {
            required: "this filed is required",
          })}
          disabled={isPending}
        />
        {/* {errors?.price?.message && <Error>{errors.price.message}</Error>} */}
      </FormRow>

      <FormRow>
        <Label htmlFor="movieImage1">Image1</Label>
        <Input
          type="file"
          id="movieImage1"
          accept="image/*"
          {...register("movieImage1", {
            required: "This field is required",
            validate: {
              size: (fileList) =>
                fileList[0]?.size <= 1000000 ||
                "File size should be less than 1MB",
            },
          })}
          disabled={isPending}
        />
        {errors?.movieImage1?.message && (
          <Error>{errors.movieImage1.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="movieImage2">Image2</Label>
        <Input
          type="file"
          id="movieImage2"
          accept="image/*"
          {...register("movieImage2", {
            required: "This field is required",
            validate: {
              size: (fileList) =>
                fileList[0]?.size <= 1000000 ||
                "File size should be less than 1MB",
            },
          })}
          disabled={isPending}
        />
        {errors?.movieImage2?.message && (
          <Error>{errors.movieImage2.message}</Error>
        )}
      </FormRow>
      {fields.map((objInShowDays, index) => (
        <FormRow key={objInShowDays.id}>
          <Label htmlFor={`showDays.${index}.day`}>Day</Label>
          {/* htmlFor and id are : name of the array in data which is showDays,  know showDays.index.<name of the field inside each item in the array  like day, showTimes, dayShowTime>  */}
          <Input1
            type="text"
            id={`showDays.${index}.day`}
            {...register(`showDays.${index}.day`, {
              required: "Day is required",
            })}
            defaultValue={objInShowDays.day}
            disabled={isPending}
          />
          <Label htmlFor={`showDays.${index}.showTimes`}>Show Times</Label>
          <Input1
            type="text"
            id={`showDays.${index}.showTimes`}
            {...register(`showDays.${index}.showTimes`, {
              required: "Show time is required",
            })}
            defaultValue={objInShowDays.showTimes}
            disabled={isPending}
          />
          <Label htmlFor={`showDays.${index}.dayShowTime`}>Day Show Time</Label>
          <Input1
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
          disabled={isPending}
        >
          Add Show Day
        </Button>
      </FormRow>
      <button type="submit" disabled={isPending}>
        Upload Movie
      </button>
      <Button
        // disabled={isPending}
        type="reset"
        vari="cancel"
        size="small"
      >
        Cancel
      </Button>
    </Form>
  );
}

export default Addmovie;

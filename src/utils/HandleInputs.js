export const handleInputs = (e, setval) => {
  console.log(e.target.name);
  const InputName = e.target.name;
  const Inputval = e.target.value;
  setval((previous_values) => {
    return { ...previous_values, [InputName]: Inputval };
  });
};
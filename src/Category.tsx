import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Category = ({ categories, onChange }: any) => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      onChange={(event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        onChange(value);
      }}
    >
      {categories.map((title: string, index: number) => (
        <FormControlLabel value={title} control={<Radio />} label={title} />
      ))}
    </RadioGroup>
  );
};

export default Category;

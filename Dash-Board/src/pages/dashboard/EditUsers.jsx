import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Select from "react-select";

const options = [
  { value: "Admin", label: "Admin" },
  { value: "Campany", label: "Campany" },
  { value: "User", label: "User" },
];

export function EditUsers() {
  return (
    <>
      <div
        className="mx-auto mt-10 flex flex-col items-center rounded-xl p-20"
        style={{ backgroundColor: "#FFF2CC" }}
      >
        <div className="flex w-72 flex-col items-end gap-6">
          <Input
            className="bg-white"
            type="text"
            size="lg"
            label="Pitch-Owner"
          />
          <Input type="text" size="lg" label="Pitch-Name" />
          <Input type="number" size="lg" label="Capacity" />
          <Input type="text" size="lg" label="Discription" />
          <Input type="file" accept="image/*" label="upload image" />

          <Select className="w-72" options={options} label=" State" />

          <Button className="w-72" color="green" ripple={true}>
            Edit Pitch
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditUsers;

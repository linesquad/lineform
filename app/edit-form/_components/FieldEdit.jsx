"use client";

import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate }) => {
  const [label, setLabel] = useState(defaultValue.formLabel);
  const [placeholder, setPlaceHolder] = useState(defaultValue.placeholderName);
  return (
    <div className=" flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className=" h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit fields</h2>
          <div>
            <label className=" text-xs">Label Name</label>
            <Input
              tyoe="text"
              defaultValue={defaultValue.formLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <label className=" text-xs">Placeholder</label>
            <Input
              tyoe="text"
              defaultValue={defaultValue.placeholderName}
              onChange={(e) => setPlaceHolder(e.target.value)}
            />
          </div>
          <Button
            size="small"
            className=" mt-3 p-2"
            onClick={() =>
              onUpdate({
                formLabel: label,
                placeholderName: placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <Trash className=" h-5 w-5 text-red-500" />
    </div>
  );
};

export default FieldEdit;

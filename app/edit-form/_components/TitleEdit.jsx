"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TitleEdit = ({ defaultValue, onUpdate }) => {
  const [mainTitle, setMainTitle] = useState(defaultValue.formMainTitle);
  const [secondaryTitle, setSecondaryTitle] = useState(defaultValue.formSecondaryTitle);

  useEffect(() => {
    setMainTitle(defaultValue.formMainTitle);
    setSecondaryTitle(defaultValue.formSecondaryTitle);
  }, [defaultValue]);

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Titles</h2>
          <div>
            <label className="text-xs">Main title</label>
            <Input
              type="text" 
              value={mainTitle}
              onChange={(e) => setMainTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs">Secondary title</label>
            <Input
              type="text" 
              value={secondaryTitle} 
              onChange={(e) => setSecondaryTitle(e.target.value)}
            />
          </div>
          <Button
            size="small"
            className="mt-3 p-2"
            onClick={() =>
              onUpdate({
                formMainTitle: mainTitle,
                formSecondaryTitle: secondaryTitle,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TitleEdit;

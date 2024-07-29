"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Spinner from "@/app/_components/Spinner";
import FieldEdit from "./FieldEdit";

const FormUi = ({ jsonForm, onFieldUpdate }) => {
  if (!jsonForm) return <Spinner />;

  return (
    <div className=" border p-5 md:w-[600px] rounded-lg">
      <h2 className=" font-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className=" text-sm text-gray-400 text-center">
        {jsonForm.formSubheading}
      </h2>

      {jsonForm?.formFields?.map((field, i) => (
        <div key={field.formName} className=" flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 flex flex-col items-start w-full">
              <Select>
                <label className=" text-xs text-gray-500 mb-1">
                  {field.formLabel}
                </label>
                <SelectTrigger className="">
                  <SelectValue placeholder={field.placeholderName} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div className="my-3 flex flex-col items-start w-full">
              <label className=" text-xs text-gray-500 mb-1">
                {field.formLabel}
              </label>
              <RadioGroup defaultValue="option-one">
                {field.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.label} id={option.label} />
                    <Label htmlFor={option.label}>{option.value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className="my-3 flex flex-col items-start w-full">
              <label className=" text-xs text-gray-500 mb-1">
                {field.formLabel}
              </label>
              {field.options ? (
                field.options?.map((option) => (
                  <div key={option.label} className=" flex gap-2">
                    <Checkbox />
                    <h2>{option.value}</h2>
                  </div>
                ))
              ) : (
                <div className=" flex items-center gap-2">
                  <Checkbox />
                  <h2>{field.formLabel}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className=" my-3 flex flex-col items-start w-full">
              <label className=" text-xs text-gray-500 mb-1">
                {field.formLabel}
              </label>
              <Input
                type={field.fieldType}
                placeholder={field.placeholderName}
                name={field.fieldName}
              />
            </div>
          )}

          <div>
            <FieldEdit
              defaultValue={field}
              onUpdate={(value) => onFieldUpdate(value, i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;

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
import { useRef, useState } from "react";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";

const FormUi = ({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
  edittable = true,
}) => {
  const [formData, setFormData] = useState();
  let formRef = useRef();

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const result = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format("DD/MM/yyyy"),
    });

    if (result) {
      formRef.reset();
      toast("Thank you for your response.");
    } else {
      toast("Error while saving your information.");
    }
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    }
  };

  if (!jsonForm) return <Spinner />;

  return (
    <form
      ref={(e) => (formRef = e)}
      onSubmit={onFormSubmit}
      className=" border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
      style={{ border: selectedStyle, boxShadow: selectedStyle }}
    >
      <h2 className=" font-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className=" text-sm text-gray-400 text-center">
        {jsonForm.formSubheading}
      </h2>

      {jsonForm?.formFields?.map((field, i) => (
        <div key={field.formName} className=" flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 flex flex-col items-start w-full">
              <Select
                name={field.formName}
                required={field.fieldRequired}
                onValueChange={(value) =>
                  handleSelectChange(field.formName, value)
                }
              >
                <label className=" text-xs text-gray-500 mb-1">
                  {field.formLabel}
                </label>
                <SelectTrigger className="">
                  <SelectValue placeholder={field.placeholderName} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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
              <RadioGroup required={field.fieldRequired} name={field.formName}>
                {field.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.label}
                      id={option.label}
                      onClick={() =>
                        handleSelectChange(field.formName, option.label)
                      }
                    />
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
                    <Checkbox
                      name={field.formName}
                      onCheckedChange={(value) => {
                        handleCheckboxChange(
                          field.formLabel,
                          option.label,
                          value
                        );
                      }}
                    />
                    <h2>{option.value}</h2>
                  </div>
                ))
              ) : (
                <div className=" flex items-center gap-2">
                  <Checkbox required={field.fieldRequired} />
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
                name={field.formName}
                className="bg-transparent"
                onChange={(e) => handleInputChange(e)}
                required={field.fieldRequired}
              />
            </div>
          )}

          {edittable && (
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, i)}
                deleteField={() => deleteField(i)}
              />
            </div>
          )}
        </div>
      ))}
      <button type="submit" className=" btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormUi;

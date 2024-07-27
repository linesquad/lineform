"use client";

import { Input } from "@/components/ui/input";

const FormUi = ({ jsonForm }) => {
  console.log(jsonForm);
  return (
    <div className=" border p-5">
      <h2 className=" font-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className=" text-sm text-gray-400 text-center">
        {jsonForm.formSubheading}
      </h2>

      {jsonForm?.formFields?.map((field, i) => (
        <div key={field.formLabel} className=" mb-3">
          <div className=" mt-2 flex flex-col items-start">
            <label className=" text-sm text-gray-500 mb-1">
              {field.formLabel}
            </label>
            <Input
              type={field.filedType}
              placeholder={field.placeholderName}
              name={field.formName}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;

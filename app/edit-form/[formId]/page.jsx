"use client";

import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "sonner";
import Controller from "../_components/Controller";

const EditForm = ({ params }) => {
  const { formId } = params;
  const { user } = useUser();
  const router = useRouter();
  const [jsonForm, setJsonForm] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("light");

  const getFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(
        and(
          eq(jsonForms.id, formId),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0]?.jsonform));
  };

  const onFieldUpdate = (value, i) => {
    jsonForm.formFields[i].formLabel = value.formLabel;
    jsonForm.formFields[i].placeholderName = value.placeholderName;
    setUpdateTrigger(Date.now());
    toast("Updated!");
  };

  const deleteField = async (iToRemove) => {
    const result = jsonForm?.formFields?.filter((_, i) => i !== iToRemove);
    console.log(result);

    jsonForm.formFields = result;
    setUpdateTrigger(Date.now());
    toast("Deleted!");
  };

  useEffect(() => {
    user && getFormData();
  }, [user]);

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(jsonForms)
      .set({
        jsonform: JSON.stringify(jsonForm),
      })
      .where(
        and(
          eq(jsonForms.id, record.id),
          eq(jsonForms.createdBy, user?.primaryEmailAddress.emailAddress)
        )
      );

    console.log(result);
    console.log(JSON.stringify(jsonForm));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  return (
    <div className=" p-10">
      <span
        className=" flex gap-2 items-center my-5 cursor-pointer hover:font-bold w-28"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </span>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className=" p-5 border rounded-lg shadow-md">
          <Controller selectedTheme={(value) => setSelectedTheme(value)} />
        </div>
        <div className=" md:col-span-2 border rounded-lg p-5 flex items-center justify-center text-center">
          <FormUi
            jsonForm={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={(i) => deleteField(i)}
            selectedTheme={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default EditForm;

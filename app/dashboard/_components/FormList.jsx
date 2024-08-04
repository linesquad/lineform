"use client";

import Spinner from "@/app/_components/Spinner";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormListItem from "./FormListItem";

const FormList = () => {
  const [formList, setFormList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && GetFormList();
  }, [user]);
  const GetFormList = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(jsonForms.id));

    setFormList(result);
  };

  if (!formList.length) return <Spinner />;
  console.log(formList);
  return (
    <div className=" mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
      {formList.map((form, i) => (
        <div key={form.id}>
          <FormListItem
            form={JSON.parse(form.jsonform)}
            formRecord={form}
            refreshData={GetFormList}
          />
        </div>
      ))}
    </div>
  );
};

export default FormList;

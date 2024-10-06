"use client";

import Spinner from "@/app/_components/Spinner";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import FormListItem from "./FormListItem";

const FormList = () => {
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetFormList();
    } else {
      setLoading(false);
    }
  }, [user]);

  const GetFormList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(jsonForms.id));

    setFormList(result);
    setLoading(false);
  };

  if (loading) return <Spinner />;

  if (!formList.length) return <div>Currently we don't have forms</div>; 

  return (
    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
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

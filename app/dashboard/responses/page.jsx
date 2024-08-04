"use client";

import Spinner from "@/app/_components/Spinner";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq, sql } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormListItemRes from "./_components/FormListItemRes";

const Responses = () => {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [responseCounts, setResponseCounts] = useState({});

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));

    setFormList(result);

    if (result.length > 0) {
      fetchResponseCount(result);
    }
  };

  const fetchResponseCount = async (forms) => {
    const counts = {};

    for (let form of forms) {
      const responseCountResult = await db
        .select({
          count: sql`COUNT(${userResponses.id})`,
        })
        .from(userResponses)
        .where(eq(userResponses.formRef, form.id));

      counts[form.id] = responseCountResult[0]?.count || 0;
    }

    setResponseCounts(counts);
  };

  if (formList.length === 0) return <Spinner />;

  return (
    <div className=" p-10">
      <h2 className=" font-bold text-3xl flex items-center justify-between">
        Responses
      </h2>

      <div className=" grid grid-cols-2 lg:grid-cols-3 gap-5">
        {formList.map((form, i) => (
          <FormListItemRes
            key={i}
            formRecord={form}
            jsonForm={JSON.parse(form.jsonform)}
            responseCount={responseCounts[form.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Responses;

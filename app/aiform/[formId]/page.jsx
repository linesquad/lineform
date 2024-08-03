"use client";

import Spinner from "@/app/_components/Spinner";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LiveAiForm = ({ params }) => {
  const { formId } = params;
  const [recod, setRecord] = useState([]);
  const [jsonForm, setJsonForm] = useState(null);
  const getFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.id, +formId));

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  useEffect(() => {
    formId && getFormData();
  }, [formId]);

  if (!formId && !recod) return <Spinner />;

  if (!jsonForm) return <h1>Error accourd</h1>;

  return (
    <div
      className={`p-10 flex justify-center items-center`}
      style={{ backgroundImage: recod.background }}
    >
      <FormUi
        jsonForm={jsonForm}
        onFieldUpdate={null}
        deleteField={null}
        selectedStyle={recod.style}
        selectedTheme={recod.theme}
        edittable={false}
      />
      <Link
        href={process.env.NEXT_PUBLIC_BASE_URL}
        target="_blank"
        className=" hidden pt-3 bg-black text-white px-3 py-2 rounded-full md:flex items-center gap-2 fixed bottom-5 left-5 cursor-pointer"
      >
        <Image
          src={"/trlogo.png"}
          width={50}
          height={50}
          alt="logo"
          className=" rounded-full"
        />
        Developed By TR
      </Link>
    </div>
  );
};

export default LiveAiForm;

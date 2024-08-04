import Spinner from "@/app/_components/Spinner";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const FormListItemRes = ({ jsonForm, formRecord, responseCount }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const exportData = async () => {
    let jsonData = [];
    setLoading(true);
    const result = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    if (result) {
      result.forEach((item) => {
        const jsonItem = JSON.parse(item.jsonResponse);
        jsonData.push(jsonItem);
      });
      setLoading(false);
    }

    exportToExcel(jsonData);
  };

  const exportToExcel = (jsonData) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Your List of People" + ".xlsx");
  };

  if (loading) return <Spinner />;

  return (
    <div className=" border shaodow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg text-black">{jsonForm.formTitle}</h2>
      <h2 className="text-sm text-gray-500 ">{jsonForm.formSubheading}</h2>
      <hr className=" my-4" />
      <div className=" flex justify-between items-center">
        <h2>
          <strong>{responseCount}</strong>
        </h2>
        <Button className="" size="sm" onClick={() => exportData()}>
          Export
        </Button>
      </div>
    </div>
  );
};

export default FormListItemRes;

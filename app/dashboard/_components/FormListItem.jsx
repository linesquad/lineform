import { Button } from "@/components/ui/button";
import { Edit, Share, Trash } from "lucide-react";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { jsonForms, userResponses } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast } from "sonner";
import { RWebShare } from "react-web-share";

const FormListItem = ({ form, formRecord, refreshData }) => {
  const { user } = useUser();

  const onDeleteForm = async () => {
    await db
      .delete(userResponses)
      .where(eq(userResponses.formRef, formRecord.id));

    const result = await db
      .delete(jsonForms)
      .where(
        and(
          eq(jsonForms.id, formRecord.id),
          eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (result) {
      toast("FormDeleted!");
      refreshData();
    }
  };

  return (
    <div className=" border shaodow-sm rounded-lg p-4">
      <div className=" flex justify-between">
        <h2></h2>
        <h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Trash className=" h-5 w-5 text-red-500 cursor-pointer hover:scale-105 transition-all" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteForm()}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </h2>
      </div>
      <h2 className="text-lg text-black">{form.formTitle}</h2>
      <h2 className="text-sm text-gray-500 ">{form.formSubheading}</h2>
      <hr className=" my-4" />
      <div className=" flex justify-between items-center">
        <RWebShare
          data={{
            text: form.formSubheading + " build your form with tr builder",
            url: process.env.NEXT_PUBLIC_BASE_URL + `aiform/${formRecord.id}`,
            title: form.formTitle,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 items-center"
          >
            <Share className=" h-5 w-5" />
            Share
          </Button>
        </RWebShare>

        <Link href={`/edit-form/${formRecord.id}`}>
          <Button size="sm" className="flex gap-2 items-center">
            <Edit className=" h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormListItem;

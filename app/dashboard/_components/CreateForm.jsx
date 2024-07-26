"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs";
import { AiChatSession } from "@/configs/AiModal";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useState } from "react";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const PROMPT =
    ", On the basis of description please give form in json format with form title, for subheading, form field, form name, placeholder name, and form label, field type, field required In json format";

  const onCreateForm = async () => {
    console.log(userInput);
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      `Description: ${userInput}${PROMPT}`
    );
    console.log(result.response.text());
    if (result.response.text()) {
      const resp = await db
        .insert(jsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning({ id: jsonForms.id });
      console.log(resp);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(e) => setUserInput(e.target.value)}
                className="my-2"
                placeholder="Write description of your form"
              />
              <span className=" flex gap-2 my-3 justify-end">
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                    setUserInput("");
                  }}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button
                  className={`${loading && "bg-white"}`}
                  disabled={loading}
                  onClick={onCreateForm}
                >
                  {loading ? <SpinnerMini /> : "Create"}
                </Button>
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;

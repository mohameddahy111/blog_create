"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { toast } from "sonner";
import * as React from "react";
import axios from "axios";

interface DleteArticle {
  item: {
    id: string;
    title: string;
  };
}
export function DleteArticle({ item }: DleteArticle) {
  async function deleteArticle() {
    await axios
      .delete(`http://localhost:3000/api/delete/${item.id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        window.location.reload();
      });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Delete className="size-4 mr-2" />
          Delete Article
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p className="text-xl">
              Are you absolutely sure to Delete{" "}
              <span className="text-red-500 text-2xl font-bold">
                {item.title}
              </span>{" "}
              ?
            </p>{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteArticle}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

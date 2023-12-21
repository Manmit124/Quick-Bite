"use client";
import React, { useState } from "react";
import { Button } from "../component/ui/button";
import { DropdownMenu } from "../component/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../component/ui/alert-dialog";

const DeleteButton = ({ Label, onDelete }) => {
  const [showDelete, setshowDelete] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setshowDelete(true)}>
        {Label}
      </Button>

      <AlertDialog open={showDelete} onOpenChange={setshowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this {Label}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setshowDelete(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete();
                setshowDelete(false);
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;

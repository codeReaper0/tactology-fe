/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState} from "react";
import axios from "axios";
import {Dialog, DialogBody} from "@material-tailwind/react";
import toast from "react-hot-toast";
import {CloseIcon, DeleteIcon} from "icons/index";
import Button from "../ui/button";
import {API_URL} from "@/lib/axios";
import {signOut, useSession} from "next-auth/react";

export const DeleteDepartmentForm = ({
  fetchDepartments,
  department,
}: {
  fetchDepartments: () => Promise<void>;
  department: {id: string; name: string};
}) => {
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (!session?.accessToken) {
      signOut();
      return;
    }

    try {
      const query = `
		mutation DeleteDepartment($id: String!) {
		  deleteDepartment(id: $id) {
			message
		  }
		}
	  `;

      const variables = {id: department.id};

      const response = await axios.post(
        API_URL,
        {
          query,
          variables,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const data = response.data?.data?.deleteDepartment;

      if (!data) {
        throw new Error(
          response.data?.errors?.[0]?.message || "An error occurred"
        );
      }

      toast.success(data.message || "Department deleted successfully");
      fetchDepartments();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <DeleteIcon />
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="font-semibold text-lg">Delete Department</p>
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-800">
              Are you sure you want to delete the department{" "}
              <span className="font-bold">{department.name}</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <Button
                className="bg-gray-500 text-white py-2 px-4 rounded font-medium"
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 text-white py-2 px-4 rounded font-medium"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DeleteDepartmentForm;

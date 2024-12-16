/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState} from "react";
import axios from "axios";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {Dialog, DialogBody} from "@material-tailwind/react";
import toast from "react-hot-toast";
import {CloseIcon, EditIcon} from "icons/index";
import {Input} from "../ui/forms";
import Button from "../ui/button";
import {API_URL} from "@/lib/axios";
import {signOut, useSession} from "next-auth/react";

export const EditDepartmentForm = ({
  fetchDepartments,
  department,
}: {
  fetchDepartments: () => Promise<void>;
  department: {id: string; name: string};
}) => {
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();

  const handleOpen = () => setOpen(!open);

  const initialValues = {
    name: department?.name || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const onSubmit = async (
    values: typeof initialValues,
    {setSubmitting}: any
  ) => {
    if (!session?.accessToken) {
      signOut();
      return;
    }

    try {
      const query = `
        mutation UpdateDepartment($updateDepartmentDto: UpdateDepartmentDto!) {
          updateDepartment(updateDepartmentDto: $updateDepartmentDto) {
            id
            name
          }
        }
      `;

      const variables = {
        updateDepartmentDto: {
          id: department.id, // Include the department ID for the update mutation
          name: values.name,
        },
      };

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

      const data = response.data?.data?.updateDepartment;

      if (!data) {
        throw new Error(
          response.data?.errors?.[0]?.message || "An error occurred"
        );
      }

      toast.success(`Department "${data.name}" updated successfully`);
      fetchDepartments();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update department");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <EditIcon />
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="text-secondary font-semibold text-lg">
              Edit Department
            </p>
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form action="" autoComplete="off" className="p-4">
                <div className="grid grid-cols-1 gap-4 w-full mb-8">
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter department name"
                  />
                </div>

                <Button
                  className="w-full bg-primary disabled:bg-secondary/50 text-white py-2 rounded font-medium flex items-center justify-center"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <span>Update</span>
                </Button>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default EditDepartmentForm;

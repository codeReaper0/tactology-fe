/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState} from "react";
import axios from "axios";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {Dialog, DialogBody} from "@material-tailwind/react";
import toast from "react-hot-toast";
import {CloseIcon} from "icons/index";
import {Input} from "../ui/forms";
import Button from "../ui/button";

const DepartmentForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .min(0, "Price must be 0 or more")
      .required("Price is required"),
    quantity: Yup.number()
      .min(0, "Quantity must be 0 or more")
      .required("Quantity is required"),
  });

  const onSubmit = async (
    values: typeof initialValues,
    {setSubmitting}: any
  ) => {
    try {
      const payload = {...values};

      await axios.post("/api/departments", payload); // Adjust the endpoint URL as necessary

      toast.success("Department added successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="rounded bg-primary text-white py-2 px-4 font-semibold text-xs lg:text-base"
      >
        + Add Department
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="text-primary font-semibold text-lg">Add Department</p>
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
                    placeholder="Name"
                  />
                  <Input
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="Description"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      name="price"
                      label="Price"
                      placeholder="0"
                    />
                    <Input
                      type="number"
                      name="quantity"
                      label="Quantity"
                      placeholder="0"
                    />
                  </div>

                  {/* <div>
                    <p className="font-semibold mb-2">Sub-Departments</p>
                    {subDepartments.map((subDepartment, index) => (
                      <div key={index} className="flex gap-4 mb-4">
                        <Input
                          type="text"
                          value={subDepartment.name}
                          placeholder={`Sub-Department ${index + 1}`}
                          onChange={(e: any) => handleSubDepartmentChange(index, e.target.value)}
                        />
                        <button type="button" onClick={() => removeSubDepartment(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={addSubDepartment} className="text-primary underline">
                      + Add Sub-Department
                    </button>
                  </div> */}
                </div>

                <Button
                  className="w-full bg-primary disabled:bg-primary/50 text-white py-2 rounded font-medium flex items-center justify-center"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <span>Add</span>
                </Button>
              </Form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DepartmentForm;

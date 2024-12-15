/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useState} from "react";
import * as yup from "yup";
import {Form, Formik} from "formik";
import toast from "react-hot-toast";
import {Dialog, DialogBody} from "@material-tailwind/react";
import {CloseIcon, EditIcon} from "icons/index";
import {Input} from "../ui/forms";
import Button from "../ui/button";

interface EditProps {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Value {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(5, "Price must be greater than 5"),
  quantity: yup.number().required("Quantity is required"),
});

const EditProduct: React.FC<EditProps> = ({
  id,
  name,
  description,
  price,
  quantity,
}) => {
  const [open, setOpen] = useState(false);

  // This function handle the modal state
  const handleOpen = () => setOpen(!open);

  //   This function updates product
  const onSubmit = async (values: Value, setSubmitting: any) => {
    const {name, description, price, quantity} = values;

    try {
      toast.success("Product edited successfully");
      handleOpen();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <EditIcon />
      </button>
      {/* This component represents the modal dialog for product deletion confirmation. */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="text-primary font-semibold text-lg">Edit Product</p>
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>

          <Formik
            initialValues={{
              name,
              description,
              price,
              quantity,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                // This form is to update the inventory using formik
                <Form action="" autoComplete="off" className="p-4">
                  <div className="grid grid-cols-1 gap-4 w-full mb-8">
                    {/* Name */}
                    <Input
                      type="text"
                      name="name"
                      label="Name"
                      placeholder="Name"
                    />
                    {/* Description */}
                    <Input
                      type="text"
                      name="description"
                      label="Description"
                      placeholder="Description"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      {/* price */}
                      <Input
                        type="number"
                        name="price"
                        label="Price"
                        placeholder="0"
                      />
                      {/* quantity */}
                      <Input
                        type="number"
                        name="quantity"
                        label="Quauntity"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary disabled:bg-primary/50 text-white py-2 rounded font-medium flex items-center justify-center"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    <span>Confirm</span>
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default EditProduct;

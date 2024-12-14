/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {useState} from "react";
import {Dialog, DialogBody} from "@material-tailwind/react";
import {CloseIcon, DeleteIcon} from "icons/index";
import toast from "react-hot-toast";
import Button from "../ui/button";

interface EditProps {
  id: string;
}

const DeleteDepartment: React.FC<EditProps> = ({id}) => {
  const [open, setOpen] = useState(false);

  // This function handle the modal state
  const handleOpen = () => setOpen(!open);

  //   This function deletes product
  const deleteFunction = async () => {
    try {
      toast.success("Product deleted successfully");
      handleOpen();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button onClick={handleOpen}>
        <DeleteIcon />
      </button>
      {/* This component represents the modal dialog for product deletion confirmation. */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[300px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden rounded-md">
          <div className="flex justify-end p-3 border-b">
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-center text-black mb-4">
              Are you sure you want to delete this product
            </p>
            {/* This section contains the button to cofirm or cancel the delete  */}
            <div className="flex justify-center gap-4">
              <button
                className="py-3 px-6 bg-transparent border border-black rounded-md text-black text-sm font-semibold"
                onClick={handleOpen}
              >
                Cancel
              </button>
              <Button
                className="py-3 px-6 bg-red-700 border border-red-700 rounded-md text-white text-sm font-semibold"
                onClick={deleteFunction}
              >
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DeleteDepartment;

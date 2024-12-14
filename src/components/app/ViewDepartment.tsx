"use client";
import {useState} from "react";
import {Dialog, DialogBody} from "@material-tailwind/react";
import {CloseIcon, EyeIcon} from "icons/index";

interface EditProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ViewProduct: React.FC<EditProps> = ({
  name,
  description,
  price,
  quantity,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={handleOpen}>
        <EyeIcon />
      </button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden rounded-md">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="text-black font-semibold text-lg">
              {name.substring(0, 30)}
            </p>
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-4 w-full mb-8">
              {/* Name */}
              <div className="w-full flex flex-col gap-2 text-sm">
                <label className="font-medium text-black">Name</label>
                <input
                  className="border border-black text-black font-medium rounded px-3 py-2 focus:outline-none focus:border-inherit w-full bg-white text-sm"
                  value={name}
                  disabled
                />
              </div>
              {/* Description */}
              <div className="w-full flex flex-col gap-2 text-sm">
                <label className="font-medium text-black">Description</label>
                <input
                  className="border border-black text-black font-medium rounded px-3 py-2 focus:outline-none focus:border-inherit w-full bg-white text-sm"
                  value={description}
                  disabled
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="w-full flex flex-col gap-2 text-sm">
                  <label className="font-medium text-black">Price</label>
                  <input
                    className="border border-black text-black font-medium rounded px-3 py-2 focus:outline-none focus:border-inherit w-full bg-white text-sm"
                    value={price}
                    disabled
                  />
                </div>
                {/* Quantity */}
                <div className="w-full flex flex-col gap-2 text-sm">
                  <label className="font-medium text-black">Quantity</label>
                  <input
                    className="border border-black text-black font-medium rounded px-3 py-2 focus:outline-none focus:border-inherit w-full bg-white text-sm"
                    value={quantity}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ViewProduct;

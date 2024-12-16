"use client";
import {useState} from "react";
import {Dialog, DialogBody} from "@material-tailwind/react";
import {CloseIcon, EyeIcon} from "icons/index";

interface EditProps {
  id: string;
  name: string;
  createdAt: Date;
  subDepartments: SubDepartment[];
}

const ViewDepartment: React.FC<EditProps> = ({name, subDepartments}) => {
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
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
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
                  className="border border-primary text-black font-medium rounded px-3 py-2 focus:outline-none focus:border-inherit w-full bg-white text-sm"
                  value={name}
                  disabled
                />
              </div>

              <div className="">
                <h4 className="font-semibold">Sub Departments</h4>

                {subDepartments !== null ? (
                  subDepartments.length > 0 ? (
                    subDepartments.map(({name}, index) => {
                      return (
                        <div
                          className="flex gap-2 text-sm text-black/80"
                          key={index}
                        >
                          <p className="w-5">{index + 1}.</p>
                          <p className="">{name}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm">No sub departments yet</p>
                  )
                ) : (
                  <p className="text-sm">No sub departments yet</p>
                )}
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ViewDepartment;

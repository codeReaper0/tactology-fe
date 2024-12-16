/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {signOut, useSession} from "next-auth/react";
import {Dialog, DialogBody} from "@material-tailwind/react";
import {CloseIcon, DeleteIcon, EditIcon} from "icons/index";
import Button from "../ui/button";
import toast from "react-hot-toast";
import apiClient from "@/lib/axios";

interface SubDepartmentFormProps {
  departmentId: string;
  fetchDepartments: () => void;
}

const SubDepartmentForm: React.FC<SubDepartmentFormProps> = ({
  departmentId,
  fetchDepartments,
}) => {
  const [name, setName] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const handleOpen = () => setOpen(!open);

  const fetchSubDepartments = async () => {
    if (!session?.accessToken) {
      return;
    }

    const query = `
	  query GetAllSubDepartments {
		getAllSubDepartments {
		  id
		  name
		  createdAt
		  updatedAt
		  deletedAt
		}
	  }
	`;

    try {
      const response = await apiClient.post(
        "graphql",
        {query},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      // Fetch all sub-departments
      const subDepartments = response.data?.data?.getAllSubDepartments;

      if (!subDepartments) {
        throw new Error(
          response.data?.errors?.[0]?.message ||
            "Failed to fetch sub-departments."
        );
      }

      // Update state with the fetched sub-departments
      setData(subDepartments);
    } catch (error: any) {
      console.error("Error fetching sub-departments:", error.message || error);
    }
  };

  useEffect(() => {
    fetchSubDepartments();
  }, []);

  // Add Subdepartment
  const handleAddSubDepartment = async () => {
    if (!session?.accessToken) {
      signOut();
      return;
    }

    try {
      const subDepartmentDto = {
        departmentId: departmentId,
        name: name,
      };

      const query = `
		mutation CreateSubDepartment($subDepartmentDto: SubDepartmentDto!) {
		  createSubDepartment(subDepartmentDto: $subDepartmentDto) {
			id
			name
		  }
		}
	  `;

      const variables = {subDepartmentDto};

      const response = await apiClient.post(
        "/graphql",
        {query, variables},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const data = response.data?.data?.createSubDepartment;

      if (!data) {
        throw new Error(
          response.data?.errors?.[0]?.message || "An error occurred"
        );
      }

      toast.success("Subdepartment created successfully");
      fetchDepartments();
      fetchSubDepartments();
      setName("");
    } catch (error: any) {
      if (error.message.includes("duplicate key")) {
        toast.error(
          "SubDepartment with the same name or department already exists."
        );
      } else {
        toast.error(error.message || "An error occurred");
      }
    }
  };

  // Edit Subdepartment
  const handleEditSubDepartment = async (subDepartmentId: string) => {
    if (!session?.accessToken) {
      signOut();
      return;
    }

    try {
      const query = `
        mutation UpdateSubDepartment($id: String!, $name: String!) {
          updateSubDepartment(id: $id, name: $name) {
            id
            name
          }
        }
      `;

      const variables = {id: subDepartmentId, name: editName};

      const response = await apiClient.post(
        "/graphql",
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

      const updatedSubDepartment = response.data?.data?.updateSubDepartment;

      if (!updatedSubDepartment) {
        throw new Error(
          response.data?.errors?.[0]?.message || "An error occurred"
        );
      }

      toast.success("Subdepartment updated successfully");
      fetchDepartments();
      fetchSubDepartments();
      setEditing(null);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  // Delete Subdepartment
  const handleDeleteSubDepartment = async (subDepartmentId: string) => {
    if (!session?.accessToken) {
      signOut();
      return;
    }

    try {
      const query = `
        mutation DeleteSubDepartment($id: String!) {
          deleteSubDepartment(id: $id) {
            message
          }
        }
      `;

      const variables = {id: subDepartmentId};

      const response = await apiClient.post(
        "/graphql",
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

      const data = response.data?.data?.deleteSubDepartment;

      if (!data) {
        throw new Error(
          response.data?.errors?.[0]?.message || "An error occurred"
        );
      }

      toast.success(data.message || "Subdepartment deleted successfully");
      fetchDepartments();
      fetchSubDepartments();
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="font-semibold text-xs py-1 px-2">
        Sub-departments
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="focus:outline-none flex items-center justify-center rounded-none bg-transparent shadow-none"
      >
        <DialogBody className="w-[400px] max-h-[90vh] p-0 bg-white rounded-10 overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <p className="text-primary font-semibold text-lg">
              Sub Departments
            </p>
            <button onClick={handleOpen}>
              <CloseIcon />
            </button>
          </div>

          <div className="p-4">
            <h2 className="font-semibold mb-4">Manage Subdepartments</h2>

            {/* Add New Subdepartment */}
            <div>
              <input
                type="text"
                value={name}
                className="border border-border-light rounded-4 h-10 px-4 bg-transparent py-3 focus:outline-primary focus:border-inherit text-text-primary w-full text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter subdepartment name"
              />
              <Button className="w-full mt-4" onClick={handleAddSubDepartment}>
                Add Subdepartment
              </Button>
            </div>
            <h4 className="mt-4 font-semibold">Sub-Departments</h4>
            <ul className="mt-3 divide-y">
              {data !== null ? (
                data.length > 0 ? (
                  data.map((sub) => (
                    <li key={sub.id} className="py-2">
                      {editing === sub.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editName}
                            className="border border-border-light rounded-4 h-10 px-4 bg-transparent py-3 focus:outline-primary focus:border-inherit text-text-primary w-full text-sm"
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Edit subdepartment name"
                          />
                          <Button
                            size={"sm"}
                            onClick={() => handleEditSubDepartment(sub.id)}
                          >
                            Save
                          </Button>
                          <Button
                            className="bg-danger-text"
                            size={"sm"}
                            onClick={() => setEditing(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-black/80 font-medium">
                            {sub.name}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditing(sub.id);
                                setEditName(sub.name);
                              }}
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteSubDepartment(sub.id)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <p>No sub departments yet</p>
                )
              ) : (
                <p>No sub departments yet</p>
              )}
            </ul>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SubDepartmentForm;

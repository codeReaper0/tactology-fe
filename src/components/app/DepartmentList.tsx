/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {useState, useEffect} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import EditProduct, {EditDepartmentForm} from "./EditDepartment";
import ViewProduct from "./ViewDepartment";
import DeleteProduct, {DeleteDepartmentForm} from "./DeleteDepartment";
import {TableDataD} from "../ui/table";
import EmptyStateUi from "../ui/EmptyStateUi";
import apiClient, {API_URL} from "@/lib/axios";
import moment from "moment";
import ViewDepartment from "./ViewDepartment";
import DepartmentForm from "./DepartmentForm";
const TABLE_HEAD = ["#", "Name", "Date Created", "Actions"];

const DepartmentList: React.FC = () => {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const {data: session} = useSession();

  const fetchDepartments = async () => {
    if (!session?.accessToken) {
      return;
    }

    setLoading(true);

    const query = `
      query FindAll($query: PaginationsDto!) {
        findAll(query: $query) {
          data {
            id
            name
            subDepartments {
              id
              name
              department {
                id
                name
                createdAt
                updatedAt
                deletedAt
              }
              createdAt
              updatedAt
              deletedAt
            }
            createdAt
            updatedAt
            deletedAt
          }
          count
          currentPage
          lastPage
        }
      }
    `;

    const variables = {
      query: {
        startDate: "2024-01-01T00:00:00Z",
        endDate: "2024-12-31T23:59:59Z",
        page: active,
        pageSize: 10,
      },
    };

    try {
      const response = await apiClient.post(
        "graphql",
        {query, variables},
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      const departments = response.data?.data?.findAll?.data;

      if (!departments) {
        throw new Error(
          response.data?.errors?.[0]?.message || "Failed to fetch departments."
        );
      }

      setData(departments);
    } catch (error: any) {
      console.error("Error fetching departments:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchDepartments();
    }
  }, [session, active]);

  const handlePageChange = (page: number) => {
    setActive(page);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="lg:text-lg font-medium">Departments</h1>
        <DepartmentForm fetchDepartments={fetchDepartments} />
      </div>
      <div className="flex-grow overflow-y-auto lg:pr-2">
        <table className="overflow-y-auto w-full min-w-full table-auto text-left">
          <thead>
            <tr className="border-b border-b-e1e6ef bg-[#f9f9f9]">
              {TABLE_HEAD.map((head) => (
                <th key={head} className="p-4 text-sm text-999 font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.length > 0 &&
              data.map(
                (
                  {id, name, createdAt, subDepartments}: Department,
                  index: number
                ) => (
                  <tr key={id}>
                    <TableDataD content={index + 1} />
                    <TableDataD content={name} />
                    <TableDataD
                      content={moment(createdAt).format("MMMM DD, YYYY")}
                    />
                    <td className="flex items-center gap-3 p-4">
                      <ViewDepartment
                        createdAt={createdAt}
                        id={id}
                        name={name}
                        subDepartments={subDepartments}
                      />
                      <EditDepartmentForm
                        fetchDepartments={fetchDepartments}
                        department={{id, name}}
                      />
                      <DeleteDepartmentForm
                        fetchDepartments={fetchDepartments}
                        department={{id, name}}
                      />
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          data.length < 1 && <EmptyStateUi />
        )}
      </div>
    </>
  );
};

export default DepartmentList;

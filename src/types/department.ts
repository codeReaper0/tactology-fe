type SubDepartment = {
  id: string;
  name: string;
  department: Department;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

type Department = {
  id: string;
  name: string;
  subDepartments: SubDepartment[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

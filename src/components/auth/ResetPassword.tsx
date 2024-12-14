/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import * as yup from "yup";
import Button from "../ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Form, Formik, FormikHelpers} from "formik";
import {InputPassword} from "../ui/forms";

const initialValues = {
  password: "",
  confirm_password: "",
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export default function ResetPasswordForm() {
  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    try {
      toast.success("Password changed successfully");
      router.push(`/login`);
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mt-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form action="" autoComplete="off">
              <div className="grid grid-cols-1 gap-6 w-full mb-8">
                {/* Name */}
                <div className="relative">
                  <InputPassword
                    name="password"
                    label="Enter new password"
                    placeholder="Password (min. of 8 characters)"
                  />
                </div>
                <div className="relative">
                  <InputPassword
                    name="confirm_password"
                    label="Confirm password"
                    placeholder="Enter same password"
                  />
                </div>
              </div>
              <Button
                className="w-full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Reset password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

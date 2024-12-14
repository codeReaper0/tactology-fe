/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import * as yup from "yup";
import Button from "../ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Form, Formik, FormikHelpers} from "formik";
import {Input} from "../ui/forms";

const initialValues = {
  email: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Email/Phone number is required"),
});

export default function ForgotPasswordForm() {
  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    try {
      toast.success("User verified");
      router.push(`/forgot-password/sent`);
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
                <Input
                  type="text"
                  name="email"
                  label="Email or Phone number"
                  placeholder=""
                />
              </div>
              <Button
                className="w-full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Continue
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

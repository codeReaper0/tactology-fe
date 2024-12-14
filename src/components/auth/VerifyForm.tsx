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
  otp: "",
};

const validationSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
});

export default function VerifyForm() {
  const router = useRouter();

  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    try {
      toast.success("User verified");
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
                <Input
                  type="text"
                  name="otp"
                  label="Enter OTP"
                  placeholder="00000"
                />
              </div>{" "}
              <Button
                className="w-full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Verify
              </Button>
              <div className="flex justify-center">
                <button className="mt-6 text-sm font-medium">
                  Resend verification code
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

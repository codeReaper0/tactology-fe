/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as yup from "yup";
import Button from "../ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Form, Formik, FormikHelpers} from "formik";
import {Input, InputPassword} from "../ui/forms";
import Link from "next/link";
import {signIn} from "next-auth/react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().required("Email/Phone number is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();
  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login Successful");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else if (res?.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("Something went wrong");
      }
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
    <div className="mt-4 w-full">
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
                  placeholder="Email or Phone number"
                />
                {/* Password */}
                <div className="relative">
                  <InputPassword
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                  <Link
                    href="/forgot-password"
                    className="text-xs absolute top-0 right-0"
                  >
                    {" "}
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                className="w-full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Sign in
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

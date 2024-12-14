/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState} from "react";
import * as yup from "yup";
import Button from "../ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {Input, InputPassword} from "../ui/forms";
// import PhoneInput from "react-phone-number-input";

const initialValues = {
  name: "",
  email: "",
  //   phone_number: "",
  password: "",
  agree: false,
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  //   phone_number: yup
  //     .string()
  //     .matches(/^\d{10,15}$/, "Invalid phone number format")
  //     .required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  agree: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});

export default function SignupForm() {
  const router = useRouter();
  //   const [profilePhoneValue, setProfilePhoneValue] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

  //   const handleProfileNumberChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     if (event && event.target && event.target.value !== undefined) {
  //       setProfilePhoneValue(event.target.value);
  //     } else {
  //       setProfilePhoneValue("");
  //     }
  //   };
  const handleCheckboxChange = (event: any, setter: any) => {
    setter(event.target.checked);
  };

  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    const data = {termsChecked: termsChecked};
    try {
      console.log(data);
      toast.success(
        "User registration successful, check your email for verification link."
      );
      router.push(`/verify`);
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
                  type="name"
                  name="name"
                  label="Full name"
                  placeholder="Full name"
                />
                {/* Name */}
                <Input
                  type="email"
                  name="email"
                  label="Email address"
                  placeholder="Email address"
                />

                {/* Phone number */}
                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-medium text-text-dark"
                    htmlFor={"phone_number"}
                  >
                    Phone number
                  </label>

                  {/* <div className="flex border border-[#CECECE] rounded h-12 p-4 ">
                    <PhoneInput
                      defaultCountry="NG"
                      international
                      placeholder="Phone number"
                      value={profilePhoneValue}
                      onChange={() => handleProfileNumberChange}
                      className="border-none h-full focus:outline-none focus:border-none text-text-primary w-full bg-transparent text-sm "
                      name="phone_number"
                    />
                  </div> */}
                </div>

                {/* Password */}
                <div className="relative">
                  <InputPassword
                    name="password"
                    label="Password"
                    placeholder="Password (min. of 8 characters)"
                  />
                </div>

                {/* Agree */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4">
                      <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        className="w-4 h-4 accent-primary"
                        checked={formik.values.agree}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleCheckboxChange(e, setTermsChecked);
                        }}
                      />
                    </div>
                    <label htmlFor="agree" className="text-xs text-text-dark">
                      I have read and agree to Bento’s <b>Terms of Use</b> and{" "}
                      <b>Privacy policy.</b>
                    </label>
                  </div>
                  <ErrorMessage
                    name="agree"
                    component="p"
                    className="text-xs text-primary italic mt-1"
                  />
                </div>
              </div>

              <Button
                className="w-full"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Create my account
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

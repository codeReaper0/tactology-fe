/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState} from "react";
import * as yup from "yup";
import Button from "../ui/button";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {Input, InputPassword} from "../ui/forms";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import {API_URL} from "@/lib/axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone_number: "",
  password: "",
  agree: false,
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
    .required("Phone number is required"),
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
  const [termsChecked, setTermsChecked] = useState(false);

  const handleCheckboxChange = (event: any, setter: any) => {
    setter(event.target.checked);
  };

  const onSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    const {setSubmitting, resetForm} = formikHelpers;
    const {firstName, lastName, email, password, phone_number} = values;

    try {
      // GraphQL mutation to register the user
      const query = `
		  mutation Register($registerUserDto: RegisterUserDto!) {
			registerUser(registerUserDto: $registerUserDto) {
			  accessToken
			}
		  }
		`;

      const variables = {
        registerUserDto: {
          firstName,
          lastName,
          email,
          password,
          phoneNumber: phone_number,
        },
      };

      const response = await axios.post(API_URL, {
        query,
        variables,
      });
      console.log(response);

      const data = response.data?.data?.registerUser;

      if (!data) {
        throw new Error(response.data?.errors[0].message);
      }

      // Assuming the response contains the accessToken
      toast.success("User registration successful, proceed to login");

      // Redirect to the verify page
      router.push("/login");
      resetForm();
    } catch (error: any) {
      if (error.message) {
        // Handle known API errors
        toast.error(error.message || "Registration failed.");
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong.");
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
                <div className="grid grid-cols-2 gap-6">
                  {/* First Name */}
                  <Input
                    type="name"
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                  />

                  {/* Last Name */}
                  <Input
                    type="name"
                    name="lastName"
                    label="Last name"
                    placeholder="Last name"
                  />
                </div>
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

                  <div className="flex border border-[#CECECE] rounded h-12 p-4 ">
                    <PhoneInput
                      defaultCountry="NG"
                      international
                      placeholder="Phone number"
                      value={formik.values.phone_number}
                      onChange={(value: any) =>
                        formik.setFieldValue("phone_number", value)
                      }
                      className="border-none h-full focus:outline-none focus:border-none text-text-primary w-full bg-transparent text-sm "
                      name="phone_number"
                    />
                  </div>
                  <ErrorMessage
                    name={"phone_number"}
                    component="p"
                    className="text-xs text-primary italic mt-1"
                  />
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
                      I have read and agree to tactology’s <b>Terms of Use</b>{" "}
                      and <b>Privacy policy.</b>
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

import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 h-full">
          <div className="py-12 h-full flex flex-col items-center justify-center">
            <div>
              <h1 className="text-2xl xl:text-3xl font-extrabold text-center">
                Sign in
              </h1>
              <p className="text-sm text-center">
                Welcome back, login to continue where you stopped.
              </p>
            </div>
            <LoginForm />
            <p className="text-xs text-gray-600 mt-2">
              New here{" "}
              <Link href={"/register"} className="font-bold">
                Sign up
              </Link>{" "}
              to access our service.
            </p>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  password: "",
  name: "",
};

const Auth = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const inputStyles =
    "border border-gray-300  sm:text-sm text-black rounded:lg block w-full p-2.5 outline-none";
  const [formData, setFormData] =
    useState<typeof defaultFormData>(defaultFormData);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success, Please sign in to continue");
      }
    } catch (error) {
      toast.error("An Error Occured while signing up");
    }
  };

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error Occured Signing in");
    }
  };

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an Account
          </h1>
          <p>OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
            />
            |
            <FcGoogle
              onClick={loginHandler}
              className="ml-3 text-4xl cursor-pointer"
            />
          </span>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abcd@xyz.com"
            required
            onChange={handleOnChange}
            className={inputStyles}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            onChange={handleOnChange}
            minLength={6}
            value={formData.password}
            className={inputStyles}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="name"
            required
            onChange={handleOnChange}
            className={inputStyles}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Sign Up
          </button>
        </form>

        <button
          type="submit"
          onClick={loginHandler}
          className="text-blue-700 underline"
        >
          login
        </button>
      </div>
    </section>
  );
};

export default Auth;

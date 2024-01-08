"use client";

import { FormEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const defaultFormData = {
  email: "",
  password: "",
  name: "",
};

const Auth = () => {
  const inputStyles =
    "border border-gray-300  sm:text-sm text-black rounded:lg block w-full p-2.5 outline-none";
  const [formData, setFormData] =
    useState<typeof defaultFormData>(defaultFormData);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
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
            <AiFillGithub className="mr-3 text-4xl cursor-pointer text-black dark:text-white" />
            |
            <FcGoogle className="ml-3 text-4xl cursor-pointer" />
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

        <button type="submit" className="text-blue-700 underline">
          login
        </button>
      </div>
    </section>
  );
};

export default Auth;

"use client";

import React, { useState } from "react";

import { Label } from "../../component/ui/label";
import { Input } from "../../component/ui/input";
import { Button, buttonVariants } from "../../component/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { cn } from "../../utils/app";

const Page = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [creatingUser, setcreatingUser] = useState(false);
  const [error, seterror] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcreatingUser(true);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      seterror(true);
    }
    setemail("");
    setpassword("");

    setcreatingUser(false);
  };

  return (
    <>
<div>
<div>
        <div className="right-3 ">
          <Link href={"/"} className=" mt-2 relative ">
            <Button
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute left-4 top-4 md:left-8 md:top-8 text-slate-500"
              )}
            >
              Back
            </Button>
          </Link>
        </div>
        </div>
    <div className="container flex h-screen w-screen flex-col items-center justify-center ">
     
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          hellow
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Man
          </h1>
          {error ? (
            <div className="text-red-900">Error hai bhai {error.message}</div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter your email to register
            </p>
          )}
        </div>
        <div className="grid gap-6">
  {/* <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="email" className="mt-2  mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <Label htmlFor="email" className="mt-2  mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <Button disabled={creatingUser} type="submit" className="mt-2">
                Register
              </Button>
            </div>
          </form> */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button onClick={()=>signIn('google',{callbackUrl:'/'})} type="button">Google</Button>
        </div>
          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4"
          >
        <p className="px-8 text-center text-sm text-muted-foreground">
             have an account? Login
        </p>
          </Link>
      </div>
    </div>
</div>
    </>
  );
};

export default Page;

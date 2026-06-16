"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "../schemas/signin.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginRequest } from "../api/auth.api";
import { authStorage } from "@/lib/auth-storage";
import { setCredentials } from "../auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { typography } from "@/design-system";

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const router = useRouter();

  async function onSubmit(data: LoginFormData) {
    try {
      console.log(data);
      const response = await loginRequest(data);

      authStorage.setToken(response.accessToken);

      dispatch(
        setCredentials({
          // accessToken: response.accessToken,
          user: response.user,
        }),
      );

      router.push("/dashboard");

      toast.success("Signed in successfully");
    } catch {
      toast.error("Unable to sign in");
    }
  }

  return (
    <Card className="border-border/50 shadow-lg backdrop-blur">
      <p className="text-sm font-medium text-primary px-4">LearnStack</p>
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to continue building, organizing, and sharing your technical
          knowledge.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input placeholder="Enter your email" {...register("email")} />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="Enter your Password"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign in "}
          </Button>

          <div className={`border-t pt-4 text-center ${typography.muted} `}>
            Don't have an account?
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

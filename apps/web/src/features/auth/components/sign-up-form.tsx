"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signupRequest } from "../api";
import { signupSchema } from "../schemas";
import { SignUpFormData } from "../types";

import { typography } from "@/design-system";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      await signupRequest(data);

      toast.success("Account created successfully");

      reset();

      router.push("/sign-in");
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      toast.error(
        apiError.response?.data?.message || "Unable to create account",
      );
    }
  }

  return (
    <Card className="border-border/50 shadow-lg backdrop-blur">
      <p className="text-sm font-medium text-primary px-4">LearnStack</p>
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>

        <CardDescription>
          Start creating workspaces, documents, and learning resources with
          LearnStack.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Input placeholder="Enter your name" {...register("name")} />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

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
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>

          <div className={`border-t pt-4 text-center ${typography.muted} `}>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

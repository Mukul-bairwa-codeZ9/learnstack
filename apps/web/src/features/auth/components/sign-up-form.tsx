"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { signupSchema } from "../schemas/signup.schema";
import { signupRequest } from "../api/auth.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(
    data: SignUpFormData,
  ) {
    try {
      await signupRequest(data);

      toast.success(
        "Account created successfully",
      );

      reset();

      router.push("/sign-in");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create account",
      );
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          Create Account
        </CardTitle>

        <CardDescription>
          Start building your developer
          knowledge base.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-5"
        >
          <div>
            <Input
              placeholder="Full Name"
              {...register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register(
                "password",
              )}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
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
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "../schemas/signin.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginRequest } from "../api/auth.api";
import { authStorage } from "@/lib/auth-storage";
import { setCredentials } from "../auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
          accessToken: response.accessToken,
        }),
      );

      router.push("/dashboard");

      toast.success("Signed in successfully");
    } catch {
      toast.error("Unable to sign in");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Email" {...register("email")} />

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
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

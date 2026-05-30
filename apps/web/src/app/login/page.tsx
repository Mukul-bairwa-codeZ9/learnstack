'use client';

import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import {
  Button,
  Card,
  CardBody,
  Input,
} from '@heroui/react';

import {
  loginRequest,
  getProfileRequest,
} from '@/features/auth/auth.api';

import {
  setCredentials,
  setUser,
} from '@/features/auth/auth.slice';

export default function LoginPage() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await loginRequest({
          email,
          password,
        });

      dispatch(
        setCredentials({
          accessToken:
            response.accessToken,
        }),
      );

      Cookies.set(
        'accessToken',
        response.accessToken,
      );

      const user =
        await getProfileRequest(
          response.accessToken,
        );

      dispatch(setUser(user));

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-4">
        <CardBody className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold">
              Login
            </h1>

            <p className="text-sm text-default-500">
              Continue to your workspace
            </p>
          </div>

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={e =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={e =>
              setPassword(
                e.target.value,
              )
            }
          />

          <Button
            color="primary"
            isLoading={loading}
            onPress={handleLogin}
            fullWidth
          >
            Login
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
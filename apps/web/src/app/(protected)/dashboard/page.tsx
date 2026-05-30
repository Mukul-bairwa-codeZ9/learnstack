'use client';

import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export default function DashboardPage() {
  const user = useSelector(
    (state: RootState) =>
      state.auth.user,
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p>
        Welcome {user?.name}
      </p>
    </div>
  );
}
"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Flex } from 'antd';

type Post = {
  user_id: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

export default function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>مشکلی به وجود آمده: {(error as Error).message}</div>;
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-lg font-bold sm:text-xl md:text-2xl">سلام دنیا</h1>
      <Button type="primary">سلام علیکم</Button>
    </div>
  );
}

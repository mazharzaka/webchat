import { Chatwapper } from '@/components/Chatwapper';
import { ragchat } from '@/lib/rag-chat';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';
import React from 'react';

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

// Safely handle URL decoding and joining
function consturl(url: string | string[] | undefined): string {
  if (!url) return ''; // Handle undefined URL
  const urlArray = Array.isArray(url) ? url : [url];
  return urlArray.map((e) => decodeURIComponent(e)).join('/');
}

export default async function Page({ params }: PageProps) {
  const sessionCookie = (await cookies()).get("sessionid")?.value;
  const url = consturl(params.url);
  
  // Check for valid URL before proceeding
  if (!url) {
    console.error("Invalid URL:", url);
    return <div>Error: Invalid URL</div>;
  }

  const sessionId = (url + '--' + sessionCookie).replace(/\//g, "");
  
  // Check if URL is already indexed
  const isAlready = await redis.sismember("indexed-urls", url);
  console.log("isAlready", isAlready);
  
  if (!isAlready) {
    await ragchat.context.add({
      type: "html",
      source: url,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", url);
  }

  const initialMessages = await ragchat.history.getMessages({ amount: 10, sessionId });
  return <Chatwapper sessionId={sessionId} initialMessages={initialMessages} />;
}

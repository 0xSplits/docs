import React from 'react'

import { Docs, generateImage } from '../../../components/OpengraphImage'

import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest): Promise<void | Response> {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? ''
  return generateImage(<Docs title={title} />)
}

import React from 'react'

import { Docs, generateImage } from '../../../components/OpengraphImage'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? ''
  return generateImage(<Docs title={title} />)
}

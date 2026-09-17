/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ImageResponse } from 'next/og'

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
}

// Satori fetches <img> sources itself, and a failed fetch aborts the render
// after the 200 header has streamed, leaving scrapers a cached empty body. The
// wordmark is bundled as a data URI so the card never depends on a host.
const wordmark = fetch(
  new URL('../public/splits_wordmark_dark.svg', import.meta.url),
)
  .then((res) => res.text())
  .then((svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`)

export async function generateImage(
  children: React.ReactElement,
): Promise<void | Response> {
  return new ImageResponse(children, {
    ...OG_IMAGE_SIZE,
    fonts: [
      {
        name: 'InterRegular',
        data: await fetch(
          new URL('../public/fonts/Inter-Regular.ttf', import.meta.url),
        ).then((res) => res.arrayBuffer()),
        style: 'normal',
        weight: 500,
      },
      {
        name: 'InterMedium',
        data: await fetch(
          new URL('../public/fonts/Inter-Medium.ttf', import.meta.url),
        ).then((res) => res.arrayBuffer()),
        style: 'normal',
        weight: 400,
      },
    ],
  })
}

export function Background({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        color: '#ffffff',
        backgroundColor: '#0F172A',
      }}
    >
      {children}
    </div>
  )
}

export async function Docs({
  title,
}: {
  title: string
}): Promise<React.ReactElement> {
  const wordmarkSrc = await wordmark
  return (
    <Background>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          fontFamily: 'InterRegular',
          padding: 80,
        }}
      >
        <h1 style={{ fontSize: 104 }}>{title}</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={wordmarkSrc}
            alt="splits wordmark"
            width={254}
            height={68}
          />
          <div style={{ display: 'flex', marginTop: '6px' }}>
            <h1
              style={{
                fontSize: 56,
                marginLeft: 24,
                color: '#94A3B8',
              }}
            >
              Docs
            </h1>
          </div>
        </div>
      </div>
    </Background>
  )
}

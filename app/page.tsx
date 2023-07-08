'use client'

import Image from 'next/image'
import * as React from 'react'

import { useState } from 'react'
import { pink } from '@mui/material/colors'
import Radio from '@mui/material/Radio'

const primary = `#FF4081`
const secondary = `#070204`
const chatBackground = `#0D0609`
const border = `#92294C`

export default function Page() {
  const [selectedValue, setSelectedValue] = React.useState('a')
  const colorSchemes = [
    {
      name: 'Default',
      primary: '#FF4081',
      secondary: '#070204',
      background: '#000000',
      chatBackground: '#0D0609',
      border: '#92294C',
    },

    {
      name: 'Hacker',
      primary: '#40FF53',
      secondary: '#020703',
      chatBackground: '#060C06',
      border: '#01FFA4',
    },

    {
      name: 'Blue',
      primary: '#00A3FF',
      secondary: '#020307',
      chatBackground: '#06070C',
      border: '#00D1FF',
    },

    {
      name: '',
      primary: '#',
      secondary: '#',
      chatBackground: '#',
      border: '#',
    },

    {
      name: '',
      primary: '#',
      secondary: '#',
      chatBackground: '#',
      border: '#',
    },
  ]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  })

  return (
    <>
      <h1 className="text-3xl ">Login Page</h1>
      <div className={`   `}>
        {/* <Radio
          {...controlProps('a')}
          sx={{
            color: `${primary}`,
            '&.Mui-checked': {
              color: `${primary}`,
            },
          }}
        />
        <Radio
          {...controlProps('b')}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <Radio
          {...controlProps('c')}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <Radio
          {...controlProps('d')}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        />
        <Radio
          {...controlProps('e')}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
        /> */}
      </div>
    </>
  )
}

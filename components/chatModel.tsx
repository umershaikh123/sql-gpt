import React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { FormControl, FormHelperText } from '@mui/material'
import { makeStyles } from '@mui/material'
import { styled } from '@mui/material'
const currencies = [
  {
    value: 'gpt3.5',
    label: 'GPT-3.5',
  },
  {
    value: 'gpt4',
    label: 'GPT-4',
  },
]

const HelperText = styled(FormHelperText)({
  // color: `${theme.palette.border.main}`, // Specify the desired helper text color
  color: theme.palette.primary.main,
})

export default function SelectTextFields() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '25ch',

            color: theme.palette.primary.main,
          },

          '& label': {
            color: theme.palette.primary.main,
          },

          '& .MuiInputBase-input': {
            color: theme.palette.primary.main,
          },

          '& label.Mui-focused': {
            transition: 'all 0.3s ease-in-out',
          },
          '& .MuiInput-underline:after': {
            transition: 'all 0.3s ease-in-out',
            borderBottomColor: theme.palette.border.main,
          },

          '& fieldset': {
            transition: 'all 0.3s ease-in-out',
            borderColor: theme.palette.border.main,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Model"
            defaultValue="gpt3.5"
            helperText={<HelperText>Please select your GPT model</HelperText>}
            SelectProps={{
              IconComponent: ({ className }) => (
                <ArrowDropDownIcon
                  className={className}
                  style={{ color: theme.palette.primary.main }}
                />
              ),
            }}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export const ChatModel = () => {
  return (
    <>
      <Box sx={{ mt: 2, mx: 2 }}>
        <SelectTextFields />
      </Box>
    </>
  )
}

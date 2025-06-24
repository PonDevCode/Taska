import React from 'react'
import {
  useColorScheme,
} from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { themeData } from './constant';
import { Box } from '@mui/system';
const icon = {
  icon1: (
    <DarkModeIcon fontSize='small' />
  ),
  icon2: (
    <LightModeIcon fontSize='small' />
  ),
  icon3: (
    <SettingsSuggestIcon fontSize='small' />
  ),
}
const DarkMode = () => {
  const { mode, setMode } = useColorScheme();
  const handleChange = (event) => {
    setMode(event.target.value);
  };
  if (!mode) return null;
  return (
    <div><FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-dark-mode" sx={{fontSize:'14px'}}>Mode</InputLabel>
      <Select
        labelId="select-dark-mode"
        id="demo-select-small"
        value={mode}
        label="Status"
        onChange={handleChange}
        sx={{
          fontSize: '12px',
          height: 32,
        }}
      >
        {themeData.map((item, i) => {
          return (
            <MenuItem sx={{ fontSize: '10px', py: 0.5 }} value={item.status} key={i}>
              <Box sx={{ display: 'flex', justifyItems: 'center', gap: 1 }}>
                {icon[item.icon]}{item.status}
              </Box>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
    </div>
  )
}
export default DarkMode
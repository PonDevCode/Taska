/* eslint-disable no-unused-vars */
import { useColorScheme } from "@mui/material";
import { useMediaQuery } from "@mui/system";

export const useDarkMode = () => {
    const { mode } = useColorScheme();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let bgcl = ''
    if (mode === 'dark') {
        return bgcl = 'dark'
    } else if (mode === 'light') {
        return bgcl = 'light'
    } else {
        if (prefersDarkMode) {
            return bgcl = 'dark'
        } else {
            return bgcl = 'light'
        }
    }

}
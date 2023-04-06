import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAppDispatch } from '../app/hooks';
import DateRangeFilter from './DateRangeFilter';
import { openSidebar } from '../app/sidebar-slice';

export const SideBar = () => {
    const dispatch = useAppDispatch();

    const handleDrawerClose = () => {
        dispatch(openSidebar(false))
    }
    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                </IconButton>
                Filter Results
            </Grid>
            <DateRangeFilter />
        </Grid>
    )
}

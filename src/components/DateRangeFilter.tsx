import React, { useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import locale from 'date-fns/locale/en-US';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { filterEndDate, filterStartDate } from '../app/filters-slice';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const DateRangeFilter: React.FC = () => {
    const { startDate, endDate } = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();

    const handleStartDate = useCallback((date: Date | null) => dispatch(filterStartDate(date ? date.toISOString() : null)), []);
    const handleEndDate = useCallback((date: Date | null) => dispatch(filterEndDate(date ? date.toISOString() : null)), []);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
        <Grid item>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontSize: '16px' }}
            >Filter by Period
            </Typography>
        </Grid>
        <Grid item>
            <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                    <MobileDatePicker
                        slotProps={{ textField: { size: 'small', variant: 'standard' } }}
                        label="Start Date"
                        value={startDate ? new Date(startDate) : null}
                        onChange={handleStartDate}
                        format="MM/dd/yyyy"
                        disableFuture
                        maxDate={endDate ? new Date(endDate) : new Date()}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MobileDatePicker
                        slotProps={{ textField: { size: 'small',  variant: 'standard'} }}
                        label="End Date"
                        value={endDate ? new Date(endDate) : null}
                        onChange={handleEndDate}
                        format="MM/dd/yyyy"
                        disableFuture
                        minDate={startDate ? new Date(startDate) : new Date()}
                    />
                </Grid>
            </Grid>
        </Grid>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;

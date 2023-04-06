import * as React from 'react';
import { Chip, IconButton, Grid, MenuItem, Menu} from "@mui/material"
import { Check } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FilterIcon from '@mui/icons-material/FilterAlt';
import { clearAllFilters, filterEndDate, filterStartDate } from '../app/filters-slice';
import { formatDate } from '../helpers/helpers';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { openSidebar } from '../app/sidebar-slice';

export const FilterBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const {startDate, endDate}  = useAppSelector((state) => state.filters);
  const sidebarOpen  = useAppSelector((state) => state.sidebar);
  const handleDrawerToggler = () => {
    dispatch(openSidebar(!sidebarOpen));
  };
  const handleStartClear = useCallback(() => {
    dispatch(filterStartDate(null))
  }, [dispatch])

  const handleEndClear = useCallback(() => {
    dispatch(filterEndDate(null))
  }, [dispatch])
  
  const handleClearAllFilters = useCallback(() => {
    dispatch(clearAllFilters())
    handleClose()
  }, [dispatch])

  return (
    <Grid container spacing={2} alignItems="center" direction='row'>
      <Grid item>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          size="large"
          role="drawerToggler"
          onClick={handleDrawerToggler}
        >
          <FilterIcon />
        </IconButton>
      </Grid>
      {startDate && <Grid item>
        <Chip icon={<Check/>} label={`Active since ${formatDate(startDate)}`} onDelete={handleStartClear} />
      </Grid>}
      {endDate && <Grid item>
        <Chip icon={<Check/>} label={`Active until ${formatDate(endDate)}`} onDelete={handleEndClear} />
      </Grid>}
      <Grid item style={{ marginLeft: 'auto' }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            title="filter menu"
            size="large"
            role="filterMenu"
            onClick={handleClick}
          >
            <MoreVertIcon />
        </IconButton>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={openMenu}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClearAllFilters}>Clear all filters</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}

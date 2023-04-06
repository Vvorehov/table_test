import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CampaignSearch from './CampaignSearch';
import { AppBarProps } from '../App';

export default function Header(props: AppBarProps) {
  return (
      <AppBar position="static" {...props}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Campaigns
          </Typography>
          <CampaignSearch />
        </Toolbar>
      </AppBar>
  );
}
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import Paper from '@mui/material/Paper';
import { formatDate, formatToUSD } from '../helpers/helpers';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FilterBar } from './FilterBar';
import { useState } from 'react';

const CampaignList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {startDate, endDate, searchFilter} = useAppSelector((state) => state.filters);
  const campaigns = useAppSelector((state) => state.campaigns.campaignsList);
  const filteredCampaigns = campaigns.filter((campaign) => {
    const nameMatch = campaign.name.toLowerCase().includes(searchFilter.toLowerCase());
    const startDateMatch = startDate ? new Date(campaign.startDate) >= new Date(startDate) : true;
    const endDateMatch = endDate ? new Date(campaign.endDate) <= new Date(endDate) : true;
    const validDateRange = new Date(campaign.endDate) > new Date(campaign.startDate)
    return nameMatch && startDateMatch && endDateMatch && validDateRange;
  });

  const isActive = (startDate: string, endDate: string): boolean => {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return startDateObj < today && today < endDateObj
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (<>
    <TableContainer component={Paper} sx={{ height: '50rem'}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={5}>
            <FilterBar />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
          <TableCell style={{fontWeight: 'bold'}}>Start Date</TableCell>
          <TableCell style={{fontWeight: 'bold'}}>End Date</TableCell>
          <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
          <TableCell style={{fontWeight: 'bold'}}>Budget (USD)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {(rowsPerPage > 0
            ? filteredCampaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredCampaigns
          ).map((campaign, index) => (
          <TableRow key={`${campaign.id}-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>{campaign.name}</TableCell>
            <TableCell>{formatDate(campaign.startDate)}</TableCell>
            <TableCell>{formatDate(campaign.endDate)}</TableCell>
            <TableCell>{isActive(campaign.startDate, campaign.endDate) 
              ? <Tooltip title="Active"><CheckCircleOutlineIcon color="success" /></Tooltip>
              : <Tooltip title="Inactive"><HighlightOffIcon color="error" /></Tooltip>}</TableCell>
            <TableCell>{formatToUSD(campaign.budget)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={campaigns.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /></>
  );
};

export default CampaignList


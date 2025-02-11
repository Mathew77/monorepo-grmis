import * as React from 'react';
import { useState } from 'react';

import { Container, Typography, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const fundingData = [
  { id: 1, fund: 'Brazil', name: 'Brazil Fund Forest Sector', sector: 'AFOLU', deadline: '04-03-2025', status: 'Live' },
  { id: 2, fund: 'Thailand', name: 'Thailand Green Finance and Carbon Markets sector', sector: 'Green Finance', deadline: '04-01-2025', status: 'Closed' },
  { id: 3, fund: 'Colombia', name: 'Colombia Solar Energy for Off-grid Communities', sector: 'Energy', deadline: '04-03-2025', status: 'Live' },
  { id: 4, fund: 'Nigeria', name: 'Nigeria Clean Energy Transition', sector: 'Clean Energy', deadline: '04-03-2025', status: 'Live' },
  { id: 5, fund: 'Kenya', name: 'Kenya Clean Energy Transition', sector: 'Clean Energy', deadline: '04-03-2025', status: 'Live' },
  { id: 6, fund: 'South Africa', name: 'Climate Strategy and Clean Energy', sector: 'Climate Strategy', deadline: '31-12-2024', status: 'Closed' },
  { id: 7, fund: 'Amazon', name: 'Agriculture, Forests and Other', sector: 'AFOLU', deadline: '20-09-2024', status: 'Closed' },
];

export default function FundingOpportunities() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filteredData = fundingData.filter((item) =>
    (filter === 'ALL' || item.fund === filter) &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="#011E62">Available Funding Opportunities</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        See below the list of available funding opportunities. Click on the programme you wish to apply for to view more details.
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <TextField
          variant="outlined"
          placeholder="Search CFP..."
          size="small"
          sx={{ width: 300 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 120 }}
        >
          <MenuItem value="ALL">ALL</MenuItem>
          {[...new Set(fundingData.map(item => item.fund))].map(fund => (
            <MenuItem key={fund} value={fund}>{fund}</MenuItem>
          ))}
        </TextField>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Fund</TableCell>
              <TableCell>CFP Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Application Deadline</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.fund}</TableCell>
                <TableCell><Typography fontWeight="bold" color="#011E62">{row.name}</Typography></TableCell>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.deadline}</TableCell>
                <TableCell>
                  <span style={{
                    backgroundColor: row.status === 'Live' ? '#C8E6C9' : '#FFCDD2',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="text" sx={{ color: '#F44336', textTransform: 'none' }}>View details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
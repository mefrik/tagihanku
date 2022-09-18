import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Menu({tag}) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
          transaction
        </Link>
        <Typography color="text.primary">{tag}</Typography>
      </Breadcrumbs>
    </div>
  )
}

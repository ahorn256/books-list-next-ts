import { useState } from 'react';
import { Fab, Grid2 as Grid, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import List from './List';
import { useTranslations } from 'next-intl';
import FormDialog from './FormDialog';

function BooksApp() {
  const [ filter, setFilter ] = useState('');
  const t = useTranslations();
  const [ openDialog , setOpenDialog ] = useState(false);

  function onFilter(filterText: string) {
    setFilter(filterText);
  }

  function onAdd() {
    setOpenDialog(true);
  }

  return (
    <>
      <Grid container
        direction='column'
        alignItems="center"
        paddingLeft={2}
        paddingRight={2}
        rowSpacing={2}
        data-testid='books-grid'>
        <Grid width='100%'>
          <TextField
            label={t('form.field-label.filter-books')}
            value={filter}
            onChange={(e) => onFilter(e.target.value)} />
        </Grid>
        <Grid size={{xs:12, md:10}}>
          <List filterByTitle={filter}/>
        </Grid>
        <Fab
          color='primary'
          sx={{ transform:'translateY(-50%)' }}
          onClick={onAdd}>
          <Add />
        </Fab>
      </Grid>
      { openDialog && <FormDialog onClose={() => setOpenDialog(false)} /> }
      {/* TODO: <Outlet /> */}
    </>
  );
}

export default BooksApp;

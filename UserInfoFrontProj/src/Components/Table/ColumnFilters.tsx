import { FilterValue } from 'react-table';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  filterInput: {
    padding: theme.spacing(1),
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
    flexGrow: 1,
    fontSize: '14px',
  },
  filterButton: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: theme.spacing(1),
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
}));

const DefaultColumnFilter = ({
  column: { filterValue, setFilter },
}: {
  column: {
    filterValue: FilterValue;
    setFilter: (value: FilterValue) => void;
  };
}) => {
  const classes = useStyles();

  return (
    <div className={classes.filterContainer}>
      <Input
        className={classes.filterInput}
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
      />
    </div>
  );
};

export default DefaultColumnFilter;

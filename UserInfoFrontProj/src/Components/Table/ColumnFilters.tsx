import { FilterValue } from 'react-table';

export const DefaultColumnFilter = ({
    column: { filterValue, setFilter },
  }: {
    column: {
      filterValue: FilterValue;
      setFilter: (value: FilterValue) => void;
    };
  }) => {
    return (
      <input
        value={filterValue || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`Filter`}
      />
    );
  };
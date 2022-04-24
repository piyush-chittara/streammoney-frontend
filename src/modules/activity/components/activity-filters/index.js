import { JustifyAround } from '@shared/components/flex';
import { AddressFilters } from './AddressFilters';
import { DateFilters } from './DateFilters';
import { ActivityFilter } from './ActivityFilter';

export const Filters = ({ onFilterChange }) => {
  return (
    <JustifyAround sx={{ maxWidth: 600 }}>
      <DateFilters onFilterChange={onFilterChange} />
      <ActivityFilter onFilterChange={onFilterChange} />
      <AddressFilters onFilterChange={onFilterChange} />
    </JustifyAround>
  );
};

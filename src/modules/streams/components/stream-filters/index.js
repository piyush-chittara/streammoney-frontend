import { JustifyAround } from '@shared/components/flex';
import { AddressFilters } from './AddressFilters';
import { CurrencyFilters } from './CurrencyFilters';
import { StreamFilters } from './StreamFilters';

export const Filters = ({ onFilterChange }) => {
  return (
    <JustifyAround sx={{ maxWidth: 600 }}>
      <AddressFilters onFilterChange={onFilterChange} />
      <StreamFilters onFilterChange={onFilterChange} />
      <CurrencyFilters onFilterChange={onFilterChange} />
    </JustifyAround>
  );
};

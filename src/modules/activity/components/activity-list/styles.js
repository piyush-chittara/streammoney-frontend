import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { JustifyBetween, Flex } from '@shared/components/flex';

export const ActivityItemContainer = styled(JustifyBetween)`
  padding: 1rem;
`;

export const ActivityDetails = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

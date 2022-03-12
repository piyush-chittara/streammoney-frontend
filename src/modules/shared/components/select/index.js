import PropTypes from 'prop-types';

import { useTheme, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MuiSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { OneOfType } from '@utils/prop-helpers';

export const SelectInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};

function getStyles(theme) {
  return {
    fontWeight: theme.typography.fontWeightMedium,
  };
}

export const Select = ({
  value,
  onChange,
  options,
  renderOption,
  isDisabled,
  isInvalid,
  readOnly,
  isRequired,
  inputProps,
  wrapperSx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <FormControl
      sx={{ ...wrapperSx, width: '100%' }}
      disabled={isDisabled}
      error={isInvalid}
      required={isRequired}
    >
      <MuiSelect
        {...props}
        onChange={onChange}
        value={value}
        input={<SelectInput />}
        MenuProps={MenuProps}
        inputProps={{
          'aria-label': 'Without label',
          readOnly,
          ...inputProps,
        }}
      >
        {options.map((o) => {
          return (
            <MenuItem key={o.value} value={o.value} style={getStyles(theme)}>
              <Box display="flex" alignItems="center" width="100%">
                {renderOption ? (
                  renderOption(o)
                ) : (
                  <Typography ml={1}>{o.label}</Typography>
                )}
              </Box>
            </MenuItem>
          );
        })}
      </MuiSelect>
    </FormControl>
  );
};

Select.propTypes = {
  value: OneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: OneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  renderOption: PropTypes.func,
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  readOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  inputProps: PropTypes.shape({}),
  wrapperSx: PropTypes.shape({}),
};

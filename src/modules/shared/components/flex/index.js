import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { ReactNode, OneOf } from '@utils/prop-helpers';

const justifyContentMap = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignItemsMap = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  strech: 'stretch',
  baseline: 'baseline',
};

const alignContentMap = {
  center: 'center',
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  strech: 'stretch',
};

export const Flex = styled(Box)(
  ({
    direction = 'row',
    display = 'flex',
    wrap = 'wrap',
    justify,
    align = 'center',
    alignContent,
  }) => {
    return {
      width: '100%',
      display,
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justifyContentMap[justify],
      alignItems: alignItemsMap[align],
      alignContent: alignContentMap[alignContent],
    };
  },
);

Flex.propTypes = {
  children: ReactNode,
  direction: OneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  display: OneOf(['flex', 'inline-flex']),
  wrap: OneOf(['wrap', 'no-wrap', 'wrap-reverse']),
  justify: OneOf(Object.keys(justifyContentMap)),
  align: OneOf(Object.keys(alignItemsMap)),
  alignContent: OneOf(Object.keys(alignContentMap)),
};

export const JustifyCenter = ({ children, ...rest }) => {
  return (
    <Flex justify="center" {...rest}>
      {children}
    </Flex>
  );
};

export const JustifyBetween = ({ children, ...rest }) => {
  return (
    <Flex justify="between" {...rest}>
      {children}
    </Flex>
  );
};

export const JustifyStart = ({ children, ...rest }) => {
  return (
    <Flex justify="start" {...rest}>
      {children}
    </Flex>
  );
};

export const JustifyEnd = ({ children, ...rest }) => {
  return (
    <Flex justify="end" {...rest}>
      {children}
    </Flex>
  );
};

export const JustifyAround = ({ children, ...rest }) => {
  return (
    <Flex justify="around" {...rest}>
      {children}
    </Flex>
  );
};

export const JustifyEvenly = ({ children, ...rest }) => {
  return (
    <Flex justify="evenly" {...rest}>
      {children}
    </Flex>
  );
};

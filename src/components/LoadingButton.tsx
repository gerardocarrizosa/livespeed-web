import { Button, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'large' | 'medium' | 'small';
  type?: 'button' | 'submit' | 'reset';
}

export const LoadingButton = (props: LoadingButtonProps) => {
  return (
    // <div>
    <Button
      type={props.type}
      size={props.size}
      variant={props.variant ? props.variant : 'contained'}
    >
      {!props.isLoading ? props.text : <CircularProgress size={24} />}
    </Button>
    // </div>
  );
};

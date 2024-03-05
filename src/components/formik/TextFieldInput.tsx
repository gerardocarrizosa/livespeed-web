import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

interface ITextFieldInput {
  name: string;
  label?: string;
  type: React.HTMLInputTypeAttribute;
  size?: 'small' | 'medium';
  placeholder?: string;
}

const TextFieldInput = (props: ITextFieldInput) => {
  const [field, meta] = useField(props);
  return (
    <Stack>
      <TextField
        {...field}
        {...props}
        size={props.size ? props.size : 'small'}
      />
      {meta.touched && meta.error ? (
        <Typography variant="caption" color="red">
          {meta.error}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default TextFieldInput;

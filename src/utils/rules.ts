export const rulePassword = {
  required: { value: true, message: 'Password is required' },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message: 'Password must be at least one uppercase letter,one lowercase letter, and a number.',
  },
  minLength: {
    value: 8,
    message: 'Password must be at least 8-16 characters.',
  },
  maxLength: {
    value: 16,
    message: 'Password must be at least 8-16 characters.',
  },
};

export const ruleRePassword = {
  required: { value: true, message: 'Confirm Password not correct.' },
  minLength: {
    value: 8,
    message: 'Confirm password not correct',
  },
};

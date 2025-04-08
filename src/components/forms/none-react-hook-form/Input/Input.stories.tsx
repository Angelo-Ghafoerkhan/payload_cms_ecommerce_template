import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

// Correct mock for react-hook-form's register function
const mockRegister: UseFormRegister<FieldValues> = (name) => ({
  onChange: async () => true,  // Return a Promise as expected
  onBlur: async () => true,    // Return a Promise as expected
  ref: () => {},
  name
});

const meta: Meta<typeof Input> = {
  title: 'Components/ui/forms/none-react-hook-form/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
    args: {
    id: 'text',
    label: 'Text Input',
    register: mockRegister,
    errors: {} as FieldErrors,
    placeholder: 'Enter text here',
    required: true
    }
};

export const TextArea: Story = {
    args: {
    id: 'textarea',
    type: 'textarea',
    label: 'Text Area',
    register: mockRegister,
    errors: {} as FieldErrors,
    placeholder: 'Enter text here',
    required: true
    }
};

export const TextError: Story = {
    args: {
        id: 'text-error',
        label: 'Text Input Error',
        register: mockRegister,
        errors: {
            'text-error': {
                type: 'required',
                message: 'This field is required',
            }
        } as FieldErrors, 
        placeholder: 'Enter text here',
        required: true
    }
};


export const TextAreaError: Story = {
    args: {
    id: 'textarea-error',
    type: 'textarea',
    label: 'Text Area',
    register: mockRegister,
    errors: {
        'textarea-error': {
            type: 'required',
            message: 'This field is required',
        }
    } as FieldErrors, 
    placeholder: 'Enter text here',
    required: true
    }
};

export const TextDisabled: Story = {
    args: {
        id: 'text',
        label: 'Disabled Text Input',
        register: mockRegister,
        errors: {} as FieldErrors,
        placeholder: '...',
        disabled: true
    }
};


export const Date: Story = {
    args: {
        id: 'date',
        type: 'date',
        label: 'Date Input',
        register: mockRegister,
        errors: {} as FieldErrors,
        placeholder: '...',
        required: true
    }
};


export const Password: Story = {
    args: {
        id: 'text',
        type: 'password',
        label: 'Password Input',
        register: mockRegister,
        errors: {} as FieldErrors,
        placeholder: 'Enter password',
        required: true
    }
};

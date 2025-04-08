import type {Meta, StoryObj} from '@storybook/react'
import Select from './Select'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

// Correct mock for react-hook-form's register function
const mockRegister: UseFormRegister<FieldValues> = (name) => ({
    onChange: async () => true,  // Return a Promise as expected
    onBlur: async () => true,    // Return a Promise as expected
    ref: () => {},
    name
  });

const meta: Meta<typeof Select> = {
    title: 'Components/ui/forms/react-hook-form/Select',
    component: Select,
    parameters: {
        layout: 'centered'
    }
};


export default meta;
type Story = StoryObj<typeof Select>;

export const Text: Story = {
    args: {
    id: 'text',
    label: 'Select',
    register: mockRegister,
    errors: {} as FieldErrors,
    required: true,
    options: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
    ]
    }
};

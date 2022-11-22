import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpandInput from './ExpandInput';

export default {
  title: 'ExpandInput',
  component: ExpandInput,
} as ComponentMeta<typeof ExpandInput>;

const Story: ComponentStory<typeof ExpandInput> = args => <ExpandInput {...args} />;

export const AlertInput = Story.bind({});
AlertInput.args = {
  onSubmit: (value: string) => {
    alert(value);
  },
};

export const NoSubmitInput = Story.bind({});
NoSubmitInput.args = {};

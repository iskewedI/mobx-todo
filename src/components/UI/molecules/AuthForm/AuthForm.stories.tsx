import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FormType } from '../../../../types/enums';
import AuthForm from './AuthForm';

export default {
  title: 'AuthForm',
  component: AuthForm,
} as ComponentMeta<typeof AuthForm>;

const Story: ComponentStory<typeof AuthForm> = args => <AuthForm {...args} />;

export const LogIn = Story.bind({});
LogIn.args = {
  type: FormType.LogIn,
};

export const Register = Story.bind({});
Register.args = {
  type: FormType.Register,
};

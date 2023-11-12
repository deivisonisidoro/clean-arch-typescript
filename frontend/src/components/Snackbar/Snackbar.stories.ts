import { Meta, StoryObj } from "@storybook/react";
import Snackbar  from ".";
import { SnackbarMessageType } from "../../utils/enums/snackbarMessages";

const meta ={
  title: "Components/Form/Snackbar",
  component: Snackbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story= {
  args: {
   message: "Succes: User created!",
   type: SnackbarMessageType.Success
  }
}
export const Success: Story= {
  args: {
   message: "Succes: User created!",
   type: SnackbarMessageType.Success
  }
}
export const Warning: Story= {
  args: {
   message: "Warning: User created, but not logged",
   type: SnackbarMessageType.Warning
  }
}
export const Info: Story= {
  args: {
   message: "Info: User already exists!",
   type: SnackbarMessageType.Info
  }
}
export const Error: Story= {
  args: {
   message: "Error: User already exists!",
   type: SnackbarMessageType.Error
  }
}
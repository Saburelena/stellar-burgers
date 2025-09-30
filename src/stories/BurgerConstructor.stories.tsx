import { BurgerConstructorUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';
import { ConnectDropTarget } from 'react-dnd';

const noopDropTarget: ConnectDropTarget = ((_node: Element | null) =>
  undefined) as unknown as ConnectDropTarget;

const meta: Meta<typeof BurgerConstructorUI> = {
  title: 'Example/BurgerConstructor',
  component: BurgerConstructorUI,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultConstructor: Story = {
  args: {
    constructorItems: { bun: null, ingredients: [] },
    orderRequest: false,
    price: 0,
    onOrderClick: () => undefined,
    onDeleteClick: () => undefined,
    moveCard: () => undefined,
    dropTargetRef: noopDropTarget,
    error: null
  }
};

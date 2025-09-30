import { FC, memo, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, moveCard, onDelete }) => {
    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, drag] = useDrag({
      type: 'constructor-item',
      item: () => ({ id: ingredient.id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    const [, drop] = useDrop<{ id: string; index: number }>({
      accept: 'constructor-item',
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) {
          return;
        }
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveCard(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    });

    drag(drop(ref));

    const handleMoveDown = useCallback(() => {
      if (index < totalItems - 1) {
        moveCard(index, index + 1);
      }
    }, [index, totalItems, moveCard]);

    const handleMoveUp = useCallback(() => {
      if (index > 0) {
        moveCard(index, index - 1);
      }
    }, [index, moveCard]);

    const handleClose = useCallback(() => {
      onDelete(ingredient.id);
    }, [onDelete, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ref={ref}
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        isDragging={isDragging}
      />
    );
  }
);

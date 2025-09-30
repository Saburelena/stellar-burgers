import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement } from '@components';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  onOrderClick,
  onDeleteClick,
  moveCard,
  dropTargetRef,
  error
}) => (
  <section className={styles.burger_constructor} ref={dropTargetRef}>
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type='top'
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements}>
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
              moveCard={moveCard}
              onDelete={onDeleteClick}
            />
          )
        )
      ) : (
        <div
          className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите начинку
        </div>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        children='Оформить заказ'
        onClick={onOrderClick}
        disabled={
          orderRequest ||
          !constructorItems.bun ||
          constructorItems.ingredients.length === 0
        }
      />
    </div>
    {error && (
      <p className='text text_type_main-default mt-4 text_color_error'>
        {error}
      </p>
    )}
  </section>
);

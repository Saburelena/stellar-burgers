// src/components/burger-ingredients/burger-ingredients.tsx
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BurgerIngredientsUI } from '@ui';
import { TIngredient, TTabMode } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getIngredientsApi,
  getIngredientsApiLoading,
  getIngredientsApiError
} from '@selectors';
import { fetchIngredients } from '@slices/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredientsApi);
  const isLoading = useAppSelector(getIngredientsApiLoading);
  const error = useAppSelector(getIngredientsApiError);
  const [hasRequested, setHasRequested] = useState(false);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [buns, mains, sauces] = useMemo(() => {
    const buns: TIngredient[] = [];
    const mains: TIngredient[] = [];
    const sauces: TIngredient[] = [];

    ingredients.forEach((ingredient: TIngredient) => {
      if (ingredient.type === 'bun') {
        buns.push(ingredient);
      } else if (ingredient.type === 'main') {
        mains.push(ingredient);
      } else if (ingredient.type === 'sauce') {
        sauces.push(ingredient);
      }
    });

    return [buns, mains, sauces];
  }, [ingredients]);

  const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
  const showStub = isOffline || (!!error && !isLoading);

  const bunsToRender = showStub ? [] : buns;
  const mainsToRender = showStub ? [] : mains;
  const saucesToRender = showStub ? [] : sauces;

  const [bunsRef, bunsInView] = useInView({
    rootMargin: '-100px 0px 0px 0px',
    threshold: 0
  });
  const [mainsRef, mainsInView] = useInView({
    rootMargin: '-100px 0px 0px 0px',
    threshold: 0
  });
  const [saucesRef, saucesInView] = useInView({
    rootMargin: '-100px 0px 0px 0px',
    threshold: 0
  });

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('bun');
    } else if (saucesInView) {
      setCurrentTab('sauce');
    } else if (mainsInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, mainsInView, saucesInView]);

  useEffect(() => {
    if (!ingredients.length && !isLoading && !hasRequested) {
      dispatch(fetchIngredients());
      setHasRequested(true);
    }
  }, [dispatch, ingredients.length, isLoading, hasRequested]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={bunsToRender}
      mains={mainsToRender}
      sauces={saucesToRender}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};

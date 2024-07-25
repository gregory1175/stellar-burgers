import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientState } from '../../services/slices/ingredientSlice/ingredientSlice';
import { useAppSelector } from '../../services/store';
import { Params, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { ingredients } = useAppSelector(getIngredientState);
  const { id } = useParams<Params>();

  const ingredientData = ingredients.find((i) => {
    if (i._id === id) {
      return i;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

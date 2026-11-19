import React from 'react';
import PictureMatchGame from './PictureMatchGame';
import BalloonPopGame from './BalloonPopGame';
import FruitBasketGame from './FruitBasketGame';
import AnimalSoundsGame from './AnimalSoundsGame';
import HealthyFoodSortGame from './HealthyFoodSortGame';
import SmartWorkshopGame from './SmartWorkshopGame';
import SafeUnsafeGame from './SafeUnsafeGame';
import MemoryCardsGame from './MemoryCardsGame';
import ColourHuntGame from './ColourHuntGame';
import NumberTrainGame from './NumberTrainGame';
import ShapeDetectiveGame from './ShapeDetectiveGame';
import FamilyMatchGame from './FamilyMatchGame';
import HygieneRoutineGame from './HygieneRoutineGame';
import FractionPizzaGame from './FractionPizzaGame';
import TeamChallengeGame from './TeamChallengeGame';

export const GameHubRouter = ({ gameCode }) => {
  switch (gameCode) {
    case 'picture_match':
      return <PictureMatchGame />;
    case 'balloon_pop':
      return <BalloonPopGame />;
    case 'fruit_basket':
      return <FruitBasketGame />;
    case 'animal_sounds':
      return <AnimalSoundsGame />;
    case 'healthy_food_sort':
      return <HealthyFoodSortGame />;
    case 'smart_workshop':
      return <SmartWorkshopGame />;
    case 'safe_unsafe':
      return <SafeUnsafeGame />;
    case 'memory_cards':
      return <MemoryCardsGame />;
    case 'colour_hunt':
      return <ColourHuntGame />;
    case 'number_train':
      return <NumberTrainGame />;
    case 'shape_detective':
      return <ShapeDetectiveGame />;
    case 'family_match':
      return <FamilyMatchGame />;
    case 'hygiene_routine':
      return <HygieneRoutineGame />;
    case 'fraction_pizza':
      return <FractionPizzaGame />;
    case 'team_challenge':
      return <TeamChallengeGame />;
    default:
      return <PictureMatchGame />;
  }
};

export default GameHubRouter;


import { type Quiz } from '../../topics/types';
import { type TopicId } from '../../../types/domain';

import { prehistoireQuizzes } from './prehistoire/prehistoire';
import { neolithiqueQuizzes } from './neolithique/neolithique';
import { antiquiteQuizzes } from './antiquite/antiquite';
import { moyenAgeQuizzes } from './moyen_age/moyen_age';
import { epoqueModerneQuizzes } from './epoque_moderne/epoque_moderne';
import { epoqueContemporaineQuizzes } from './epoque_contemporaine/epoque_contemporaine';

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ...prehistoireQuizzes,
  ...neolithiqueQuizzes,
  ...antiquiteQuizzes,
  ...moyenAgeQuizzes,
  ...epoqueModerneQuizzes,
  ...epoqueContemporaineQuizzes,
};

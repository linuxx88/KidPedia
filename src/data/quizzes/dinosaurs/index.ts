import { type Quiz } from '../../topics/types';
import { type TopicId } from '../../../types/domain';

import { carnivoreQuizzes, carnivoreQuizBanks } from './carnivore/carnivore';
import { herbivoreQuizzes, herbivoreQuizBanks } from './herbivore/herbivore';
import { reptileQuizzes, reptileQuizBanks } from './reptile/reptile';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
  ...carnivoreQuizBanks,
  ...herbivoreQuizBanks,
  ...reptileQuizBanks,
};

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ...carnivoreQuizzes,
  ...herbivoreQuizzes,
  ...reptileQuizzes,
};

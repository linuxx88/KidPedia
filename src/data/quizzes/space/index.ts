import { type Quiz } from '../../topics/types';
import { type TopicId } from '../../../types/domain';

import { soleilPlanetesQuizBanks, soleilPlanetesQuizzes } from './soleil_planetes/soleil_planetes';
import { explorationQuizBanks, explorationQuizzes } from './exploration/exploration';
import { bigBangQuizBanks, bigBangQuizzes } from './big_bang/big_bang';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
  ...soleilPlanetesQuizBanks,
  ...explorationQuizBanks,
  ...bigBangQuizBanks,
};

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ...soleilPlanetesQuizzes,
  ...explorationQuizzes,
  ...bigBangQuizzes,
};

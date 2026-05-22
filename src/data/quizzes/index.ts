import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

import { QUIZ_BANKS as spaceQuizBanks, QUIZZES as spaceQuizzes } from './space';
import { QUIZZES as animalsQuizzes } from './animals';
import { QUIZZES as artsQuizzes } from './arts';
import { QUIZZES as dinosaursQuizzes } from './dinosaurs';
import { QUIZZES as geographyQuizzes } from './geography';
import { QUIZZES as historyQuizzes } from './history';
import { QUIZZES as humanBodyQuizzes } from './humanBody';
import { QUIZZES as inventionsQuizzes } from './inventions';
import { QUIZZES as natureQuizzes } from './nature';
import { QUIZZES as questionsQuizzes } from './questions';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
  ...spaceQuizBanks,
};

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ...spaceQuizzes,
  ...animalsQuizzes,
  ...artsQuizzes,
  ...dinosaursQuizzes,
  ...geographyQuizzes,
  ...historyQuizzes,
  ...humanBodyQuizzes,
  ...inventionsQuizzes,
  ...natureQuizzes,
  ...questionsQuizzes,
};

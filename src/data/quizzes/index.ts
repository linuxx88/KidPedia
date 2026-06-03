import { type Quiz } from '../topics/types';
import { type TopicId } from '../../types/domain';

import { QUIZ_BANKS as spaceQuizBanks, QUIZZES as spaceQuizzes } from './space';
import { QUIZZES as animalsQuizzes, QUIZ_BANKS as animalsQuizBanks } from './animals';
import { QUIZZES as artsQuizzes, QUIZ_BANKS as artsQuizBanks } from './arts';
import { QUIZZES as dinosaursQuizzes, QUIZ_BANKS as dinosaursQuizBanks } from './dinosaurs';
import { QUIZZES as geographyQuizzes, QUIZ_BANKS as geographyQuizBanks } from './geography';
import { QUIZZES as historyQuizzes, QUIZ_BANKS as historyQuizBanks } from './history';
import { QUIZZES as humanBodyQuizzes, QUIZ_BANKS as humanBodyQuizBanks } from './humanBody';
import { QUIZZES as inventionsQuizzes, QUIZ_BANKS as inventionsQuizBanks } from './inventions';
import { QUIZZES as natureQuizzes, QUIZ_BANKS as natureQuizBanks } from './nature';
import { QUIZZES as questionsQuizzes, QUIZ_BANKS as questionsQuizBanks } from './questions';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
  ...spaceQuizBanks,
  ...animalsQuizBanks,
  ...dinosaursQuizBanks,
  ...natureQuizBanks,
  ...geographyQuizBanks,
  ...artsQuizBanks,
  ...humanBodyQuizBanks,
  ...inventionsQuizBanks,
  ...questionsQuizBanks,
  ...historyQuizBanks,
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

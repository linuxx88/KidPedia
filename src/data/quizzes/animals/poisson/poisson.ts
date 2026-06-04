import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import poissonQuizzesData from './poisson.json';

const typedPoissonQuizzes = poissonQuizzesData as Record<string, Quiz[]>;

export const poissonQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const poissonQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedPoissonQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  poissonQuizBanks[topicId] = list;
  if (list.length > 0) {
    poissonQuizzes[topicId] = list[0];
  }
});

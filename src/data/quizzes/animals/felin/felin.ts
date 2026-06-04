import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import felinQuizzesData from './felin.json';

const typedFelinQuizzes = felinQuizzesData as Record<string, Quiz[]>;

export const felinQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const felinQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedFelinQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  felinQuizBanks[topicId] = list;
  if (list.length > 0) {
    felinQuizzes[topicId] = list[0];
  }
});

import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import reptileQuizzesData from './reptile.json';

const typedReptileQuizzes = reptileQuizzesData as Record<string, Quiz[]>;

export const reptileQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const reptileQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedReptileQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  reptileQuizBanks[topicId] = list;
  if (list.length > 0) {
    reptileQuizzes[topicId] = list[0];
  }
});

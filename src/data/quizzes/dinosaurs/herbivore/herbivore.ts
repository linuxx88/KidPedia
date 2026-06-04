import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import herbivoreQuizzesData from './herbivore.json';

const typedHerbivoreQuizzes = herbivoreQuizzesData as Record<string, Quiz[]>;

export const herbivoreQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const herbivoreQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedHerbivoreQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  herbivoreQuizBanks[topicId] = list;
  if (list.length > 0) {
    herbivoreQuizzes[topicId] = list[0];
  }
});

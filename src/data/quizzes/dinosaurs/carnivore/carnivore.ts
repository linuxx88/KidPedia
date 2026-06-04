import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import carnivoreQuizzesData from './carnivore.json';

const typedCarnivoreQuizzes = carnivoreQuizzesData as Record<string, Quiz[]>;

export const carnivoreQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const carnivoreQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedCarnivoreQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  carnivoreQuizBanks[topicId] = list;
  if (list.length > 0) {
    carnivoreQuizzes[topicId] = list[0];
  }
});

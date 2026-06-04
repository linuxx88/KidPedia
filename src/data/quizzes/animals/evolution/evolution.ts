import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import evolutionQuizzesData from './evolution.json';

const typedEvolutionQuizzes = evolutionQuizzesData as Record<string, Quiz[]>;

export const evolutionQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const evolutionQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedEvolutionQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  evolutionQuizBanks[topicId] = list;
  if (list.length > 0) {
    evolutionQuizzes[topicId] = list[0];
  }
});

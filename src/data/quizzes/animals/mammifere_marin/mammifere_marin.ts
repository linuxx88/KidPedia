import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import mammifereMarinQuizzesData from './mammifere_marin.json';

const typedMammifereMarinQuizzes = mammifereMarinQuizzesData as Record<string, Quiz[]>;

export const mammifereMarinQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const mammifereMarinQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedMammifereMarinQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  mammifereMarinQuizBanks[topicId] = list;
  if (list.length > 0) {
    mammifereMarinQuizzes[topicId] = list[0];
  }
});

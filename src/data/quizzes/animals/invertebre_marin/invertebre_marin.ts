import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import invertebreMarinQuizzesData from './invertebre_marin.json';

const typedInvertebreMarinQuizzes = invertebreMarinQuizzesData as Record<string, Quiz[]>;

export const invertebreMarinQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const invertebreMarinQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedInvertebreMarinQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  invertebreMarinQuizBanks[topicId] = list;
  if (list.length > 0) {
    invertebreMarinQuizzes[topicId] = list[0];
  }
});

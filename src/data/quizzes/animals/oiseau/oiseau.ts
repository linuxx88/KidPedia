import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import oiseauQuizzesData from './oiseau.json';

const typedOiseauQuizzes = oiseauQuizzesData as Record<string, Quiz[]>;

export const oiseauQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const oiseauQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedOiseauQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  oiseauQuizBanks[topicId] = list;
  if (list.length > 0) {
    oiseauQuizzes[topicId] = list[0];
  }
});

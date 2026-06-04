import { type Quiz } from '../../../topics/types';
import { type TopicId } from '../../../../types/domain';
import mammifereTerrestreQuizzesData from './mammifere_terrestre.json';

const typedMammifereTerrestreQuizzes = mammifereTerrestreQuizzesData as Record<string, Quiz[]>;

export const mammifereTerrestreQuizBanks: Partial<Record<TopicId, Quiz[]>> = {};
export const mammifereTerrestreQuizzes: Partial<Record<TopicId, Quiz>> = {};

Object.entries(typedMammifereTerrestreQuizzes).forEach(([key, list]) => {
  const topicId = key as TopicId;
  mammifereTerrestreQuizBanks[topicId] = list;
  if (list.length > 0) {
    mammifereTerrestreQuizzes[topicId] = list[0];
  }
});

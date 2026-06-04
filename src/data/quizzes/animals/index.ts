import { type Quiz } from '../../topics/types';
import { type TopicId } from '../../../types/domain';

import { felinQuizzes, felinQuizBanks } from './felin/felin';
import { mammifereTerrestreQuizzes, mammifereTerrestreQuizBanks } from './mammifere_terrestre/mammifere_terrestre';
import { mammifereMarinQuizzes, mammifereMarinQuizBanks } from './mammifere_marin/mammifere_marin';
import { poissonQuizzes, poissonQuizBanks } from './poisson/poisson';
import { oiseauQuizzes, oiseauQuizBanks } from './oiseau/oiseau';
import { reptileQuizzes, reptileQuizBanks } from './reptile/reptile';
import { invertebreMarinQuizzes, invertebreMarinQuizBanks } from './invertebre_marin/invertebre_marin';
import { evolutionQuizzes, evolutionQuizBanks } from './evolution/evolution';

export const QUIZ_BANKS: Partial<Record<TopicId, Quiz[]>> = {
  ...felinQuizBanks,
  ...mammifereTerrestreQuizBanks,
  ...mammifereMarinQuizBanks,
  ...poissonQuizBanks,
  ...oiseauQuizBanks,
  ...reptileQuizBanks,
  ...invertebreMarinQuizBanks,
  ...evolutionQuizBanks,
};

export const QUIZZES: Partial<Record<TopicId, Quiz>> = {
  ...felinQuizzes,
  ...mammifereTerrestreQuizzes,
  ...mammifereMarinQuizzes,
  ...poissonQuizzes,
  ...oiseauQuizzes,
  ...reptileQuizzes,
  ...invertebreMarinQuizzes,
  ...evolutionQuizzes,
};

import { type Quiz } from '../../topics/types';
import { type TopicId } from '../../../types/domain';

import { felinQuizzes } from './felin/felin';
import { mammifereTerrestreQuizzes } from './mammifere_terrestre/mammifere_terrestre';
import { mammifereMarinQuizzes } from './mammifere_marin/mammifere_marin';
import { poissonQuizzes } from './poisson/poisson';
import { oiseauQuizzes } from './oiseau/oiseau';
import { reptileQuizzes } from './reptile/reptile';
import { invertebreMarinQuizzes } from './invertebre_marin/invertebre_marin';
import { evolutionQuizzes } from './evolution/evolution';

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

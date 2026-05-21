import type { TopicId } from '../../types/domain';
import type { LocalizedString } from '../topics/types';

export interface HistoryNode {
  id: string
  title: LocalizedString
  description: LocalizedString
  page: number
  icon: string
  color: string
  subNodes?: HistoryNode[]
  topicId?: TopicId
}

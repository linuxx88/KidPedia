import { animals } from './animals'
import { space } from './space'
import { humanBody } from './humanBody'
import { questions } from './questions'
import { dinosaurs } from './dinosaurs'
import { nature } from './nature'
import { history } from './history'
import { geography } from './geography'
import { inventions } from './inventions'
import { arts } from './arts'


export * from './types'

export const encyclopedia = [
  ...animals,
  ...space,
  ...dinosaurs,
  ...humanBody,
  ...nature,
  ...history,
  ...geography,
  ...inventions,
  ...arts,
  ...questions,
]

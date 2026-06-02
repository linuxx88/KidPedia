import { type Quiz } from '../../../data/topics/types';

const STOP_WORDS = new Set([
  // French
  'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'est', 'estce', 'qui', 'que', 'aux',
  'a', 'pour', 'dans', 'par', 'sur', 'avec', 'plus', 'comme', 'comment', 'quelle', 'quelles',
  'quel', 'quels', 'combien', 'mais', 'ou', 'dont', 'cette', 'ceux', 'celles', 'nouveau',
  // English
  'the', 'of', 'and', 'to', 'in', 'is', 'for', 'on', 'with', 'at', 'by', 'an', 'it', 'its', 'from',
  'that', 'this', 'these', 'those', 'what', 'which', 'who', 'how', 'many', 'much', 'about', 'more',
  'most', 'some', 'any', 'other'
]);

export function isSpoiler(
  funFact: { fr: string; en: string },
  quiz: Quiz,
  topicTitle?: { fr: string; en: string }
): boolean {
  const stripDiacritics = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const cleanString = (str: string) =>
    stripDiacritics(str.toLowerCase())
      .replace(/[\s\u00a0,.;!?:'’"«»()-]/g, ' ');

  const getSignificantWords = (str: string, excludeSet: Set<string>): Set<string> => {
    const cleaned = cleanString(str);
    const words = cleaned.split(/\s+/);
    const result = new Set<string>();
    for (const w of words) {
      if (w.length > 3 && !STOP_WORDS.has(w) && !excludeSet.has(w)) {
        result.add(w);
      }
    }
    return result;
  };

  // Build exclusion set from topic title
  const excludeSet = new Set<string>();
  if (topicTitle) {
    const titleWordsFr = cleanString(topicTitle.fr).split(/\s+/);
    const titleWordsEn = cleanString(topicTitle.en).split(/\s+/);
    titleWordsFr.concat(titleWordsEn).forEach(w => {
      if (w.length > 3) excludeSet.add(w);
    });
  }

  // 1. Direct contains check (legacy robust fallback)
  const funFactFrClean = cleanString(funFact.fr).replace(/\s/g, '');
  const funFactEnClean = cleanString(funFact.en).replace(/\s/g, '');

  const correctOptionFr = quiz.options.fr[quiz.correctAnswer];
  const correctOptionEn = quiz.options.en[quiz.correctAnswer];

  if (correctOptionFr && correctOptionEn) {
    const answerFrClean = cleanString(correctOptionFr).replace(/\s/g, '');
    const answerEnClean = cleanString(correctOptionEn).replace(/\s/g, '');
    
    if (answerFrClean.length > 3 && funFactFrClean.includes(answerFrClean)) {
      return true;
    }
    if (answerEnClean.length > 3 && funFactEnClean.includes(answerEnClean)) {
      return true;
    }
  }

  // 2. Number-based collision on the ENTIRE quiz vs fun fact
  const extractNumbers = (str: string): string[] => {
    const matches = str.match(/\d+/g);
    return matches ? matches.filter(num => num.length >= 2) : [];
  };

  const quizNumbers: string[] = [];
  // From question
  quizNumbers.push(...extractNumbers(quiz.question.fr));
  quizNumbers.push(...extractNumbers(quiz.question.en));
  // From options
  quiz.options.fr.forEach(opt => quizNumbers.push(...extractNumbers(opt)));
  quiz.options.en.forEach(opt => quizNumbers.push(...extractNumbers(opt)));

  for (const num of quizNumbers) {
    if (funFactFrClean.includes(num) || funFactEnClean.includes(num)) {
      return true;
    }
  }

  // 3. Significant word overlap check (Question + Options vs Fun Fact)
  const quizWordsFr = getSignificantWords(quiz.question.fr, excludeSet);
  const quizWordsEn = getSignificantWords(quiz.question.en, excludeSet);
  quiz.options.fr.forEach(opt => {
    getSignificantWords(opt, excludeSet).forEach(w => quizWordsFr.add(w));
  });
  quiz.options.en.forEach(opt => {
    getSignificantWords(opt, excludeSet).forEach(w => quizWordsEn.add(w));
  });

  const funFactWordsFr = getSignificantWords(funFact.fr, excludeSet);
  const funFactWordsEn = getSignificantWords(funFact.en, excludeSet);

  // If they share 2 or more significant words in French or English, it's a spoiler
  let sharedFrCount = 0;
  for (const w of quizWordsFr) {
    if (funFactWordsFr.has(w)) {
      sharedFrCount++;
    }
  }

  let sharedEnCount = 0;
  for (const w of quizWordsEn) {
    if (funFactWordsEn.has(w)) {
      sharedEnCount++;
    }
  }

  if (sharedFrCount >= 2 || sharedEnCount >= 2) {
    return true;
  }

  return false;
}

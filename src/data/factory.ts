import { type Topic, type Quiz, type LocalizedString } from './topics/types';
import { type TopicId } from '../types/domain';

/**
 * Valide qu'un champ est un objet localisé (contenant 'fr' et 'en' comme chaînes non vides).
 */
export function validateLocalizedString(field: unknown, fieldName: string): void {
  if (!field || typeof field !== 'object') {
    throw new Error(`Validation Error: [${fieldName}] must be an object containing localized strings.`);
  }
  const obj = field as Record<string, unknown>;
  if (typeof obj.fr !== 'string' || obj.fr.trim() === '') {
    throw new Error(`Validation Error: [${fieldName}.fr] must be a non-empty string.`);
  }
  if (typeof obj.en !== 'string' || obj.en.trim() === '') {
    throw new Error(`Validation Error: [${fieldName}.en] must be a non-empty string.`);
  }
}

/**
 * Valide le schéma d'un Quiz.
 */
export function validateQuiz(quiz: unknown, topicId: string): void {
  if (!quiz || typeof quiz !== 'object') {
    throw new Error(`Validation Error: Quiz for topic [${topicId}] must be an object.`);
  }

  const obj = quiz as Record<string, unknown>;

  validateLocalizedString(obj.question, `Quiz.question in [${topicId}]`);

  if (typeof obj.correctAnswer !== 'number' || obj.correctAnswer < 0) {
    throw new Error(`Validation Error: Quiz.correctAnswer in [${topicId}] must be a non-negative number.`);
  }

  if (!obj.options || typeof obj.options !== 'object') {
    throw new Error(`Validation Error: Quiz.options in [${topicId}] must be an object.`);
  }

  const optionsObj = obj.options as Record<string, unknown>;
  const optionsFr = optionsObj.fr;
  const optionsEn = optionsObj.en;

  if (!Array.isArray(optionsFr) || optionsFr.length === 0) {
    throw new Error(`Validation Error: Quiz.options.fr in [${topicId}] must be a non-empty array of strings.`);
  }
  if (!Array.isArray(optionsEn) || optionsEn.length === 0) {
    throw new Error(`Validation Error: Quiz.options.en in [${topicId}] must be a non-empty array of strings.`);
  }

  if (optionsFr.length !== optionsEn.length) {
    throw new Error(`Validation Error: Quiz.options in [${topicId}] must have the same number of French and English translations.`);
  }

  if (obj.correctAnswer >= optionsFr.length) {
    throw new Error(`Validation Error: Quiz.correctAnswer [${obj.correctAnswer}] in [${topicId}] out of bounds (options length is ${optionsFr.length}).`);
  }

  optionsFr.forEach((opt: unknown, index: number) => {
    if (typeof opt !== 'string' || opt.trim() === '') {
      throw new Error(`Validation Error: Quiz.options.fr[${index}] in [${topicId}] must be a non-empty string.`);
    }
  });

  optionsEn.forEach((opt: unknown, index: number) => {
    if (typeof opt !== 'string' || opt.trim() === '') {
      throw new Error(`Validation Error: Quiz.options.en[${index}] in [${topicId}] must be a non-empty string.`);
    }
  });

  if (obj.explanation !== undefined) {
    validateLocalizedString(obj.explanation, `Quiz.explanation in [${topicId}]`);
  }

  if (obj.hint !== undefined) {
    validateLocalizedString(obj.hint, `Quiz.hint in [${topicId}]`);
  }
}

/**
 * Data Factory pour valider et créer de façon sécurisée un Topic (sujet d'encyclopédie).
 */
export function createTopicCard(input: unknown): Topic {
  if (!input || typeof input !== 'object') {
    throw new Error('Validation Error: Topic input must be an object.');
  }

  const obj = input as Record<string, unknown>;

  // 1. Validation de l'ID (Doit être kebab-case)
  if (typeof obj.id !== 'string' || obj.id.trim() === '') {
    throw new Error('Validation Error: Topic [id] must be a non-empty string.');
  }
  const kebabRegex = /^[a-z0-9-]+$/;
  if (!kebabRegex.test(obj.id)) {
    throw new Error(`Validation Error: Topic id [${obj.id}] must be formatted in kebab-case.`);
  }

  // 2. Validation des chaînes textuelles simples et emojis
  if (typeof obj.categoryKey !== 'string' || obj.categoryKey.trim() === '') {
    throw new Error(`Validation Error: Topic [${obj.id}] must have a non-empty [categoryKey].`);
  }
  if (typeof obj.icon !== 'string' || obj.icon.trim() === '') {
    throw new Error(`Validation Error: Topic [${obj.id}] must have a non-empty [icon] emoji.`);
  }

  // 3. Validation des chaînes localisées obligatoires
  validateLocalizedString(obj.title, `Topic [${obj.id}].title`);
  validateLocalizedString(obj.category, `Topic [${obj.id}].category`);
  validateLocalizedString(obj.shortDesc, `Topic [${obj.id}].shortDesc`);
  validateLocalizedString(obj.fullContent, `Topic [${obj.id}].fullContent`);
  validateLocalizedString(obj.funFact, `Topic [${obj.id}].funFact`);

  // 4. Validation des éléments optionnels
  if (obj.funFacts !== undefined) {
    if (!Array.isArray(obj.funFacts)) {
      throw new Error(`Validation Error: Topic [${obj.id}].funFacts must be an array.`);
    }
    obj.funFacts.forEach((fact: unknown, index: number) => {
      validateLocalizedString(fact, `Topic [${obj.id}].funFacts[${index}]`);
    });
  }

  if (obj.fullContents !== undefined) {
    if (!Array.isArray(obj.fullContents)) {
      throw new Error(`Validation Error: Topic [${obj.id}].fullContents must be an array.`);
    }
    obj.fullContents.forEach((content: unknown, index: number) => {
      validateLocalizedString(content, `Topic [${obj.id}].fullContents[${index}]`);
    });
  }

  if (obj.quiz !== undefined && obj.quiz !== null) {
    validateQuiz(obj.quiz, obj.id);
  }

  if (obj.audioFile !== undefined) {
    if (typeof obj.audioFile !== 'string' || obj.audioFile.trim() === '') {
      throw new Error(`Validation Error: Topic [${obj.id}].audioFile must be a non-empty string.`);
    }
  }

  if (obj.anchorIcon !== undefined) {
    if (typeof obj.anchorIcon !== 'string' || obj.anchorIcon.trim() === '') {
      throw new Error(`Validation Error: Topic [${obj.id}].anchorIcon must be a non-empty string.`);
    }
  }

  return {
    id: obj.id as TopicId,
    title: obj.title as LocalizedString,
    category: obj.category as LocalizedString,
    categoryKey: obj.categoryKey,
    icon: obj.icon,
    shortDesc: obj.shortDesc as LocalizedString,
    fullContent: obj.fullContent as LocalizedString,
    fullContents: obj.fullContents as readonly LocalizedString[] | undefined,
    funFact: obj.funFact as LocalizedString,
    funFacts: obj.funFacts as readonly LocalizedString[] | undefined,
    quiz: obj.quiz as Quiz | undefined,
    audioFile: obj.audioFile as string | undefined,
    anchorIcon: obj.anchorIcon as string | undefined
  };
}

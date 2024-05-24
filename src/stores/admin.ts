import type { Answer, Question } from '@/types'
import { defineStore } from 'pinia'
import { deleteAnswer, deleteQuestion, patchQuestion, postAnswer, postQuestion } from '@/services/adminService'

export const useAdminStore = defineStore('admin', () => {
  // Questions
  const addQuestion = async (question: Question) => {
    await postQuestion({ question })
  }

  const editQuestion = async (question: Question) => {
    await patchQuestion()
  }

  const removeQuestion = async (question: Question) => {
    await deleteQuestion(question.id)
  }

  // Answers
  const addAnswer = async (question_id: number, answer: Answer) => {
    await postAnswer({
      answer: answer.answer,
      weight: answer.weight,
      question_id: question_id,
      specialisation_id: answer.specialisation.id
    })
  }

  const editAnswer = async (answer: Answer) => {
    await patchQuestion()
  }

  const removeAnswer = async (answer: Answer) => {
    await deleteAnswer(answer.id)
  }

  return { addQuestion, editQuestion, removeQuestion, addAnswer, editAnswer, removeAnswer }
})

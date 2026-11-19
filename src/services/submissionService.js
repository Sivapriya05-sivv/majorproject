// SUBMISSION SERVICE
import { homeworkService } from './homeworkService';

export const submissionService = {
  async submitHomework(homeworkId, payload) {
    return homeworkService.submitHomework(homeworkId, payload);
  },

  async reviewSubmission(homeworkId, payload) {
    return homeworkService.reviewHomework(homeworkId, payload);
  }
};

export default submissionService;


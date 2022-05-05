import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks_repository";

type SubmitFeedbackUseCaseRequest = {
  type: string;
  comment: string;
  screenshot?: string;
};

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepo: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request;

    if (!type || !comment) {
      throw new Error("Type or Comment is required.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepo.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Tipo do feedback: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}

from transformers import pipeline


class AIServicePipeline:
    model = "EleutherAI/gpt-neo-1.3B"
    def get_generator(self, action="summarization"):
        return pipeline(action, model=self.model)
    def topic(self, text, max_length=10,min_length=5):
        summary = self.get_generator()(text, max_length, min_length=min_length, do_sample=False)  # noqa: E501
        return summary[0]["summary_text"]
    def process_review_request(self, text):
        pass
if __name__ == "__main__":
    ai = AIServicePipeline()
    response = ai.get_generator()
    print(response)

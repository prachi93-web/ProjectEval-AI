import model from "../config/gemini.js";

const generateProjectEvaluation = async ({title,description,technologies,githubUrl}) => {

    try {

        const prompt = `
You are an experienced software project evaluator.

Evaluate the following student project based on its description and technologies.

Project Title: ${title}
Description: ${description}
Technologies: ${technologies.join(", ")}
GitHub URL: ${githubUrl || "Not provided"}

Evaluate the project based on:
- Problem statement and usefulness
- Technical implementation
- Innovation and creativity
- Potential for improvement

Return a score from 0 to 100.

Return your evaluation in this exact JSON format:

{
    "score": 80,
    "strengths": [
        "Strength 1",
        "Strength 2"
    ],
    "improvements": [
        "Improvement 1",
        "Improvement 2"
    ],
    "suggestions": [
        "Suggestion 1",
        "Suggestion 2"
    ]
}

Rules:
- The score must be a number between 0 and 100.
- Provide specific and constructive feedback.
- Evaluate only the information provided.
- Do not claim to have inspected the GitHub repository.
- All feedback must be written in simple English.
- Return only valid JSON.
- Do not include Markdown or code fences.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanedText = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let evaluation;

        try {
            evaluation = JSON.parse(cleanedText);
        } catch (error) {
            throw new Error("Invalid JSON received from Gemini");
        }

        if (
            typeof evaluation.score !== "number" ||
            evaluation.score < 0 ||
            evaluation.score > 100 ||
            !Array.isArray(evaluation.strengths) ||
            !Array.isArray(evaluation.improvements) ||
            !Array.isArray(evaluation.suggestions)
        ) {
            throw new Error("Invalid project evaluation received from Gemini");
        }

        return evaluation;

    } catch (error) {
        throw error;
    }

};

export { generateProjectEvaluation };

# Student Placement Predictor

An AI-powered application to predict student placement chances and provide personalized suggestions for improvement based on academic, technical, and personal data.

## Features

- **Placement Prediction**: Calculates the probability of placement based on academic performance, skills, and demographic factors.
- **AI Suggestions**: Uses Google Gemini API to provide personalized SWOT analysis and actionable advice.
- **Interactive Form**: Easy-to-use form to input student data.
- **Visual Analytics**: Clear indicators for strengths, weaknesses, and academic trajectory.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (@google/genai)

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd student-placement-predictor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
   - Ensure the `API_KEY` environment variable is set in your environment (e.g., via a `.env` file).

4. **Run the Application**
   ```bash
   npm run dev
   ```

## License

MIT

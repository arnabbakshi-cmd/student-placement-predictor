import React, { useState } from 'react';
import Header from './components/Header';
import StudentDataForm from './components/StudentDataForm';
import PredictionResult from './components/PredictionResult';
import { getPlacementSuggestions } from './services/geminiService';
import type { StudentData, Prediction, PlacementStatus, AISuggestions } from './types';

const initialStudentData: StudentData = {
  academic: {
    semesterMarks: {
      sem1: 8.5,
      sem2: 8.2,
      sem3: 7.9,
      sem4: 8.8,
      sem5: 8.1,
      sem6: 8.4,
      sem7: 8.6,
      sem8: null,
    },
    cgpa: 8.0,
    backlogs: 0,
    branch: 'CSE',
    degree: 'B.Tech',
    attendance: 80,
  },
  technical: {
    programmingLanguages: 'Python, JavaScript',
    mlAiSkills: true,
    certifications: 2,
    projects: 3,
    internship: 'yes',
    internshipDuration: 6,
    technicalTestScore: 75,
  },
  softSkills: {
    aptitudeScore: 70,
    communicationScore: 8,
    groupDiscussionScore: 7,
    confidence: 8,
  },
  placement: {
    companiesApplied: 10,
    interviewsAttended: 3,
    companyType: 'product',
    jobRole: 'developer',
  },
  demographic: {
    collegeTier: '2',
    location: 'urban',
    trainingAttended: 'yes',
  },
};

const calculatePredictionWithHeuristics = (data: StudentData): Prediction => {
    let score = 0;
    score += data.academic.cgpa * 3;
    score += data.academic.attendance > 75 ? 5 : 0;
    score -= data.academic.backlogs * 10;
    if (data.academic.cgpa < 7.0) score -= 10;
    score += data.technical.projects * 2;
    score += data.technical.certifications * 1.5;
    score += data.technical.technicalTestScore * 0.15;
    if (data.technical.mlAiSkills) score += 5;
    if (data.technical.internship === 'yes') {
      score += 10;
      if (data.technical.internshipDuration > 3) score += 5;
    }
    if (data.technical.internship === 'yes' && data.technical.projects > 2) score += 5;
    score += data.softSkills.aptitudeScore * 0.1;
    score += data.softSkills.communicationScore;
    score += data.softSkills.groupDiscussionScore * 0.5;
    if (data.demographic.collegeTier === '1') score += 5;
    if (data.demographic.collegeTier === '2') score += 2;
    if (data.demographic.trainingAttended === 'yes') score += 3;
    const finalPercentage = Math.max(0, Math.min(100, score));
    let status: PlacementStatus = finalPercentage > 85 ? 'Excellent Chance' : finalPercentage > 70 ? 'Good Chance' : finalPercentage > 55 ? 'Fair Chance' : 'Low Chance';
    return { status, percentage: finalPercentage };
};

function App() {
  const [studentData, setStudentData] = useState<StudentData>(initialStudentData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [suggestions, setSuggestions] = useState<AISuggestions | string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);
    setSuggestions('Generating AI analysis...');

    try {
        // Run predictions and AI analysis in parallel
        const suggestionPromise = getPlacementSuggestions(studentData);

        console.log("Using standard heuristic model for prediction.");
        const pred = calculatePredictionWithHeuristics(studentData);
        setPrediction(pred);
        
        // Await suggestions after setting local prediction state
        const aiSuggestions = await suggestionPromise;
        setSuggestions(aiSuggestions);
        
    } catch (error) {
        console.error("Analysis failed:", error);
        if (error instanceof Error) {
            setSuggestions(error.message);
        } else {
            setSuggestions("An unknown error occurred during analysis. Please check the console for details.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main>
        <StudentDataForm
          studentData={studentData}
          setStudentData={setStudentData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {(prediction || isLoading || suggestions) && (
          <PredictionResult prediction={prediction} suggestions={suggestions} />
        )}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500">
        <p>Powered by Gemini AI. Prediction model is for illustrative purposes only.</p>
      </footer>
    </div>
  );
}

export default App;
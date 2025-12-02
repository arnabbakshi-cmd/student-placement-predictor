export type PlacementStatus = 'Excellent Chance' | 'Good Chance' | 'Fair Chance' | 'Low Chance';

export interface StudentData {
  academic: {
    semesterMarks: {
      sem1: number | null;
      sem2: number | null;
      sem3: number | null;
      sem4: number | null;
      sem5: number | null;
      sem6: number | null;
      sem7: number | null;
      sem8: number | null;
    };
    cgpa: number;
    backlogs: number;
    branch: string;
    degree: string;
    attendance: number;
  };
  technical: {
    programmingLanguages: string;
    mlAiSkills: boolean;
    certifications: number;
    projects: number;
    internship: 'yes' | 'no';
    internshipDuration: number;
    technicalTestScore: number;
  };
  softSkills: {
    aptitudeScore: number;
    communicationScore: number;
    groupDiscussionScore: number;
    confidence: number;
  };
  placement: {
    companiesApplied: number;
    interviewsAttended: number;
    companyType: string;
    jobRole: string;
  };
  demographic: {
    collegeTier: '1' | '2' | '3';
    location: 'urban' | 'semi-urban' | 'rural';
    trainingAttended: 'yes' | 'no';
  };
}

export interface Prediction {
    status: PlacementStatus;
    percentage: number;
}

export interface AISuggestions {
  overallAssessment: string;
  strengths: string[];
  areasForImprovement: string[];
  academicTrajectory: {
    trend: string;
    projection: string;
    passProbability: string;
  } | null;
  actionableSuggestions: {
    area: string;
    suggestion: string;
    resources?: string[];
  }[];
  concludingRemarks: string;
}
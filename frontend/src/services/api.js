const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const analyseResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription) {
    formData.append('job_description', jobDescription);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/analyse`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = 'An error occurred during analysis.';
    try {
      const errorData = await response.json();
      errorDetail = errorData.detail || errorDetail;
    } catch (e) {
      errorDetail = await response.text() || errorDetail;
    }
    throw new Error(errorDetail);
  }

  return response.body; // Returns a ReadableStream
};

export const compareResumes = async (fileA, fileB, jobDescription) => {
  const formData = new FormData();
  formData.append('resume_a', fileA);
  formData.append('resume_b', fileB);
  if (jobDescription) {
    formData.append('job_description', jobDescription);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/compare`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = 'An error occurred during comparison.';
    try {
      const errorData = await response.json();
      errorDetail = errorData.detail || errorDetail;
    } catch (e) {
      errorDetail = await response.text() || errorDetail;
    }
    throw new Error(errorDetail);
  }

  return response.body;
};

export const analyseResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription) {
    formData.append('job_description', jobDescription);
  }

  const response = await fetch('/api/v1/analyse', {
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

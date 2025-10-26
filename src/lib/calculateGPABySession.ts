const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

const calculateGPABySession = (studentResults) => {
  const sessionGroups = {};

  studentResults.forEach(({ results, student }) => {
    results.forEach((r) => {
      const session = r.session;
      const gp = gradePoints[r.grade] || 0;
      const cu = r.course.creditUnit;

      if (!sessionGroups[student.name]) sessionGroups[student.name] = {};
      if (!sessionGroups[student.name][session])
        sessionGroups[student.name][session] = { totalCU: 0, totalPoints: 0 };

      sessionGroups[student.name][session].totalCU += cu;
      sessionGroups[student.name][session].totalPoints += gp * cu;
    });
  });

  // Compute final GPA per session
  const result = {};
  for (const student in sessionGroups) {
    result[student] = {};
    for (const session in sessionGroups[student]) {
      const { totalCU, totalPoints } = sessionGroups[student][session];
      result[student][session] = (totalPoints / totalCU).toFixed(2);
    }
  }

  return result;
};

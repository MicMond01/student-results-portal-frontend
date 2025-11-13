export const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A":
      return "bg-green-100 text-green-800 border-green-200";
    case "B":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "C":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "D":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "E":
      return "bg-red-100 text-red-800 border-red-200";
    case "F":
      return "bg-red-200 text-red-900 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

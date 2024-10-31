type RegulationType = {
    id?: string ;
    code: string | undefined;
    year: number;
    credit_Hours: number;
    min_GPA: number;
    min_Hours: number;
    FacultyId?:string;
  };

export default RegulationType;
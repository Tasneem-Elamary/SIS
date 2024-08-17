type GradeType = {
    id?: string;                    
    letter: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F';  
    point: number;                 
    bylawId: string;              
  };

  export default GradeType;
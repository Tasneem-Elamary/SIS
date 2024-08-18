 type CourseEnrollmentType = {
    id?: string;
    studentId: string;
    courseId: string;
    enrollmentType: 'regular' | 'selfstudy' | 'overload';
    hasPaidFees: boolean;
    registrationDate: Date;
    approvalStatus: 'Approved' | 'pending' | 'unApproved';
  };

export default CourseEnrollmentType;

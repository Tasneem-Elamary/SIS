 type CourseEnrollmentType = {
    id?: string;
    StudentId: string;
    CourseId: string;
    enrollmentType?: 'regular' | 'selfstudy' | 'overload';
    hasPaidFees?: boolean;
    registrationDate: Date;
    approvalStatus?: 'Approved' | 'pending' | 'unApproved';
  };

export default CourseEnrollmentType;

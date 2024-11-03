type AuditType={
    id?: string;
    action: string;
    userId: string;
    entityIds: string[]; // Array of entity IDs
    entityTypes: string[]; // Array of entity types corresponding to the entity IDs
    details: string;
    timestamp: Date;
  }

export default AuditType;

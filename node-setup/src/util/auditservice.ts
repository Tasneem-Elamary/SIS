import { EventEmitter } from 'events';
import models from '../models';

class AuditService extends EventEmitter {
  constructor() {
    super();
    this.on('audit', this.handleAuditEvent);
  }

  // Handler to save the audit log to the database
  async handleAuditEvent({
    action,
    userId,
    entityIds,
    entityTypes,
    details,
  }: {
    action: string;
    userId: string;
    entityIds: string[];
    entityTypes: string[];
    details?: string;
  }) {
    try {
      await models.Audit.create({
        action,
        userId,
        entityIds,
        entityTypes,
        details,
        timestamp: new Date(),
      });
      console.log('Audit log saved successfully');
    } catch (error) {
      console.error('Error saving audit log:', error);
    }
  }

  // Emit an audit event
  async logAudit({
    action,
    userId,
    entityIds,
    entityTypes,
    details,
  }: {
    action: string;
    userId: string;
    entityIds: string[];
    entityTypes: string[];
    details?: string;
  }) {
    // Ensure entityIds and entityTypes arrays are of the same length
    if (entityIds.length !== entityTypes.length) {
      throw new Error('entityIds and entityTypes arrays must have the same length');
    }

    this.emit('audit', {
      action,
      userId,
      entityIds,
      entityTypes,
      details,
    });
  }
}

export default new AuditService();

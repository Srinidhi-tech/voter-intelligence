// Basic validation logic for complaints
function validateComplaintData(data) {
  if (!data.violationType || !data.candidateName || !data.location) {
    return { isValid: false, error: 'Missing required fields' };
  }
  if (data.candidateName.length < 3) {
    return { isValid: false, error: 'Candidate name too short' };
  }
  return { isValid: true };
}

describe('Voter Intelligence Logic', () => {
  it('should validate a complete complaint', () => {
    const data = {
      violationType: 'Bribery',
      candidateName: 'John Doe',
      location: 'Ward 5',
    };
    const result = validateComplaintData(data);
    expect(result.isValid).toBe(true);
  });

  it('should reject a complaint with missing fields', () => {
    const data = {
      candidateName: 'John Doe',
    };
    const result = validateComplaintData(data);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Missing required fields');
  });

  it('should reject short candidate names', () => {
    const data = {
      violationType: 'Bribery',
      candidateName: 'Jo',
      location: 'Ward 5',
    };
    const result = validateComplaintData(data);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Candidate name too short');
  });

  it('should reject empty data objects', () => {
    const data = {};
    const result = validateComplaintData(data);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Missing required fields');
  });

  it('should validate correctly with special characters in location', () => {
    const data = {
      violationType: 'Bribery',
      candidateName: 'John Doe',
      location: 'Ward #5 (Near Square!)',
    };
    const result = validateComplaintData(data);
    expect(result.isValid).toBe(true);
  });
});

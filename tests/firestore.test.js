const { Firestore } = require('@google-cloud/firestore');

// Mock Firestore
jest.mock('@google-cloud/firestore');

describe('Firestore Connectivity', () => {
  let firestore;

  beforeEach(() => {
    Firestore.mockClear();
    firestore = new Firestore();
  });

  it('should initialize Firestore client', () => {
    expect(Firestore).toHaveBeenCalledTimes(1);
  });

  it('should be able to set a document', async () => {
    const mockSet = jest.fn().mockResolvedValue(true);
    const mockDoc = jest.fn(() => ({ set: mockSet }));
    const mockCollection = jest.fn(() => ({ doc: mockDoc }));

    Firestore.prototype.collection = mockCollection;

    const testRef = firestore.collection('test').doc('123');
    await testRef.set({ name: 'test' });

    expect(mockCollection).toHaveBeenCalledWith('test');
    expect(mockDoc).toHaveBeenCalledWith('123');
    expect(mockSet).toHaveBeenCalledWith({ name: 'test' });
  });
});

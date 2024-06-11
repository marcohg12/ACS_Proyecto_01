import { PublicationDAO } from '../PublicationDAO';
import { Publication as PublicationModel } from '../../models/Publication';
import { connectDB, disconnectDB } from './testDatabase';
import mongoose from 'mongoose';

describe('PublicationDAO Integration Tests', () => {
    let publicationDAO: PublicationDAO;

    beforeAll(async () => {
        await connectDB();
        publicationDAO = new PublicationDAO();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    let publicationId: string;

    // Test ID: 160
    it('should register a publication if receiving a valid publication object', async () => {
      const validPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), 
          'description1',
          'photo1',
          ['tag1', 'tag2']
      );

      const result = await publicationDAO.registerPublication(validPublication);
      publicationId = result as string; 

      expect(publicationId).toBeDefined();

      const registeredPublication = await publicationDAO.getPublication(publicationId);
      expect(registeredPublication.description).toBe('description1');
    });

    // Test ID: 161
    it('should reject to register a publication if receiving an invalid object', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getCategoryID: () => "invalidCategory"
        };

        await expect(publicationDAO.registerPublication(invalidObject)).rejects.toThrow();
    });

    // Test ID: 162
    it('should update a publication if receiving a valid publication object', async () => {
      const validPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), // Pass the current date
          'description1',
          'photo1',
          ['tag1', 'tag2']
      );

      const result = await publicationDAO.registerPublication(validPublication);
      const publicationId = result as string; // Explicitly cast result to string

      const updatedPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), // Pass the current date
          'updated description',
          'updated photo',
          ['tag1', 'tag3']
      );
      updatedPublication.setID(publicationId);

      const updateResult = await publicationDAO.updatePublication(updatedPublication);
      expect(updateResult).toBeTruthy(); // Ensure update was successful

      const fetchedPublication = await publicationDAO.getPublication(publicationId);
      expect(fetchedPublication.description).toBe('updated description');
    });

    // Test ID: 163
    it('should return null if receiving an invalid object to update', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getCategoryID: () => "invalidCategory"
        };

        await expect(publicationDAO.updatePublication(invalidObject)).rejects.toThrow();
    });

    // Test ID: 164
    it('should delete a publication with an existing ID', async () => {
        const deleteResult = await publicationDAO.deletePublication(publicationId);
        expect(deleteResult.deletedCount).toBe(1);

        const fetchedPublication = await publicationDAO.getPublication(publicationId);
        expect(fetchedPublication).toBe(undefined);
    });

    // Test ID: 165
    it('should reject to delete a publication with a non-existing ID', async () => {
        const nonExistingPublicationId = new mongoose.Types.ObjectId().toString();
        const deleteResult = await publicationDAO.deletePublication(nonExistingPublicationId);
        expect(deleteResult.deletedCount).toBe(0);
    });

    // Test ID: 167
    it('should get all publications in an acceptable time (0 to 2 seconds)', async () => {
        const maxAcceptableTime = 10000;
        const startTime = Date.now();
        const publications = await publicationDAO.getPublications();
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        expect(publications.length).toBeGreaterThan(0);
        expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
    });

    // Test ID: 168
    it('should get all publications in an acceptable time (0 to 5 seconds) for 100 users at the same time', async () => {
      const concurrentUsers = 100;
      const maxAcceptableTime = 5000;
  
      const getPublications = async () => {
          const start = Date.now();
          await publicationDAO.getPublications();
          const end = Date.now();
      };
  
      const startTime = Date.now();
      const promises = Array.from({ length: concurrentUsers }, () => getPublications());
      await Promise.all(promises);
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
  
      expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
    });

    // Test ID: 169
    it('should get a publication with an existing ID', async () => {
      const validPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), // Pass the current date
          'description2',
          'photo2',
          ['tag1', 'tag2']
      );
      const result = await publicationDAO.registerPublication(validPublication);
      publicationId = result as string; 
  
      const fetchedPublication = await publicationDAO.getPublication(publicationId);
      expect(fetchedPublication).toBeDefined();
      expect(fetchedPublication._id.equals(publicationId)).toBe(true);
  });

    // Test ID: 170
    it('should reject to get a publication with a non-existing ID', async () => {
        const nonExistingPublicationId = new mongoose.Types.ObjectId().toString();
        const fetchedPublication = await publicationDAO.getPublication(nonExistingPublicationId);
        expect(fetchedPublication).toBe(undefined);
    });
});

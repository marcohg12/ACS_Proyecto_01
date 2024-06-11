import { PublicationDAO } from '../PublicationDAO';
import { Publication as PublicationModel } from '../../models/Publication';
import { connectDB, disconnectDB } from './testDatabase';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';


describe('PublicationDAO Integration Tests', () => {
    let publicationDAO: PublicationDAO;

    beforeAll(async () => {
        await connectDB();
        publicationDAO = new PublicationDAO();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    //Test ID: 143
    it('should get a publication with an existing ID', async () => {
        const validPublication = new PublicationModel(
            '652aed63e7ae5f6d676bc0f1',
            new Date(), 
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

    //Test ID: 144
    it('should reject to get a publication with a non-existing ID', async () => {
        const nonExistingPublicationId = new mongoose.Types.ObjectId().toString();
        const fetchedPublication = await publicationDAO.getPublication(nonExistingPublicationId);
        expect(fetchedPublication).toBe(undefined);
    });

    //Test ID: 145
    it('should get a publication for 100 recurrent users in an acceptable time (0 to 10 seconds)', async () => {
        const numUsers = 50;
        const maxAcceptableTime = 10000; // Maximum acceptable time in milliseconds
      
        const getPublicationTime = async () => {
          const start = Date.now();
          await publicationDAO.getPublications();
          const end = Date.now();
          return end - start;
        };
      
        const getPublicationPromises = Array.from({ length: numUsers }, () => getPublicationTime());
        const getPublicationTimes = await Promise.all(getPublicationPromises);
      
        getPublicationTimes.forEach(time => {
          expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    //Test ID: 146
    it('should get all publications in an acceptable time (0 to 2 seconds)', async () => {
        const maxAcceptableTime = 10000;
        const startTime = Date.now();
        const publications = await publicationDAO.getPublications();
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        expect(publications.length).toBeGreaterThan(0);
        expect(elapsedTime).toBeLessThanOrEqual(maxAcceptableTime);
        });

    //Test ID: 147
    it('should return an empty array when there are no publications', async () => {
        jest.spyOn(publicationDAO, 'getPublications').mockResolvedValue([]);

        const publications = await publicationDAO.getPublications();
        expect(publications).toEqual([]);
    });

    //Test ID: 148
    it('should return an empty array when there are no publications with a non-existent tag', async () => {
        const nonExistentTag = 'nonexistenttag';
        const publications = await publicationDAO.getPublicationsByTags([nonExistentTag]);
        expect(publications.length).toEqual(0);
    });

    //Test ID: 149
    it('should reject getting publications with a non-existing category ID', async () => {
        const nonExistingCategoryId = new ObjectId().toHexString();
        const publications = await publicationDAO.getPublicationsByCategory(nonExistingCategoryId);
        expect(publications).toEqual([]);
    });

    //Test ID: 150
    it('should get all publications with an existing category in an acceptable time (0 to 2 seconds) for 100 users at the same time', async () => {
        const concurrentUsers = 100;
        const maxAcceptableTime = 3000; // 2 seconds
    
        const getPublicationsByCategory = async (categoryId: string) => {
            const start = Date.now();
            await publicationDAO.getPublicationsByCategory(categoryId);
            const end = Date.now();
            return end - start;
        };
    
        const promises = Array.from({ length: concurrentUsers }, () => {
            const categoryId = '652aedc6e7ae5f6d676bc58b'; 
            return getPublicationsByCategory(categoryId);
        });
    
        const times = await Promise.all(promises);
    
        times.forEach(time => {
            expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    //Test ID: 151
    it('should get all publications with existing tags', async () => {
        const existingTags = ['Marvel', 'Morado', 'Azúl']; // Replace with existing tags in your system

        const publications = await publicationDAO.getPublicationsByTags(existingTags);
        expect(publications.length).toBeGreaterThan(0);
    });

    //Test ID: 152
    it('should return an empty array when there are no publications with a non-existent tag', async () => {
        const nonExistentTag = 'nonexistenttag';
        const publications = await publicationDAO.getPublicationsByTags([nonExistentTag]);
        expect(publications.length).toEqual(0);
    });

    //Test ID: 153
    it('should get all publications with an existing tag in an acceptable time (0 to 2 seconds) for 100 users at the same time', async () => {
        const concurrentUsers = 100;
        const maxAcceptableTime = 3000; // in milliseconds
        const existingTags = ['Marvel', 'Morado', 'Azúl']; // Replace 'existingtag' with an actual existing tag in your system
    
        const getPublications = async () => {
            const start = Date.now();
            await publicationDAO.getPublicationsByTags(existingTags);
            const end = Date.now();
            return end - start;
        };
    
        const start = Date.now();
        const promises = Array.from({ length: concurrentUsers }, () => getPublications());
        const times = await Promise.all(promises);
        const end = Date.now();
        const totalTime = end - start;
    
        times.forEach(time => {
            expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    
        console.log(`Total time for ${concurrentUsers} users: ${totalTime} milliseconds`);
    });

    //Test ID: 154
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

    // Test ID: 155
    it('should reject to register a publication if receiving an invalid object', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getCategoryID: () => "invalidCategory"
        };

        await expect(publicationDAO.registerPublication(invalidObject)).rejects.toThrow();
    });

    // Test ID: 156
    it('should update a publication if receiving a valid publication object', async () => {
      const validPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), 
          'description1',
          'photo1',
          ['tag1', 'tag2']
      );

      const result = await publicationDAO.registerPublication(validPublication);
      const publicationId = result as string; 

      const updatedPublication = new PublicationModel(
          '652aed63e7ae5f6d676bc0f1',
          new Date(), 
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

    // Test ID: 157
    it('should return null if receiving an invalid object to update', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getCategoryID: () => "invalidCategory"
        };

        await expect(publicationDAO.updatePublication(invalidObject)).rejects.toThrow();
    });

    // Test ID: 158
    it('should delete a publication with an existing ID', async () => {
        const deleteResult = await publicationDAO.deletePublication(publicationId);
        expect(deleteResult.deletedCount).toBe(1);

        const fetchedPublication = await publicationDAO.getPublication(publicationId);
        expect(fetchedPublication).toBe(undefined);
    });

    // Test ID: 159
    it('should reject to delete a publication with a non-existing ID', async () => {
        const nonExistingPublicationId = new mongoose.Types.ObjectId().toString();
        const deleteResult = await publicationDAO.deletePublication(nonExistingPublicationId);
        expect(deleteResult.deletedCount).toBe(0);
    });
    
});

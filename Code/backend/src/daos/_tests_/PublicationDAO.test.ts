import DBPublicationStub from './DBPublicationStub';
import {PublicationDAO} from '../PublicationDAO';
import { Publication as PublicationModel } from "../../models/Publication";

async function measureTime(fn: () => Promise<any>): Promise<number> {
    const start = Date.now();
    await fn();
    const end = Date.now();
    return end - start;
  }

describe('DBPublicationStub getPublication', () => {
    let dbStub: DBPublicationStub;
    let publicationDAO: PublicationDAO
  
    beforeEach(() => {
      dbStub = new DBPublicationStub();
    });
    
    //Test ID: 143
    it('should return a publication with an existing ID', async () => {
      const publicationId = 'publication1';
      const publication = await dbStub.getPublication(publicationId);
      expect(publication).toBeDefined();
      expect(publication?.getID()).toBe(publicationId);
    });
  
    //Test ID: 144
    it('should return undefined for a non-existing publication ID', async () => {
        const publicationId = 'nonExistingPublicationId';
        const publication = await dbStub.getPublication(publicationId);
        expect(publication).toBeNull();
    });

    //Test ID: 145
    it('should get a publication within acceptable time for 1000 users', async () => {
        const publicationId = 'publication1';
        const concurrentUsers = 1000;
        const maxAcceptableTime = 2000; 
    
        const getPublication = async () => {
          const publication = await dbStub.getPublication(publicationId);
          expect(publication).toBeDefined();
          expect(publication?.getID()).toBe(publicationId);
        };
  
        const promises = Array.from({ length: concurrentUsers }, () => measureTime(getPublication));
        const times = await Promise.all(promises);
    
        times.forEach(time => {
          expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    //Test ID: 146
    it('should get all publications within acceptable time for 1000 users', async () => {
        const concurrentUsers = 1000;
        const maxAcceptableTime = 2000; 

        const getPublications = async () => {
        const publications = await dbStub.getPublications();
        expect(publications).toBeDefined();
        expect(publications.length).toBe(102); 
        };

        const promises = Array.from({ length: concurrentUsers }, () => measureTime(getPublications));
        const times = await Promise.all(promises);

        times.forEach(time => {
        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    //Test ID: 147
    it('should return null when there are no publications', async () => {
        dbStub.setPublications([]);
        const publications = await dbStub.getPublications();
        expect(publications).toBeNull();
        dbStub.resetPublications();
    });

    //Test ID: 148
    it('should return all publications for an existing category', async () => {
        const categoryId = 'category1';
        const publications = await dbStub.getPublicationsByCategory(categoryId);
        
        expect(publications).toBeDefined();
        expect(publications.length).toBeGreaterThan(0);
        expect(publications.every(publication => publication.categoryId === categoryId)).toBe(true);
      });

    //Test ID: 149
    it('should reject to get publications for a non-existing category', async () => {
        const categoryId = 'nonExistingCategoryId';
        const publications = await dbStub.getPublicationsByCategory(categoryId);
        expect(publications).toBeNull();
    });

    //Test ID: 150
    it('should handle 1000 users within 2 seconds', async () => {
        const concurrentUsers = 1000;
        const maxAcceptableTime = 2000; 
        const categoryId = 'category1'

        const getPublicationsByCategory = async () => {
        const publications = await dbStub.getPublicationsByCategory(categoryId);
        expect(publications).toBeDefined();
        expect(publications.length).toBe(2); 
        };

        const promises = Array.from({ length: concurrentUsers }, () => measureTime(getPublicationsByCategory));
        const times = await Promise.all(promises);

        times.forEach(time => {
        expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });

    });

    //Test ID: 151
    it('should return all publications for existing tags', async () => {
        const tags = ['tag1', 'tag2'];
        const publications = await dbStub.getPublicationsByTags(tags);
        
        expect(publications).toBeDefined();
        expect(publications.length).toBeGreaterThan(0);
        expect(publications.every(publication => publication.tags.some(tag => tags.includes(tag)))).toBe(true);
    });

    //Test ID: 152
    it('should reject to get publications for non-existing tags', async () => {
        const tags = ['nonExistingTag1', 'nonExistingTag2'];
        const publications = await dbStub.getPublicationsByTags(tags);
        
        expect(publications).toBeNull();
    });
    
    //Test ID: 153
    it('should handle 1000 users within 2 seconds', async () => {
        const concurrentUsers = 1000;
        const maxAcceptableTime = 2000; 
        const tags = ['tag1', 'tag2'];

        const getPublicationsByTags = async () => {
            const publications = await dbStub.getPublicationsByTags(tags);
            expect(publications).toBeDefined();
            expect(publications.length).toBeGreaterThan(0); 
        };

        const promises = Array.from({ length: concurrentUsers }, () => measureTime(getPublicationsByTags));
        const times = await Promise.all(promises);

        times.forEach(time => {
            expect(time).toBeLessThanOrEqual(maxAcceptableTime);
        });
    });

    //Test ID: 154
    it('should register a publication if receiving a valid publication object', async () => {
        const validPublication = new PublicationModel('category1', new Date(), 'description1', 'photo1', ['tag1', 'tag2'], 'publication1');
        const publicationId = await dbStub.registerPublication(validPublication);
        expect(publicationId).toBe("fakePublicationId");
    });
    
    //Test ID: 155
    it('should reject to register a publication if receiving an invalid publication', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getTags: () => ["tag1", "tag2"]
          };
        const publicationId = await dbStub.registerPublication(invalidObject);
        expect(publicationId).toBeNull();
    });

    // Test ID: 156
    it('should update a publication if receiving a valid publication object', async () => {
        const validPublication = new PublicationModel('category1', new Date(), 'description1', 'photo1', ['tag2', 'tag2'], 'publication1');
        const publication = await dbStub.updatePublication(validPublication);
        expect(publication).toBe("fakePublicationId");
    });

    // Test ID: 157
    it('should reject to update a publication if receiving an invalid publication', async () => {
        const invalidObject: any = {
            getDescription: () => "Description",
            getTags: () => ["tag1", "tag2"]
        };

        const publicationId = await dbStub.updatePublication(invalidObject);
        expect(publicationId).toBeNull();
    });

    // Test ID: 158
    it('should delete a publication with an existing ID', async () => {
        const existingPublicationId = '1';
        const deletedPublicationId = await dbStub.deletePublication(existingPublicationId);
        expect(deletedPublicationId).toBe(existingPublicationId);
    });
    
    // Test ID: 159
    it('should reject to delete a publication with a non-existing ID', async () => {
        const nonExistingPublicationId = 'nonExistingPublicationId';
        const publicationId = await dbStub.deletePublication(nonExistingPublicationId);
        expect(publicationId).toBeNull();
    });
});
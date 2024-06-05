import { PublicationDAOStub } from "./PublicationDaoStub";
import { PublicationAdmin } from "../PublicationAdmin";
import { Publication} from "../../models/Publication";
import fs from "fs";

describe('PublicationService', () => {
  let publicationAdmin: PublicationAdmin;
  let publicationDAOStub: PublicationDAOStub;

  beforeEach(() => {
    publicationDAOStub = new PublicationDAOStub();
    publicationAdmin = new PublicationAdmin(publicationDAOStub);
  });

  //Test Case ID: 121
  it('should get a publication with an existing ID', async () => {
    const publicationId = "60d9fbbf2b7e4e3a5c8e4f5b"; // Ensure this ID exists in your stub
    const publication = await publicationAdmin.getPublication(publicationId);
    expect(publication).toBeTruthy();
    expect(publication._id).toBe(publicationId);
  });

  //Test Case ID: 122
  it('should throw an exception when trying to get a publication with a non-existing ID', async () => {
    const nonExistingId = "nonexistingid";

    await expect(publicationAdmin.getPublication(nonExistingId))
      .rejects
      .toThrow(`Publication with ID ${nonExistingId} not found`);
  });

  //Test Case ID: 123
  it('should get all publications in an acceptable time (0 to 2 seconds)', async () => {
    const startTime = Date.now();
    const publications = await publicationAdmin.getPublications();
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    
    // Check if the elapsed time is between 0 and 2000 milliseconds (2 seconds)
    expect(elapsedTime).toBeLessThanOrEqual(2000);
    expect(elapsedTime).toBeGreaterThanOrEqual(0);
    expect(publications).toBeTruthy();
    expect(publications.length).toBeGreaterThan(0); 
  });

  //Test Case ID: 124
  it('should get all publications with an existing category', async () => {
    const categoryId = "1234567890abcdef12345678"; // Ensure this ID exists in your stub
    const publications = await publicationAdmin.getPublicationsByCategory(categoryId);
    expect(publications).toBeTruthy();
    expect(publications.length).toBeGreaterThan(0);
    publications.forEach(publication => {
      expect(publication.categoryId).toBe(categoryId);
    });
  });

  //Test Case ID: 125
  it('should throw an exception when trying to get publications with a non-existing category ID', async () => {
    const nonExistingCategoryId = "nonexistingcategoryid";

    await expect(publicationAdmin.getPublicationsByCategory(nonExistingCategoryId))
      .rejects
      .toThrow(`No publications found for category ID ${nonExistingCategoryId}`);
  });

  //Test Case ID: 126
  it('should get all publications with an existing tag', async () => {
    const tags = ["test"]; 
    const publications = await publicationAdmin.getPublicationsByTags(tags);
    expect(publications).toBeTruthy();
    expect(publications.length).toBeGreaterThan(0);
    publications.forEach(publication => {
      expect(publication.tags.some((tag: string) => tags.includes(tag)).toBe(true));
    });
  });

  //Test Case ID: 127
  it('should throw an exception when trying to get publications with a non-existing tag', async () => {
    const nonExistingTag = "nonexistingtag";

    await expect(publicationAdmin.getPublicationsByTags([nonExistingTag]))
      .rejects
      .toThrow(`No publications found for tags ${nonExistingTag}`);
  });

  //Test Case ID: 128
  it('should register a publication if receiving a publication object', async () => {
    const publication = new Publication(
      "1234567890abcdef12345678", 
      new Date(),                  
      "Test publication",          
      "test.jpg",                  
      ["test"]                     
    );

    await expect(publicationAdmin.registerPublication(publication))
      .resolves
      .not.toThrow();
  });

  //Test Case ID: 129
  it('should reject to register a publication if receiving an object different from publication', async () => {
    const invalidObject = new Publication(
      "1234567890abcdef12345678", 
      new Date(),                  
      "Invalid object",            
      "",                         
      []                           
    );
    await expect(publicationAdmin.registerPublication(invalidObject))
      .rejects
      .toThrow("Invalid publication object");
  });

  //Test Case ID: 130
  it('should update a publication if receiving a publication object', async () => {
    const publication = new Publication(
      "1234567890abcdef12345678", 
      new Date(),                  
      "Test publication",         
      "test.jpg",                  
      ["test"],                    
      "60d9fbbf2b7e4e3a5c8e4f5b"   
    );

    await expect(publicationAdmin.updatePublication(publication))
      .resolves
      .not.toThrow();
  });

  //Test Case ID: 131
  it('should reject to update a publication if receiving an object different from publication', async () => {
    const invalidObject = new Publication(
      "1234567890abcdef12345678", 
      new Date(),                 
      "Invalid object",            
      "",                          
      []                           
    );
  
    await expect(publicationAdmin.updatePublication(invalidObject))
      .rejects
      .toThrow("Invalid publication object");
  });

  //Test Case ID: 132
  it('should delete a publication with an existence ID', async () => {
    const publicationId = "60d9fbbf2b7e4e3a5c8e4f5b"; // ID existente

    await expect(publicationAdmin.deletePublication(publicationId))
      .resolves
      .not.toThrow();
  });

  //Test Case ID: 133
  it('should reject to delete a publication with a non existence ID', async () => {
    const nonExistentPublicationId = "nonexistentid"; // ID que no existe

    await expect(publicationAdmin.deletePublication(nonExistentPublicationId))
      .rejects
      .toThrow("Publication not found");
  });

});
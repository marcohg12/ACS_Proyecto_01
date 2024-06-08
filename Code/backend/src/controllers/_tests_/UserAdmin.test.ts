import { User } from "../../models/User";
import { UserAdmin } from "../UserAdmin";
import { UserDAOStub } from "./UserDAOStub";
import { EmailServiceStub } from "./EmailServiceStub";

describe("UserService", () => {
  let userAdmin: UserAdmin;
  let userDAO: UserDAOStub;
  let emailService: EmailServiceStub;

  beforeEach(() => {
    userDAO = new UserDAOStub();
    emailService = new EmailServiceStub();
    userAdmin = new UserAdmin(userDAO, emailService);
  });

  it("Test should return a JSON with an error property in true when a user is already registered", async () => {
    userDAO.setUsers([
      {
        name: "marco",
        email: "marcohg@gmail.com",
        phone: "87821555",
        password: "12345",
        recoverCode: "",
        role: 1,
      },
    ]);

    userDAO.userToReturn = {
      _id: "1",
      name: "marco",
      email: "marcohg@gmail.com",
      phone: "87821555",
      password: "12345",
      recoverCode: "",
      role: 1,
    };

    const user: User = new User(
      "andrés",
      "marcohg@gmail.com",
      "54332211",
      "34567",
      ""
    );

    const response = await userAdmin.registerUser(user);
    expect(response).toHaveProperty("error", true);
  });

  it("Test should return a JSON with an error property in false when a user is not registered", async () => {
    userDAO.setUsers([
      {
        name: "marco",
        email: "marcohg@gmail.com",
        phone: "87821555",
        password: "12345",
        recoverCode: "",
        role: 1,
      },
    ]);

    userDAO.userToReturn = {
      _id: "1",
      name: "andrés",
      email: "andres12@gmail.com",
      phone: "54332211",
      password: "34567",
      recoverCode: "",
      role: 1,
    };

    const user: User = new User(
      "andrés",
      "andres12@gmail.com",
      "54332211",
      "34567",
      ""
    );

    const response = await userAdmin.registerUser(user);
    expect(response).toHaveProperty("error", false);
  });

  it("Test should not call updateRecoverCode when the user does not exists", async () => {
    userDAO.setUsers([
      {
        name: "marco",
        email: "marcohg@gmail.com",
        phone: "87821555",
        password: "12345",
        recoverCode: "",
        role: 1,
      },
    ]);

    const spyUpdateRecoverCode = jest.spyOn(userAdmin, "updateRecoverCode");

    const response = await userAdmin.userExists("andres@gmail.com");

    expect(spyUpdateRecoverCode).not.toHaveBeenCalled();
    expect(response).toBe(false);
  });

  it("Test should call updateRecoverCode when the user does exists", async () => {
    userDAO.setUsers([
      {
        name: "marco",
        email: "marcohg@gmail.com",
        phone: "87821555",
        password: "12345",
        recoverCode: "",
        role: 1,
      },
    ]);

    const spyUpdateRecoverCode = jest.spyOn(userAdmin, "updateRecoverCode");

    const response = await userAdmin.userExists("marcohg@gmail.com");

    expect(spyUpdateRecoverCode).toHaveBeenCalled();
    expect(response).toBe(true);
  });

  it("Test sendEmail is called with the correct parameters", async () => {
    userDAO.setUsers([
      {
        name: "marco",
        email: "marcohg@gmail.com",
        phone: "87821555",
        password: "12345",
        recoverCode: "",
        role: 1,
      },
    ]);

    userAdmin["generateNumericPasswordRecoveryCode"] = () => {
      return "12345678";
    };

    const spySendEmail = jest.spyOn(emailService, "sendEmail");

    await userAdmin.updateRecoverCode("marcohg@gmail.com");

    expect(spySendEmail).toHaveBeenCalledWith(
      "marcohg@gmail.com",
      "Sistema Duende - Código de recuperación de contraseña",
      "El código de recuperación es: 12345678"
    );
  });
});

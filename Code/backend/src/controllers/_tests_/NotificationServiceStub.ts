import { Observer } from "../../interfaces/interfaces";
import { Notification } from "../../models/Notification";

class NotificationServiceStub implements Observer {
  update(n: Notification) {
    return;
  }
}

export { NotificationServiceStub };

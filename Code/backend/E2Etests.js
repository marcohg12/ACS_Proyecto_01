import { Selector } from "testcafe";
fixture("Getting Started").page("http://localhost:3000");
test("Tests that the user can log in to the application", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const menuPrincipalLink = Selector("a").withText("Menú principal");
  await t.expect(menuPrincipalLink.exists).ok();
});

test("Tests that the user can see the products", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const productsLink = Selector("a").withText("Ver productos");

  // Check that the element exists
  await t.expect(productsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(productsLink);

  // Check any other property, like href
  const cardBody = Selector("div.card-body");
  const cardTitle = cardBody
    .find("h5.card-title.mb-3")
    .withText("Peluca celeste");
  const cardText = cardBody.find("p.card-text").withText("₡12,503");

  // Check that the card title exists
  await t.expect(cardTitle.exists).ok();

  // Check that the card text exists
  await t.expect(cardText.exists).ok();
});

test("Tests that the user can see the publications", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const publicationsLink = Selector("a").withText("Ver publicaciones");

  // Check that the element exists
  await t.expect(publicationsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(publicationsLink);

  const cardBody = Selector("div.card-body");
  const cardText = cardBody
    .find("p.text-truncate.mb-3")
    .withText(
      "Caracterización de Nébula de Guardianes de la Galaxia (MARVEL)."
    );
  const cardDate = cardBody.find("p.text-muted").withText("10/14/2023");
  const cardCategory = cardBody
    .find("p.ml-auto.fw-bold")
    .withText("Superheroes");

  // Check that the card text exists
  await t.expect(cardText.exists).ok();

  // Check that the card date exists
  await t.expect(cardDate.exists).ok();

  // Check that the card category exists
  await t.expect(cardCategory.exists).ok();
});

test("Tests that the user can filter publications by category", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const publicationsLink = Selector("a").withText("Ver publicaciones");

  // Check that the element exists
  await t.expect(publicationsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(publicationsLink);

  const categorySelect = Selector("select.rounded.flex-fill.form-control-sm");
  const superheroesOption = categorySelect
    .find("option")
    .withText("Superheroes");

  // Select the "Superheroes" option
  await t.click(categorySelect).click(superheroesOption);

  // Optionally, you can check if the "Superheroes" option is selected
  await t.expect(categorySelect.value).eql("652aed63e7ae5f6d676bc0f1");
});

test("Tests that the user can filter publications by keywords", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const publicationsLink = Selector("a").withText("Ver publicaciones");

  // Check that the element exists
  await t.expect(publicationsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(publicationsLink);

  const searchInput = Selector(
    'input[type="search"].flex-fill.rounded.form-control-sm'
  ).withAttribute("placeholder", "Palabras clave");

  // Write text in the input
  await t.typeText(searchInput, "Rojo");
  const button_filter = Selector("button").withText("Filtrar");
  await t.click(button_filter);

  const cardBody = Selector("div.card-body");
  const cardText = cardBody
    .find("p.text-truncate.mb-3")
    .withText("Caracterización del personaje Chucky");
  const cardDate = cardBody.find("p.text-muted").withText("10/26/2023");
  const cardCategory = cardBody.find("p.ml-auto.fw-bold").withText("Terrorr");

  // Check that the card text exists
  await t.expect(cardText.exists).ok();

  // Check that the card date exists
  await t.expect(cardDate.exists).ok();

  // Check that the card category exists
  await t.expect(cardCategory.exists).ok();
});

test("Tests that the user can get rid of the filters applied to publications", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const publicationsLink = Selector("a").withText("Ver publicaciones");

  // Check that the element exists
  await t.expect(publicationsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(publicationsLink);

  const searchInput = Selector(
    'input[type="search"].flex-fill.rounded.form-control-sm'
  ).withAttribute("placeholder", "Palabras clave");

  // Write text in the input
  await t.typeText(searchInput, "Rojo");
  const button_filter = Selector("button").withText("Filtrar");
  await t.click(button_filter);
  const expectedCountAfterFilter = 3; // Change this to your expected count
  const actualCount = await Selector("a.col-lg-3.col-md-3.mb-4").count;

  await t.expect(actualCount).eql(expectedCountAfterFilter);

  const reboot_filter = Selector("button").withText("Reiniciar filtros");
  await t.click(reboot_filter);
  const expectedCountAfterReboot = 14; // Change this to your expected count
  const actualCountAfterReboot = await Selector("a.col-lg-3.col-md-3.mb-4")
    .count;

  await t.expect(actualCountAfterReboot).eql(expectedCountAfterReboot);
});

test("Tests that the user can add a product to the cart from the product's page", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const productsLink = Selector("a").withText("Ver productos");

  // Check that the element exists
  await t.expect(productsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(productsLink);

  const elementToClick =
    Selector("h5.card-title.mb-3").withText("Effaclar Duo+");

  await t.click(elementToClick);
  const buttonAddToCart = Selector("button").withText("Agregar al carrito");
  await t.click(buttonAddToCart);
  const alertElement = Selector("div.alert.alert-success");

  // Check the text content of the alert element
  await t
    .expect(alertElement.innerText)
    .contains("Producto agregado al carrito");
});

test("Tests that the user can see the cart with its products", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const productsLink = Selector("a").withText("Ver productos");

  // Check that the element exists
  await t.expect(productsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(productsLink);

  const elementToClick =
    Selector("h5.card-title.mb-3").withText("Effaclar Duo+");

  await t.click(elementToClick);
  const cartLink = Selector("a.nav-link.text-white").withAttribute(
    "href",
    "/my_cart"
  );

  // Perform any action you want with the selected element, such as clicking it
  await t.click(cartLink);
  const cardTitleElement = Selector("h5.card-title");

  // Check the text content of the h5 element
  await t.expect(cardTitleElement.innerText).eql("Effaclar Duo+");
});

test("Tests that the user can add more products from the cart page", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const productsLink = Selector("a").withText("Ver productos");

  // Check that the element exists
  await t.expect(productsLink.exists).ok();

  // Perform an action, like clicking the link
  await t.click(productsLink);

  const elementToClick =
    Selector("h5.card-title.mb-3").withText("Effaclar Duo+");

  await t.click(elementToClick);
  const buttonAddToCart = Selector("button").withText("Agregar al carrito");
  const cartLink = Selector("a.nav-link.text-white").withAttribute(
    "href",
    "/my_cart"
  );

  // Perform any action you want with the selected element, such as clicking it
  await t.click(cartLink);
  const inputValue = await Selector("input.form-control.text-center").value;
  const shouldBeIncrementedValue = parseInt(inputValue, 10) + 1;
  const buttonPlusCart = Selector("button").withText("+");
  await t.click(buttonPlusCart);
  const newInputValue = await Selector("input.form-control.text-center").value;
  const newIntInputValue = parseInt(newInputValue, 10);
  await t.expect(newIntInputValue).eql(shouldBeIncrementedValue);
});

test("Tests that the user can navigate to the orders section", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const cartLink = Selector("a.nav-link.text-white").withAttribute(
    "href",
    "/client_orders"
  );

  // Perform any action you want with the selected element, such as clicking it
  await t.click(cartLink);
  const expectedContent = "Pedido: 6662bf1cd29a2ad859535e9e";
  const divContent = await Selector("div.col").textContent;

  // Remove leading and trailing whitespace and then concatenate the text nodes
  const cleanedContent = divContent.replace(/\n|\t/g, "").trim();

  await t.expect(cleanedContent).eql(expectedContent);
});

test("Test that the user can navigate to the profile section", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const profileLink = Selector("a.btn.mx-2")
    .withAttribute("href", "/profile")
    .withAttribute(
      "style",
      "background-color: rgb(115, 226, 167); width: 150px;"
    );

  // Perform any action you want with the selected element, such as clicking it
  await t.click(profileLink);
  const emailInput = Selector('input[type="email"]#email').withAttribute(
    "value",
    "jeffleivajr@gmail.com"
  );

  // Retrieve and check the value of the input element
  await t.expect(emailInput.value).eql("jeffleivajr@gmail.com");
});

test("Test that the user can log out of the application", async (t) => {
  await t.typeText("#login_email", "jeffleivajr@gmail.com");
  await t.typeText("#login_password", "botella123");
  const button = Selector("button").withText("Iniciar sesión");
  await t.click(button);
  const closeSessionbutton = Selector("button").withText("Cerrar sesión");

  // Perform any action you want with the selected element, such as clicking it
  await t.click(closeSessionbutton);

  const iniciarSesionButton = Selector("button").withText("Iniciar sesión");
  // Check if the button exists
  await t.expect(iniciarSesionButton.exists).ok();
});

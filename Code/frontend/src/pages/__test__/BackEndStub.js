/* eslint-disable */
import axios from "axios";

export const axiosStubGetWithErrorEqualToFalse = () => {
  const mockCartData = {
    products: [
      { _id: 1, name: "Product 1", price: 10, units: 5 },
      { _id: 2, name: "Product 2", price: 20, units: 2 },
    ],
  };
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        result: {
          products: mockCartData.products,
        },
        error: false,
      },
    })
  );
};

export const axiosStubGetWithErrorEqualToTrue = () => {
  const mockCartData = {
    products: [
      { _id: 1, name: "Product 1", price: 10, units: 5 },
      { _id: 2, name: "Product 2", price: 20, units: 2 },
    ],
  };
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        result: {
          products: mockCartData.products,
        },
        error: true,
      },
    })
  );
};

export const axiosStubGetIncreaseProductErrorEqualToFalse = () => {
  axios.mockResolvedValueOnce({
    data: { error: false, message: "Producto agregado al carrito" },
  });
};

export const axiosStubGetIncreaseProductErrorEqualToTrue = () => {
  axios.mockResolvedValueOnce({
    data: { error: true, message: "Ha ocurrido un error" },
  });
};

export const axiosStubGetDecreaseProductErrorEqualToFalse = () => {
  axios.mockResolvedValueOnce({
    data: { error: false, message: "Producto eliminado del carrito" },
  });
};

export const axiosStubGetDecreaseProductErrorEqualToTrue = () => {
  axios.mockResolvedValueOnce({
    data: { error: true, message: "Ha ocurrido un error" },
  });
};

export const axiosStubSendFormErrorEqualToFalse = () => {
  axios.mockResolvedValueOnce({
    data: { error: false, message: "Pedido generado exitosamente" },
  });
};

export const axiosStubSendFormErrorEqualToTrue = () => {
  axios.mockResolvedValueOnce({
    data: {
      error: true,
      message: "Ocurrió un error inesperado, intente de nuevo",
    },
  });
};

export const axiosGetProductViewerProducts = () => {
  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      price: "1000",
      photo: "/images/product.jpg",
      toLink: "/product/1",
    },
    {
      _id: "2",
      name: "Product 2",
      price: "2000",
      photo: "/images/product.jpg",
      toLink: "/product/1",
    },
  ];
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        result: mockProducts,
        error: false,
      },
    })
  );
};

export const axiosGetProductViewProduct = () => {
  const mockProduct = {
    _id: "1",
    name: "Product 1",
    price: "1000",
    photo: "/images/product.jpg",
    description: "Test description",
  };
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        result: mockProduct,
        error: false,
      },
    })
  );
};

export const axiosGetProductViewProductWithError = () => {
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        error: true,
      },
    })
  );
};

export const axiosStubSendFormErrorEqualToFalseProductView = () => {
  axios.mockResolvedValueOnce({
    data: { error: false, message: "Producto agregado al carrito" },
  });
};

export const axiosStubSendFormErrorEqualToTrueProductView = () => {
  axios.mockResolvedValueOnce({
    data: {
      error: true,
      message: "Ocurrió un error inesperado, intente de nuevo",
    },
  });
};

export const axiosGetPublicationViewPublication = () => {
  const defaultProps = {
    name: "Test publication",
    photo: "/images/sample.jpg",
    description: "Sample description for the publication card",
    date: "2024-05-28",
    category: { name: "News" },
    toLink: "/publication/1",
    tags: ["azul", "rojo", "verde"],
  };
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        result: defaultProps,
        error: false,
      },
    })
  );
};

export const axiosGetPublicationViewPublicationWithError = () => {
  jest.spyOn(axios, "get").mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        error: true,
      },
    })
  );
};

/*export const testingSomethingFunney = () => {
  const mockCartData = {
    products: [
      { _id: 1, name: "Product 1", price: 10, units: 5 },
      { _id: 2, name: "Product 2", price: 20, units: 2 },
    ],
  };
  axios.get.mockResolvedValueOnce({
    data: {
      result: {
        products: mockCartData.products,
      },
      error: false,
    },
  });
};*/

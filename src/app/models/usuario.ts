export interface Usuario {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: string;
  __v: number;

  name: {
    firstname: string;
    lastname: string;
  };

  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
}

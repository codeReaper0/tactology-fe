import axios from "axios";

const graphqlEndpoint = "http://localhost:8000/graphql";

export const registerUser = async (registerData: RegisterUserProps) => {
  const query = `
    mutation Register($registerInput: RegisterUserInput!) {
      register(registerUserDto: $registerInput) {
        accessToken
      }
    }
  `;

  const variables = {
    registerInput: {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      phoneNumber: registerData.phoneNumber,
    },
  };

  try {
    const response = await axios.post(graphqlEndpoint, {
      query,
      variables,
    });

    return response.data.data.register.accessToken;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

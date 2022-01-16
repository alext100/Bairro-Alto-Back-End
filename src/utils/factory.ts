import { name } from "faker/locale/en";
import { lorem } from "faker/locale/en_GB";
import { Factory } from "fishery";
import faker from "faker";

const usersFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  password: lorem.word(10),
  firstName: name.firstName(),
  lastName: name.lastName(),
  email: faker.internet.email(),
}));

export const getRandomUser = () => usersFactory.build();
export const getRandomUsers = (total = 3) => usersFactory.buildList(total);

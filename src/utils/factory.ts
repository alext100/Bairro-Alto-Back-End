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

const errorsFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  errorType: lorem.word(10),
  errorMessage: lorem.words(3),
  errorComment: lorem.words(2),
}));

const groupFactory = Factory.define(({ sequence }) => ({
  id: sequence,
  groupname: lorem.word(10),
  members: [sequence, sequence],
  mensajes: [lorem.words(10)],
}));

export const getRandomUser = () => usersFactory.build();
export const getRandomUsers = (total = 3) => usersFactory.buildList(total);
export const getRandomError = () => errorsFactory.build();
export const getRandomGroup = () => groupFactory.build();
export const getRandomGroups = (total = 3) => groupFactory.buildList(total);

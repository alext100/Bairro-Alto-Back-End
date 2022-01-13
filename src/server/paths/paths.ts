const paths = {
  userLogin: "/login",
  userRegister: "/register",
  getAll: "/get-all",
  getAllTeachers: "/get-all-teachers",
  getAllUsersGroups: "/get-all-user-groups",
  getAllUserErrors: "/get-all-user-errors/:id",
  getById: "/get-one-by-id/:id",
  addGroupToUser: "/add-group-to-user/:id",
  addErrorToUser: "/add-error-to-user/:id",
  deleteGroupFromUser: "/delete-group-from-user/:id",
  deleteErrorFromUser: "/delete-error-from-user/:id",
  addGroupToAnyUser: "/add-group-to-any-user/:id",
  create: "/add",
  update: "/update/:id",
  delete: "/delete/:id",
};

export default paths;

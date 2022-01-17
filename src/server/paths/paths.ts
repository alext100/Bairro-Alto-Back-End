const paths = {
  userLogin: "/login",
  userRegister: "/register",
  getAll: "/get-all",
  getAllTeachers: "/get-all-teachers",
  getAllUsersGroups: "/get-all-user-groups",
  getAllGroupErrors: "/get-all-group-errors/:id",
  getById: "/get-one-by-id/:id",
  addGroupToUser: "/add-group-to-user/:id",
  addErrorToGroup: "/add-error-to-group/:id",
  deleteGroupFromUser: "/delete-group-from-user/:id",
  deleteErrorFromUser: "/delete-error-from-user/:id",
  addGroupToAnyUser: "/add-group-to-any-user/:id",
  create: "/add",
  update: "/update/:id",
  delete: "/delete/:id",
};

export default paths;

function showSalary(users, age) {
  const filteredUsers = users.filter((user) => user.age <= age);
  const mappedUsers = filteredUsers.map(
    (user) => user.name + ", " + user.balance
  );
  return mappedUsers.join("\n");
}
const getSalary = (user, career) => {
  const base = career.baseSalary;

  const years =
    new Date().getFullYear() - new Date(user.hireDate).getFullYear();

  const bonus = Math.floor(years / 3) * 100;

  return base + bonus;
};

module.exports = { getSalary };
